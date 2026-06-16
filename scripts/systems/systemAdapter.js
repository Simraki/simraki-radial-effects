import { BaseSystemAdapter } from './base.js'
import { PF2eAdapter } from './pf2e.js'

const SYSTEM_ADAPTERS = new Map()

registerSystemAdapter('pf2e', PF2eAdapter)
// BaseSystemAdapter tested on:
// dnd5e, swade, wfrp4e

export function registerSystemAdapter(systemId, adapterClass) {
    SYSTEM_ADAPTERS.set(systemId, adapterClass)
}

export function getSystemAdapter() {
    const AdapterClass = SYSTEM_ADAPTERS.get(game.system.id) ?? BaseSystemAdapter
    return new AdapterClass()
}
