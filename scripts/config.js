export const MODULE_ID = 'simraki-radial-effects'

export const SETTING = {
    // Effect
    EFFECT_BG_COLOR: 'effectBgColor',
    EFFECT_BORDER_COLOR: 'effectBorderColor',
    EFFECT_OPACITY: 'effectOpacity',
    EFFECT_SIZE_MULTIPLIER: 'effectSizeMultiplier',
    EFFECT_SHAPE: 'effectShape',

    // Orbit
    ORBIT_BASE_RADIUS_MULTIPLIER: 'orbitBaseRadiusMultiplier',
    ORBIT_SPACING: 'orbitSpacing',
    ORBIT_START_ANGLE: 'orbitStartAngle',
    ORBIT_REVERSE_DIRECTION: 'orbitReverseDirection',
    ORBIT_SHAPE: 'orbitShape',

    // Interaction
    HOVER_ENABLE_ANIMATION: 'hoverEnableAnimation',
    INTERACTION_REQUIRE_ALT: 'interactionRequireAlt',

    // Tooltip
    TOOLTIP_VISIBILITY_MODE: 'tooltipVisibilityMode',
    TOOLTIP_DELAY: 'tooltipDelay',
    TOOLTIP_ELEMENTS_GM: 'tooltipElementsGM',
    TOOLTIP_ELEMENTS_PLAYER: 'tooltipElementsPlayer',

    // Actions
    CLICK_ACTION_GM: 'clickActionGM',
    CLICK_ACTION_OWNER: 'clickActionOwner',
}

export const CLICK_ACTIONS = {
    NOTHING: 'NOTHING',
    DISABLE: 'DISABLE',
    DELETE: 'DELETE',
}

export const TOOLTIP_VISIBILITY_MODES = {
    DISABLE: 'DISABLE',
    GM_ONLY: 'GM_ONLY',
    OWNERS_ONLY: 'OWNERS_ONLY',
    ANY_PLAYER: 'ANY_PLAYER',
    FRIENDLY_NEUTRAL: 'FRIENDLY_NEUTRAL',
    EVERYONE: 'EVERYONE',
}

export const TOOLTIP_ELEMENTS = {
    DURATION: 'DURATION',
    DESCRIPTION: 'DESCRIPTION',
    SOURCE: 'SOURCE',
}

export const EFFECT_SHAPES = {
    CIRCLE: 'CIRCLE',
    ROUNDED_SQUARE: 'ROUNDED_SQUARE',
    HEXAGON: 'HEXAGON',
    FLAT_HEXAGON: 'FLAT_HEXAGON',
    TRIANGLE: 'TRIANGLE',
}

export const ORBIT_SHAPES = {
    CIRCLE: 'CIRCLE',
    SQUARE: 'SQUARE',
    HEXAGON: 'HEXAGON',
    FLAT_HEXAGON: 'FLAT_HEXAGON',
}

export const FLAGS = {
    IS_CONTAINER: 'SRE_IsContainer',
    IS_PROCESSED: 'SRE_IsProcessed',
    BASE_OPACITY: 'SRE_BaseOpacity',
    EFFECT: 'SRE_ActiveEffect',
    BG_PARAMS: 'SRE_BackgroundParams',
    ANIM_NAME: 'SRE_HoverAnimationName',
}
