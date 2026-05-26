import { registerSettings } from './settings.js'
import { MODULE_ID } from './config.js'
import { TooltipManager } from './tooltipManager.js'
import { EffectManager } from './effectManager.js'
import { InteractionHandler } from './interactionHandler.js'

Hooks.on('init', () => {
    registerSettings()

    const tooltipManager = new TooltipManager()
    const effectManager = new EffectManager()
    const interactionHandler = new InteractionHandler(tooltipManager)

    Hooks.on('canvasReady', function () {
        interactionHandler.install()
    })
    Hooks.on('canvasTearDown', function () {
        interactionHandler.uninstall()
    })
    Hooks.on('updateToken', function (tokenDoc, updateData) {
        if (updateData.width === undefined && updateData.height === undefined) return
        const token = canvas.tokens?.get(tokenDoc.id)
        EffectManager.refreshToken(token)
    })

    if (typeof libWrapper === 'undefined') {
        Hooks.once('ready', () => {
            ui.notifications.error(`libWrapper is required for module "${MODULE_ID}" to function correctly`)
        })
        // eslint-disable-next-line no-console
        console.error(`[${MODULE_ID}]: libWrapper is not installed`)
        return
    }

    libWrapper.register(
        MODULE_ID,
        'foundry.canvas.placeables.Token.prototype._refreshState',
        function (wrapped, ...args) {
            const result = wrapped(...args)
            if (this.border?.zIndex === Infinity) this.border.zIndex = 100
            if (this.effects) this.effects.zIndex = 200
            return result
        },
        'WRAPPER',
    )
    libWrapper.register(
        MODULE_ID,
        'foundry.canvas.placeables.Token.prototype._refreshEffects',
        function (wrapped, ...args) {
            wrapped(...args)
            effectManager.applyToToken(this)
        },
        'WRAPPER',
    )

    // eslint-disable-next-line no-console
    console.log(`[${MODULE_ID}] initialized`)
})
