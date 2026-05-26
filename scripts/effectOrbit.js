import { getSetting } from './settings.js'
import { SETTING } from './config.js'
import { OrbitFactory } from './orbitFactory.js'

function getIconTargetData(size) {
    if (size < 1) return { size: 16, offset: 1.25 }
    if (size === 1) return { size: 18, offset: 1.25 }
    if (size === 2) return { size: 20, offset: 1.12 }
    if (size === 3) return { size: 22, offset: 1.1 }
    return { size: 24, offset: 1.08 }
}

export function computeEffectOrbit(token, effectCount) {
    const sizeMultiplier = getSetting(SETTING.EFFECT_SIZE_MULTIPLIER)
    const baseRadiusMultiplier = getSetting(SETTING.ORBIT_BASE_RADIUS_MULTIPLIER)
    const orbitSpacing = getSetting(SETTING.ORBIT_SPACING)
    const orbitShape = getSetting(SETTING.ORBIT_SHAPE)

    const gridSize = canvas.grid?.size ?? 100
    const gridScale = gridSize / 100
    const tokenSize = Math.min(token.document?.width ?? 1, token.document?.height ?? 1)
    const centerOffset = (gridSize * tokenSize) / 2

    const iconTargetData = getIconTargetData(tokenSize)

    const iconSize = iconTargetData.size * gridScale * sizeMultiplier
    const baseRadius = iconTargetData.offset * tokenSize * gridSize * baseRadiusMultiplier
    const spacing = iconSize * orbitSpacing

    const positions = []
    let remaining = effectCount
    let ringIndex = 0

    while (remaining > 0) {
        const radius = baseRadius + ringIndex * spacing
        const orbit = OrbitFactory.create(orbitShape, radius, spacing)
        const result = orbit.getPoints(remaining)
        for (const pt of result.points) {
            positions.push({ x: centerOffset + pt.x, y: centerOffset + pt.y })
        }
        remaining -= result.consumed
        if (result.consumed === 0) break
        ringIndex++
    }

    return { list: positions, iconSize, gridScale, centerOffset }
}
