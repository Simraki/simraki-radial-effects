import { getSetting } from './settings.js'
import { CLICK_ACTIONS, FLAGS, SETTING } from './config.js'
import { hoverAnimate } from './hoverAnimate.js'

export class InteractionHandler {
    static THROTTLE_MS = 16
    static BOUND_SIZE = 200

    constructor(tooltipManager) {
        this.tooltipManager = tooltipManager
        this.hoveredHit = null
        this.installed = false

        this._onPointerDown = this.onPointerDown.bind(this)
        this._onPointerMove = foundry.utils.throttle(this.onPointerMove.bind(this), InteractionHandler.THROTTLE_MS)
    }

    install() {
        this.hoveredHit = null
        if (!canvas?.app?.stage || this.installed) return
        const stage = canvas.app.stage
        stage.eventMode = 'static'
        stage.addEventListener('pointerdown', this._onPointerDown, { capture: true })
        stage.addEventListener('pointermove', this._onPointerMove, { capture: true })
        this.installed = true
    }

    uninstall() {
        const stage = canvas?.app?.stage
        if (this.installed && stage) {
            stage.removeEventListener('pointerdown', this._onPointerDown, { capture: true })
            stage.removeEventListener('pointermove', this._onPointerMove, { capture: true })
        }
        this.installed = false
        this.clearHover()
    }

    onPointerDown(event) {
        if (!event.button || !this._isPointerOverCanvas(event)) return
        const hit = this._hitTest(event.global)
        if (!hit) return

        event.stopPropagation?.()
        event.stopImmediatePropagation?.()
        event.nativeEvent?.stopPropagation?.()

        if (hit.token.isOwner) {
            const action = this._getClickAction()
            if (action === CLICK_ACTIONS.DELETE) hit.effect.delete()
            else if (action === CLICK_ACTIONS.DISABLE) hit.effect.update({ disabled: !hit.effect.disabled })
        }
        this.clearHover()
    }

    onPointerMove(event) {
        if (canvas.tokens._draggedToken) return
        if (!this._isPointerOverCanvas(event)) {
            this.clearHover()
            return
        }

        const hit = this._hitTest(event.global)
        if (!hit) {
            this.clearHover()
            return
        }
        if (hit.token.movementAnimationPromise) return
        if (getSetting(SETTING.INTERACTION_REQUIRE_ALT) && !event.altKey) return

        if (this.hoveredHit?.sprite !== hit.sprite) {
            if (this.hoveredHit?.sprite) hoverAnimate(this.hoveredHit.sprite)
            hoverAnimate(hit.sprite, true)
            this.hoveredHit = hit
        }

        if (hit.token.isOwner && this._getClickAction() !== CLICK_ACTIONS.NOTHING) this._setCanvasCursor('pointer')
        this.tooltipManager.scheduleShow(hit, event)
    }

    clearHover() {
        if (this.hoveredHit?.sprite) hoverAnimate(this.hoveredHit.sprite)
        this.hoveredHit = null
        this._setCanvasCursor('')
        if (this.tooltipManager.isEnabled) this.tooltipManager.hide()
    }

    _setCanvasCursor(value) {
        const view = canvas?.app?.view
        if (!view || view.style.cursor === value) return
        view.style.cursor = value
    }

    _isPointerOverCanvas(event) {
        const view = canvas?.app?.view
        const target = event.nativeEvent?.target
        return !view || !target || view === target
    }

    _getClickAction() {
        return getSetting(game.user.isGM ? SETTING.CLICK_ACTION_GM : SETTING.CLICK_ACTION_OWNER)
    }

    _hitTest(globalPoint) {
        if (!globalPoint || !canvas?.tokens) return null
        const canvasPoint = canvas.stage.toLocal(globalPoint)
        const bounds = new PIXI.Rectangle(
            canvasPoint.x - InteractionHandler.BOUND_SIZE / 2,
            canvasPoint.y - InteractionHandler.BOUND_SIZE / 2,
            InteractionHandler.BOUND_SIZE,
            InteractionHandler.BOUND_SIZE,
        )
        const nearby = canvas.tokens.quadtree.getObjects(bounds)
        for (const token of nearby) {
            if (!token.effects?.children?.length) continue
            const localPoint = token.effects.toLocal(globalPoint)
            for (const sprite of token.effects.children) {
                const effect = sprite[FLAGS.EFFECT]
                const slotSize = sprite[FLAGS.BG_PARAMS]?.slotSize || sprite.width
                if (!effect || !slotSize || !sprite.parent) continue
                const radius = 0.6 * slotSize * sprite.scale.x
                const dx = localPoint.x - sprite.position.x
                const dy = localPoint.y - sprite.position.y
                if (dx * dx + dy * dy <= radius * radius) {
                    return { sprite, effect, token }
                }
            }
        }
        return null
    }
}
