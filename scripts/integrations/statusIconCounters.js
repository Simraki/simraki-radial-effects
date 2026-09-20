import { FLAGS } from '../config.js'

const SIC_MODULE_ID = 'statuscounter'

export function isStatusIconCountersActive() {
    return !!game.modules.get(SIC_MODULE_ID)?.active
}

/**
 * Draws Status Icon Counters' value/duration badges inside icon container.
 * @param {PIXI.Container} container The icon container created by renderIconContainer.
 * @param {ActiveEffect|null} effect The active effect matched to this icon.
 * @param {number} iconSize The rendered icon size (same value passed to renderIconContainer).
 */
export function drawStatusCounter(container, effect, iconSize) {
    if (!isStatusIconCountersActive()) return

    for (const child of container.children.filter((c) => c[FLAGS.STATUS_COUNTER_TEXT])) {
        container.removeChild(child)
        child.destroy()
    }

    const counter = effect?.statusCounter
    if (!counter) return

    const displayDuration = counter.displayDuration
    const hasDuration = displayDuration !== null
    const sizeRatio = iconSize / 20
    const half = iconSize / 2

    if (counter.visible) {
        container.addChild(
            createBadge(counter.displayValue, getScaledFont(counter, iconSize, hasDuration, false), {
                anchor: [1, 1],
                x: half + 1 * sizeRatio,
                y: half + 4 * sizeRatio,
                sizeRatio,
            }),
        )
    } else if (hasDuration) {
        const renderedDuration = displayDuration === null ? '' : displayDuration <= 0 ? 'X' : `${displayDuration}`

        container.addChild(
            createBadge(renderedDuration, getScaledFont(counter, iconSize, counter.visible, true), {
                anchor: [0, 0],
                x: -half - sizeRatio,
                y: -half - 5.5 * sizeRatio,
                sizeRatio,
            }),
        )
    }
}

function createBadge(text, font, { anchor, x, y, sizeRatio }) {
    const badge = new PIXI.Text(text, font)
    badge.anchor.set(...anchor)
    badge.x = x
    badge.y = y
    badge.resolution = Math.max(1, (1 / sizeRatio) * 1.5)
    badge[FLAGS.STATUS_COUNTER_TEXT] = true
    return badge
}

function getScaledFont(counter, iconSize, double, duration) {
    let size = game.settings.get(SIC_MODULE_ID, 'counterFontSize')
    if (iconSize !== 20) size = (iconSize / 20) * size
    if (double) size = Math.min(size, (iconSize + 8) / 2)
    return duration ? counter.constructor.createDurationFont(size) : counter.constructor.createFont(size)
}
