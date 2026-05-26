import { FLAGS, MODULE_ID, SETTING } from './config.js'
import { computeEffectOrbit } from './effectOrbit.js'
import { renderIconContainer } from './renderIconContainer.js'
import { getSettingName } from './settings.js'

const REDRAW_EFFECTS_SETTINGS = [
    SETTING.EFFECT_SHAPE,
    SETTING.EFFECT_BG_COLOR,
    SETTING.EFFECT_BORDER_COLOR,
    SETTING.EFFECT_SIZE_MULTIPLIER,
    SETTING.EFFECT_OPACITY,
    SETTING.ORBIT_SPACING,
    SETTING.ORBIT_START_ANGLE,
    SETTING.ORBIT_BASE_RADIUS_MULTIPLIER,
    SETTING.ORBIT_REVERSE_DIRECTION,
    SETTING.ORBIT_SHAPE,
]

export class EffectManager {
    constructor() {
        this._registerHooks()
    }

    static refreshToken(token) {
        if (!token?.effects) return
        token._refreshEffects()
        token.renderFlags.set({ redrawEffects: true })
    }

    static refreshAllTokens() {
        if (!canvas?.tokens?.placeables) return
        for (const token of canvas.tokens.placeables) {
            EffectManager.refreshToken(token)
        }
    }

    applyToToken(token) {
        if (!token?.effects) return
        const bg = token.effects.bg
        if (!bg) return
        bg.clear()

        const effectSprites = token.effects.children.filter((c) => {
            if (c === bg || c === token.effects.overlay) return false
            return (!c[FLAGS.IS_PROCESSED] && c instanceof PIXI.Sprite) || c[FLAGS.IS_CONTAINER]
        })
        if (!effectSprites.length) return

        const activeEffects = this._getActiveEffects(token)
        const positions = computeEffectOrbit(token, effectSprites.length)
        if (!positions) return

        for (let i = 0; i < effectSprites.length; i++) {
            let sprite = effectSprites[i]
            const pos = positions.list[i]

            if (sprite instanceof PIXI.Sprite && !sprite[FLAGS.IS_PROCESSED]) {
                sprite[FLAGS.IS_PROCESSED] = true
                const container = renderIconContainer(sprite, positions.gridScale, positions.iconSize)
                token.effects.removeChild(sprite)
                token.effects.addChild(container)
                sprite = container
            }

            sprite.position.set(pos.x, pos.y)
            sprite[FLAGS.BG_PARAMS] = { gridScale: positions.gridScale, slotSize: positions.iconSize }
            sprite[FLAGS.EFFECT] = activeEffects[sprite.zIndex] ?? null
        }
        token.effects.sortChildren()
    }

    _registerHooks() {
        Hooks.on('clientSettingChanged', this._onClientSettingChanged.bind(this))
    }

    _onClientSettingChanged(settingKey, ...args) {
        if (!settingKey.startsWith(`${MODULE_ID}.`)) return
        const mustRedrawEffects = REDRAW_EFFECTS_SETTINGS.includes(getSettingName(settingKey))

        if (mustRedrawEffects) {
            EffectManager.refreshAllTokens()
        }
    }

    _getActiveEffects(token) {
        const isV14 = game.release.generation === 14
        return (
            token.actor?.appliedEffects.filter((e) => {
                if (!isV14) return e.isTemporary
                return (
                    e.showIcon === CONST.ACTIVE_EFFECT_SHOW_ICON.ALWAYS ||
                    (e.showIcon === CONST.ACTIVE_EFFECT_SHOW_ICON.CONDITIONAL && e.isTemporary)
                )
            }) ?? []
        )
    }
}
