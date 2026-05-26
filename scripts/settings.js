import {
    CLICK_ACTIONS,
    EFFECT_SHAPES,
    MODULE_ID,
    ORBIT_SHAPES,
    SETTING,
    TOOLTIP_ELEMENTS,
    TOOLTIP_VISIBILITY_MODES,
} from './config.js'

export function registerSettings() {
    game.settings.register(MODULE_ID, SETTING.CLICK_ACTION_GM, {
        name: `${MODULE_ID}.Settings.ClickActionGM.Name`,
        hint: `${MODULE_ID}.Settings.ClickActionGM.Hint`,
        scope: 'world',
        config: true,
        type: String,
        default: CLICK_ACTIONS.NOTHING,
        choices: {
            [CLICK_ACTIONS.NOTHING]: `${MODULE_ID}.SettingChoices.ClickActions.Nothing`,
            [CLICK_ACTIONS.DISABLE]: `${MODULE_ID}.SettingChoices.ClickActions.Disable`,
            [CLICK_ACTIONS.DELETE]: `${MODULE_ID}.SettingChoices.ClickActions.Delete`,
        },
    })

    game.settings.register(MODULE_ID, SETTING.CLICK_ACTION_OWNER, {
        name: `${MODULE_ID}.Settings.ClickActionOwner.Name`,
        hint: `${MODULE_ID}.Settings.ClickActionOwner.Hint`,
        scope: 'world',
        config: true,
        type: String,
        default: CLICK_ACTIONS.NOTHING,
        choices: {
            [CLICK_ACTIONS.NOTHING]: `${MODULE_ID}.SettingChoices.ClickActions.Nothing`,
            [CLICK_ACTIONS.DISABLE]: `${MODULE_ID}.SettingChoices.ClickActions.Disable`,
            [CLICK_ACTIONS.DELETE]: `${MODULE_ID}.SettingChoices.ClickActions.Delete`,
        },
    })

    game.settings.register(MODULE_ID, SETTING.TOOLTIP_VISIBILITY_MODE, {
        name: `${MODULE_ID}.Settings.TooltipVisibilityMode.Name`,
        hint: `${MODULE_ID}.Settings.TooltipVisibilityMode.Hint`,
        scope: 'world',
        config: true,
        type: String,
        default: TOOLTIP_VISIBILITY_MODES.ANY_PLAYER,
        choices: {
            [TOOLTIP_VISIBILITY_MODES.DISABLE]: `${MODULE_ID}.SettingChoices.TooltipVisibilityMode.Disable`,
            [TOOLTIP_VISIBILITY_MODES.GM_ONLY]: `${MODULE_ID}.SettingChoices.TooltipVisibilityMode.GMOnly`,
            [TOOLTIP_VISIBILITY_MODES.OWNERS_ONLY]: `${MODULE_ID}.SettingChoices.TooltipVisibilityMode.OwnersOnly`,
            [TOOLTIP_VISIBILITY_MODES.ANY_PLAYER]: `${MODULE_ID}.SettingChoices.TooltipVisibilityMode.AnyPlayer`,
            [TOOLTIP_VISIBILITY_MODES.FRIENDLY_NEUTRAL]: `${MODULE_ID}.SettingChoices.TooltipVisibilityMode.FriendlyNeutral`,
            [TOOLTIP_VISIBILITY_MODES.EVERYONE]: `${MODULE_ID}.SettingChoices.TooltipVisibilityMode.Everyone`,
        },
    })

    game.settings.register(MODULE_ID, SETTING.TOOLTIP_ELEMENTS_GM, {
        name: `${MODULE_ID}.Settings.TooltipElementsGM.Name`,
        hint: `${MODULE_ID}.Settings.TooltipElementsGM.Hint`,
        scope: 'world',
        config: true,
        type: new foundry.data.fields.SetField(
            new foundry.data.fields.StringField({
                choices: {
                    [TOOLTIP_ELEMENTS.DURATION]: { label: `${MODULE_ID}.SettingChoices.TooltipElements.Duration` },
                    [TOOLTIP_ELEMENTS.DESCRIPTION]: {
                        label: `${MODULE_ID}.SettingChoices.TooltipElements.Description`,
                    },
                    [TOOLTIP_ELEMENTS.SOURCE]: { label: `${MODULE_ID}.SettingChoices.TooltipElements.Source` },
                },
            }),
        ),
        default: [TOOLTIP_ELEMENTS.DURATION, TOOLTIP_ELEMENTS.DESCRIPTION, TOOLTIP_ELEMENTS.SOURCE],
    })

    game.settings.register(MODULE_ID, SETTING.TOOLTIP_ELEMENTS_PLAYER, {
        name: `${MODULE_ID}.Settings.TooltipElementsPlayer.Name`,
        hint: `${MODULE_ID}.Settings.TooltipElementsPlayer.Hint`,
        scope: 'world',
        config: true,
        type: new foundry.data.fields.SetField(
            new foundry.data.fields.StringField({
                choices: {
                    [TOOLTIP_ELEMENTS.DURATION]: { label: `${MODULE_ID}.SettingChoices.TooltipElements.Duration` },
                    [TOOLTIP_ELEMENTS.DESCRIPTION]: {
                        label: `${MODULE_ID}.SettingChoices.TooltipElements.Description`,
                    },
                    [TOOLTIP_ELEMENTS.SOURCE]: { label: `${MODULE_ID}.SettingChoices.TooltipElements.Source` },
                },
            }),
        ),
        default: [TOOLTIP_ELEMENTS.DURATION, TOOLTIP_ELEMENTS.DESCRIPTION],
    })

    game.settings.register(MODULE_ID, SETTING.INTERACTION_REQUIRE_ALT, {
        name: `${MODULE_ID}.Settings.InteractionRequireAlt.Name`,
        hint: `${MODULE_ID}.Settings.InteractionRequireAlt.Hint`,
        scope: 'client',
        config: true,
        type: Boolean,
        default: false,
    })

    game.settings.register(MODULE_ID, SETTING.EFFECT_SHAPE, {
        name: `${MODULE_ID}.Settings.EffectShape.Name`,
        hint: `${MODULE_ID}.Settings.EffectShape.Hint`,
        scope: 'client',
        config: true,
        type: String,
        default: EFFECT_SHAPES.CIRCLE,
        choices: {
            [EFFECT_SHAPES.CIRCLE]: `${MODULE_ID}.SettingChoices.EffectShapes.Circle`,
            [EFFECT_SHAPES.ROUNDED_SQUARE]: `${MODULE_ID}.SettingChoices.EffectShapes.RoundedSquare`,
            [EFFECT_SHAPES.HEXAGON]: `${MODULE_ID}.SettingChoices.EffectShapes.Hexagon`,
            [EFFECT_SHAPES.FLAT_HEXAGON]: `${MODULE_ID}.SettingChoices.EffectShapes.FlatHexagon`,
            [EFFECT_SHAPES.TRIANGLE]: `${MODULE_ID}.SettingChoices.EffectShapes.Triangle`,
        },
    })

    game.settings.register(MODULE_ID, SETTING.EFFECT_BG_COLOR, {
        name: `${MODULE_ID}.Settings.EffectBgColor.Name`,
        scope: 'client',
        config: true,
        type: new foundry.data.fields.ColorField({ required: true, initial: '#242731' }),
    })

    game.settings.register(MODULE_ID, SETTING.EFFECT_BORDER_COLOR, {
        name: `${MODULE_ID}.Settings.EffectBorderColor.Name`,
        scope: 'client',
        config: true,
        type: new foundry.data.fields.ColorField({ required: true, initial: '#b39d6b' }),
    })

    game.settings.register(MODULE_ID, SETTING.EFFECT_SIZE_MULTIPLIER, {
        name: `${MODULE_ID}.Settings.EffectSizeMultiplier.Name`,
        scope: 'client',
        config: true,
        type: new foundry.data.fields.NumberField({ required: true, min: 0.2, max: 2, step: 0.05, initial: 1 }),
    })

    game.settings.register(MODULE_ID, SETTING.EFFECT_OPACITY, {
        name: `${MODULE_ID}.Settings.EffectOpacity.Name`,
        scope: 'client',
        config: true,
        type: new foundry.data.fields.NumberField({ required: true, min: 0.1, max: 1, step: 0.05, initial: 0.7 }),
    })

    game.settings.register(MODULE_ID, SETTING.ORBIT_SHAPE, {
        name: `${MODULE_ID}.Settings.OrbitShape.Name`,
        hint: `${MODULE_ID}.Settings.OrbitShape.Hint`,
        scope: 'client',
        config: true,
        type: String,
        default: ORBIT_SHAPES.CIRCLE,
        choices: {
            [ORBIT_SHAPES.CIRCLE]: `${MODULE_ID}.SettingChoices.OrbitShapes.Circle`,
            [ORBIT_SHAPES.SQUARE]: `${MODULE_ID}.SettingChoices.OrbitShapes.Square`,
            [ORBIT_SHAPES.HEXAGON]: `${MODULE_ID}.SettingChoices.OrbitShapes.Hexagon`,
            [ORBIT_SHAPES.FLAT_HEXAGON]: `${MODULE_ID}.SettingChoices.OrbitShapes.FlatHexagon`,
        },
    })

    game.settings.register(MODULE_ID, SETTING.ORBIT_SPACING, {
        name: `${MODULE_ID}.Settings.OrbitSpacing.Name`,
        hint: `${MODULE_ID}.Settings.OrbitSpacing.Hint`,
        scope: 'client',
        config: true,
        type: new foundry.data.fields.NumberField({ required: true, min: 1, max: 2, step: 0.1, initial: 1.3 }),
    })

    game.settings.register(MODULE_ID, SETTING.ORBIT_START_ANGLE, {
        name: `${MODULE_ID}.Settings.OrbitStartAngle.Name`,
        hint: `${MODULE_ID}.Settings.OrbitStartAngle.Hint`,
        scope: 'client',
        config: true,
        type: new foundry.data.fields.NumberField({ required: true, min: 0, max: 355, step: 5, initial: 135 }),
    })

    game.settings.register(MODULE_ID, SETTING.ORBIT_BASE_RADIUS_MULTIPLIER, {
        name: `${MODULE_ID}.Settings.OrbitBaseRadiusMultiplier.Name`,
        hint: `${MODULE_ID}.Settings.OrbitBaseRadiusMultiplier.Hint`,
        scope: 'client',
        config: true,
        type: new foundry.data.fields.NumberField({ required: true, min: 0.2, max: 1.2, step: 0.05, initial: 0.5 }),
    })

    game.settings.register(MODULE_ID, SETTING.ORBIT_REVERSE_DIRECTION, {
        name: `${MODULE_ID}.Settings.OrbitReverseDirection.Name`,
        hint: `${MODULE_ID}.Settings.OrbitReverseDirection.Hint`,
        scope: 'client',
        config: true,
        type: Boolean,
        default: false,
    })

    game.settings.register(MODULE_ID, SETTING.HOVER_ENABLE_ANIMATION, {
        name: `${MODULE_ID}.Settings.HoverEnableAnimation.Name`,
        hint: `${MODULE_ID}.Settings.HoverEnableAnimation.Hint`,
        scope: 'client',
        config: true,
        type: Boolean,
        default: true,
    })

    game.settings.register(MODULE_ID, SETTING.TOOLTIP_DELAY, {
        name: `${MODULE_ID}.Settings.TooltipDelay.Name`,
        hint: `${MODULE_ID}.Settings.TooltipDelay.Hint`,
        scope: 'client',
        config: true,
        type: new foundry.data.fields.NumberField({ required: true, min: 100, initial: 300 }),
    })
}

export function getSetting(key) {
    return game.settings.get(MODULE_ID, key)
}

export function getSettingName(settingKey) {
    return settingKey.replace(`${MODULE_ID}.`, '')
}
