import { getSetting } from './settings.js'
import { EFFECT_SHAPES, FLAGS, SETTING } from './config.js'

function getShape(shape, size) {
    const r = size / 2

    if (shape === EFFECT_SHAPES.ROUNDED_SQUARE) {
        return new PIXI.RoundedRectangle(-r, -r, size, size, size * 0.2)
    }

    if (shape === EFFECT_SHAPES.HEXAGON || shape === EFFECT_SHAPES.FLAT_HEXAGON) {
        const isFlat = shape === EFFECT_SHAPES.FLAT_HEXAGON
        const points = []
        for (let i = 0; i < 6; i++) {
            let angle = (Math.PI / 3) * i
            if (!isFlat) angle += Math.PI / 6
            points.push(Math.cos(angle) * r, Math.sin(angle) * r)
        }
        return new PIXI.Polygon(points)
    }

    if (shape === EFFECT_SHAPES.TRIANGLE) {
        const k = Math.cos(Math.PI / 6)
        const points = [0, r, k * r, -r * 0.5, -k * r, -r * 0.5]
        return new PIXI.Polygon(points)
    }

    return new PIXI.Circle(0, 0, r)
}

export function renderIconContainer(sourceSprite, gridScale, iconSize) {
    const bgColor = getSetting(SETTING.EFFECT_BG_COLOR)
    const borderColor = getSetting(SETTING.EFFECT_BORDER_COLOR)
    const sizeMultiplier = getSetting(SETTING.EFFECT_SIZE_MULTIPLIER)
    const baseOpacity = getSetting(SETTING.EFFECT_OPACITY)
    const shape = getSetting(SETTING.EFFECT_SHAPE)

    const texture = sourceSprite.texture?.orig ?? sourceSprite.texture
    const texWidth = texture?.width || iconSize
    const texHeight = texture?.height || iconSize

    const iconScale = iconSize / Math.max(texWidth, texHeight)
    const borderWidth = Math.min(1, gridScale * sizeMultiplier)
    const bgSize = 1.2 * iconSize
    const maskSize = 1.1 * Math.min(texWidth, texHeight)

    const container = new PIXI.Container()

    // Bg
    const bg = new PIXI.Graphics()
    bg.lineStyle(borderWidth, borderColor, 1, 1)
    bg.beginFill(bgColor)
    bg.drawShape(getShape(shape, bgSize))
    bg.endFill()
    container.addChild(bg)

    // Effect
    const effectIcon = sourceSprite
    effectIcon.scale.set(iconScale, iconScale)
    effectIcon.anchor.set(0.5)
    effectIcon.x = 0
    effectIcon.y = 0
    container.addChild(effectIcon)

    // Mask
    const mask = new PIXI.Graphics()
    mask.beginFill(0xffffff)
    mask.drawShape(getShape(shape, maskSize))
    mask.endFill()
    effectIcon.addChild(mask)
    effectIcon.mask = mask

    container.zIndex = sourceSprite.zIndex
    container.alpha = baseOpacity
    container[FLAGS.IS_CONTAINER] = true
    return container
}
