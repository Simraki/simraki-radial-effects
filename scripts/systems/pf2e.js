import { BaseSystemAdapter } from './base.js'
import { CLICK_ACTIONS, TOOLTIP_ELEMENTS } from '../config.js'

export class PF2eAdapter extends BaseSystemAdapter {
    get settingChoices() {
        const choices = super.settingChoices
        delete choices['ClickActions'][CLICK_ACTIONS.DISABLE]
        delete choices['TooltipElements'][TOOLTIP_ELEMENTS.SOURCE]
        return choices
    }

    getActiveEffects(token) {
        const actor = token.actor
        if (!actor) return []
        const isGM = game.user.isGM

        return [...actor.itemTypes.affliction, ...actor.conditions.active, ...actor.itemTypes.effect].filter(
            (e) => !e.system.unidentified || isGM,
        )
    }

    formatDuration(effect) {
        // NOTE || from: https://github.com/foundryvtt/pf2e/blob/v14-dev/src/module/apps/effects-panel.ts
        const system = effect.system
        if (effect.totalDuration === Infinity) {
            if (system.duration.unit === 'encounter') {
                return system.expired
                    ? game.i18n.format('PF2E.EffectPanel.Expired')
                    : game.i18n.format('PF2E.EffectPanel.UntilEncounterEnds')
            } else {
                return game.i18n.format('PF2E.EffectPanel.UnlimitedDuration')
            }
        } else if (system.expired) {
            return game.i18n.format('PF2E.EffectPanel.Expired')
        }

        const remaining = effect.remainingDuration.remaining
        const expiry = system.duration.expiry

        if (remaining >= 63_072_000) {
            // two years
            return game.i18n.format('PF2E.EffectPanel.RemainingDuration.MultipleYears', {
                years: Math.floor(remaining / 31_536_000),
            })
        } else if (remaining >= 31_536_000) {
            // one year
            return game.i18n.format('PF2E.EffectPanel.RemainingDuration.SingleYear')
        } else if (remaining >= 1_209_600) {
            // two weeks
            return game.i18n.format('PF2E.EffectPanel.RemainingDuration.MultipleWeeks', {
                weeks: Math.floor(remaining / 604_800),
            })
        } else if (remaining > 604_800) {
            // one week
            return game.i18n.format('PF2E.EffectPanel.RemainingDuration.SingleWeek')
        } else if (remaining >= 172_800) {
            // two days
            return game.i18n.format('PF2E.EffectPanel.RemainingDuration.MultipleDays', {
                days: Math.floor(remaining / 86_400),
            })
        } else if (remaining > 7_200) {
            // two hours
            return game.i18n.format('PF2E.EffectPanel.RemainingDuration.MultipleHours', {
                hours: Math.floor(remaining / 3_600),
            })
        } else if (remaining > 120) {
            // two minutes
            return game.i18n.format('PF2E.EffectPanel.RemainingDuration.MultipleMinutes', {
                minutes: Math.floor(remaining / 60),
            })
        } else if (remaining >= 12) {
            // two rounds
            return game.i18n.format('PF2E.EffectPanel.RemainingDuration.MultipleRounds', {
                rounds: Math.floor(remaining / 6),
            })
        } else if (remaining >= 6) {
            // one round
            return game.i18n.format('PF2E.EffectPanel.RemainingDuration.SingleRound')
        } else if (remaining >= 2) {
            // two seconds
            return game.i18n.format('PF2E.EffectPanel.RemainingDuration.MultipleSeconds', { seconds: remaining })
        } else if (remaining === 1) {
            // one second
            return game.i18n.format('PF2E.EffectPanel.RemainingDuration.SingleSecond')
        } else {
            // zero rounds
            const key =
                expiry === 'turn-end'
                    ? 'PF2E.EffectPanel.RemainingDuration.ZeroRoundsExpireTurnEnd'
                    : 'PF2E.EffectPanel.RemainingDuration.ZeroRoundsExpireTurnStart'
            const initiative = system.start.initiative ?? 0
            return game.i18n.format(key, { initiative })
        }
    }
}
