import { getSetting, getSettingName } from './settings.js'
import { MODULE_ID, SETTING, TOOLTIP_ELEMENTS, TOOLTIP_VISIBILITY_MODES } from './config.js'
import { getSystemAdapter } from './systems/systemAdapter.js'

const RECREATE_TOOLTIP_SETTINGS = [SETTING.EFFECT_BG_COLOR, SETTING.EFFECT_BORDER_COLOR]

export class TooltipManager {
    _el = null
    _timeoutId = null
    _currentEffect = null
    _isV14 = false
    _adapter = null

    constructor() {
        this._isV14 = game.release.generation === 14
        this._adapter = getSystemAdapter()

        this._registerHooks()
        if (this.isEnabled) this.create()
    }

    get isShown() {
        return this._el?.style.display === 'block'
    }

    get isEnabled() {
        return getSetting(SETTING.TOOLTIP_VISIBILITY_MODE) !== TOOLTIP_VISIBILITY_MODES.DISABLE
    }

    get isScheduled() {
        return !!this._timeoutId
    }

    create() {
        this._el = document.createElement('div')
        this._el.classList.add('sre-tooltip')
        this._el.style.setProperty('--sre-tooltip-bg-color', getSetting(SETTING.EFFECT_BG_COLOR).css)
        this._el.style.setProperty('--sre-tooltip-border-color', getSetting(SETTING.EFFECT_BORDER_COLOR).css)
        const container = document.getElementById('interface') || document.body
        container.appendChild(this._el)
    }

    destroy() {
        if (this.isScheduled) this._removeTimeout()
        if (this._el) {
            this._el.remove()
            this._el = null
        }
        this._currentEffect = null
    }

    scheduleShow(hit, event) {
        if (!this._shouldShowFor(hit.token)) return

        if (this._currentEffect !== hit.effect) this._removeTimeout()

        if (this.isShown) {
            void this._show(hit.effect, event)
            return
        }

        if (!this._timeoutId) {
            this._timeoutId = setTimeout(async () => {
                await this._show(hit.effect, event)
                this._removeTimeout()
            }, getSetting(SETTING.TOOLTIP_DELAY))
        }
    }

    hide() {
        this._removeTimeout()
        if (this._el) this._el.style.display = 'none'
        this._currentEffect = null
    }

    async _show(effect, event) {
        if (!effect || !this._el) return

        const ne = event.nativeEvent
        let left = ne.clientX + 16
        let top = ne.clientY + 16
        if (left + this._el.offsetWidth > window.innerWidth) left = ne.clientX - this._el.offsetWidth - 16
        if (top + this._el.offsetHeight > window.innerHeight) top = ne.clientY - this._el.offsetHeight - 16
        this._el.style.left = `${Math.max(0, left)}px`
        this._el.style.top = `${Math.max(0, top)}px`

        const data = await this._getEffectData(effect)

        const safeName = typeof effect.name === 'string' ? foundry.utils.escapeHTML(effect.name) : ''
        let html = `<div class="sre-tooltip__title">${safeName}</div>`
        if (data.duration) {
            const durationText = game.i18n.localize(`${MODULE_ID}.Duration`)
            html += `<div class="sre-tooltip__duration">${durationText}: ${data.duration}</div>`
        }
        if (data.source) {
            const sourceText = game.i18n.localize(`${MODULE_ID}.Source`)
            html += `<div class="sre-tooltip__source">${sourceText}: ${data.source}</div>`
        }
        if (data.description) {
            html += `<div class="sre-tooltip__description">${data.description}</div>`
        }
        this._el.innerHTML = html
        this._el.style.display = 'block'
        this._currentEffect = effect
    }

    async _getEffectData(effect) {
        const allowed = getSetting(game.user.isGM ? SETTING.TOOLTIP_ELEMENTS_GM : SETTING.TOOLTIP_ELEMENTS_PLAYER)
        const result = { description: '', duration: '', source: '' }
        if (allowed.has(TOOLTIP_ELEMENTS.DESCRIPTION) && effect.description) {
            result.description = await CONFIG.ux.TextEditor.enrichHTML(effect.description, { relativeTo: effect })
        }
        if (allowed.has(TOOLTIP_ELEMENTS.DURATION)) {
            result.duration = this._adapter.formatDuration(effect)
        }
        if (allowed.has(TOOLTIP_ELEMENTS.SOURCE)) {
            result.source = effect.sourceName
        }
        return result
    }

    _shouldShowFor(token) {
        const mode = getSetting(SETTING.TOOLTIP_VISIBILITY_MODE)
        if (mode === TOOLTIP_VISIBILITY_MODES.DISABLE) return false

        if (game.user.isGM) return true
        if (mode === TOOLTIP_VISIBILITY_MODES.GM_ONLY) return false

        if (token.isOwner) return true
        if (mode === TOOLTIP_VISIBILITY_MODES.OWNERS_ONLY) return false

        if (token.actor?.hasPlayerOwner) return true
        if (mode === TOOLTIP_VISIBILITY_MODES.ANY_PLAYER) return false

        const disposition = token.document?.disposition
        const isFriendly = disposition === CONST.TOKEN_DISPOSITIONS.FRIENDLY
        const isNeutral = disposition === CONST.TOKEN_DISPOSITIONS.NEUTRAL
        if (isFriendly || isNeutral) return true
        if (mode === TOOLTIP_VISIBILITY_MODES.FRIENDLY_NEUTRAL) return false

        // const isSecret = disposition === CONST.TOKEN_DISPOSITIONS.SECRET
        // if (isSecret) return false

        return mode === TOOLTIP_VISIBILITY_MODES.EVERYONE
    }

    _removeTimeout() {
        if (this.isScheduled) {
            clearTimeout(this._timeoutId)
            this._timeoutId = null
        }
    }

    _registerHooks() {
        Hooks.on('updateSetting', this._onWorldSettingChanged.bind(this))
        Hooks.on('clientSettingChanged', this._onClientSettingChanged.bind(this))
    }

    _onWorldSettingChanged(setting, ...args) {
        if (!setting.key.startsWith(`${MODULE_ID}.`)) return
        if (getSettingName(setting.key) !== SETTING.TOOLTIP_VISIBILITY_MODE) return

        if (setting.value === TOOLTIP_VISIBILITY_MODES.DISABLE) {
            this.destroy()
        } else {
            this.create()
        }
    }

    _onClientSettingChanged(settingKey, ...args) {
        if (!settingKey.startsWith(`${MODULE_ID}.`)) return
        const mustRecreateTooltip = RECREATE_TOOLTIP_SETTINGS.includes(getSettingName(settingKey))

        if (mustRecreateTooltip && this.isEnabled) {
            this.destroy()
            this.create()
        }
    }
}
