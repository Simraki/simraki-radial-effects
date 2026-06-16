import { CLICK_ACTIONS, MODULE_ID, TOOLTIP_ELEMENTS } from '../config.js'

export class BaseSystemAdapter {
    _isV14 = false

    constructor() {
        this._isV14 = game.release.generation === 14
    }

    get settingChoices() {
        return {
            ClickActions: {
                [CLICK_ACTIONS.NOTHING]: `${MODULE_ID}.SettingChoices.ClickActions.Nothing`,
                [CLICK_ACTIONS.DISABLE]: `${MODULE_ID}.SettingChoices.ClickActions.Disable`,
                [CLICK_ACTIONS.DELETE]: `${MODULE_ID}.SettingChoices.ClickActions.Delete`,
            },
            TooltipElements: {
                [TOOLTIP_ELEMENTS.DURATION]: { label: `${MODULE_ID}.SettingChoices.TooltipElements.Duration` },
                [TOOLTIP_ELEMENTS.DESCRIPTION]: { label: `${MODULE_ID}.SettingChoices.TooltipElements.Description` },
                [TOOLTIP_ELEMENTS.SOURCE]: { label: `${MODULE_ID}.SettingChoices.TooltipElements.Source` },
            },
        }
    }

    getActiveEffects(token) {
        const unfiltered = token.actor?.appliedEffects ?? []
        if (!unfiltered.length) return []
        return unfiltered.filter((e) => {
            if (!this._isV14) return e.isTemporary
            return (
                e.showIcon === CONST.ACTIVE_EFFECT_SHOW_ICON.ALWAYS ||
                (e.showIcon === CONST.ACTIVE_EFFECT_SHOW_ICON.CONDITIONAL && e.isTemporary)
            )
        })
    }

    formatDuration(effect) {
        if (!effect.duration) return ''

        let isExpired = false
        let isInfinite = false

        if (this._isV14) {
            isExpired = effect.duration.expired
            isInfinite = !effect.isTemporary
        } else {
            const rem = effect.duration.remaining
            isExpired = Number.isNumeric(rem) && rem <= 0
            isInfinite = rem === null
        }
        if (isExpired) return game.i18n.localize(`${MODULE_ID}.TimeExpired`)
        if ((effect.isTemporary && isInfinite) || !effect.isTemporary) {
            return game.i18n.localize(`${MODULE_ID}.TimeUnlimited`)
        }
        return effect.duration.label || ''
    }
}
