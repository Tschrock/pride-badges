// Copied from shields.io + Added TypeScript types
// https://github.com/badges/shields/blob/74c7b062ddcc043a64da69a568c385856100ba6d/badge-maker/lib/color.js
// License: CC0-1.0

import { fromString } from 'css-color-converter'

const namedColors = {
    brightgreen: '#4c1',
    green: '#97ca00',
    yellow: '#dfb317',
    yellowgreen: '#a4a61d',
    orange: '#fe7d37',
    red: '#e05d44',
    blue: '#007ec6',
    grey: '#555',
    lightgrey: '#9f9f9f',
}

const aliases = {
    gray: 'grey',
    lightgray: 'lightgrey',
    critical: 'red',
    important: 'orange',
    success: 'brightgreen',
    informational: 'blue',
    inactive: 'lightgrey',
}

const resolvedAliases: Record<string, string> = {}
Object.entries(aliases).forEach(([alias, original]) => {
  resolvedAliases[alias] = namedColors[original as keyof typeof namedColors]
})

const hexColorRegex = /^([\da-f]{3}){1,2}$/i
function isHexColor(s = '') {
    return hexColorRegex.test(s)
}

function isCSSColor(color: string) {
    return typeof color === 'string' && fromString(color.trim())
}

function normalizeColor(color: string): string {
    if (color === undefined) {
        return namedColors.lightgrey
    } else if (color in namedColors) {
        return color
    } else if (color in aliases) {
        return aliases[color as keyof typeof aliases]
    } else if (isHexColor(color)) {
        return `#${color.toLowerCase()}`
    } else if (isCSSColor(color)) {
        return color.toLowerCase()
    } else {
        return namedColors.lightgrey
    }
}

export function toSvgColor(color: string): string {
    const normalized = normalizeColor(color)
    if (normalized in namedColors) {
        return namedColors[normalized as keyof typeof namedColors]
    } else if (normalized in resolvedAliases) {
        return resolvedAliases[normalized]
    } else {
        return normalized
    }
}

export function colorsForBackground(color: string) {
    const brightnessThreshold = 0.69
    if (brightness(color) <= brightnessThreshold) {
        return { textColor: '#fff', shadowColor: '#010101' }
    } else {
        return { textColor: '#333', shadowColor: '#ccc' }
    }
}

export function brightness(color: string) {
    if (color) {
        const cssColor = fromString(color)
        if (cssColor) {
            const rgb = cssColor.toRgbaArray()
            return +((rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 255000).toFixed(2)
        }
    }
    return 0
}
