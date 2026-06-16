import { getSetting } from './settings.js'
import { FLAGS, SETTING } from './config.js'

const SCALE_FACTOR = 1.2
const DURATION = 100

export function hoverAnimate(container, animateIn = false) {
    if (!container || container.destroyed || !container.transform || !container.parent) return
    const baseScale = 1
    const targetScale = animateIn ? SCALE_FACTOR * baseScale : baseScale
    const baseAlpha = getSetting(SETTING.EFFECT_OPACITY)
    const targetAlpha = animateIn ? 1 : baseAlpha

    const keyframes = [{ parent: container, attribute: 'alpha', to: targetAlpha }]

    if (baseAlpha !== 1) {
        keyframes.push({ parent: container, attribute: 'alpha', to: targetAlpha })
    }

    if (getSetting(SETTING.HOVER_ENABLE_ANIMATION)) {
        keyframes.push(
            { parent: container.scale, attribute: 'x', to: targetScale },
            { parent: container.scale, attribute: 'y', to: targetScale },
        )
    }

    if (!container[FLAGS.ANIM_NAME]) {
        container[FLAGS.ANIM_NAME] = Symbol('sre-effect-hover')
    }

    foundry.canvas.animation.CanvasAnimation.animate(keyframes, {
        name: container[FLAGS.ANIM_NAME],
        duration: DURATION,
    })
}
