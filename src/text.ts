import anafanafo from 'anafanafo'

export const FONT_SCALE_UP_FACTOR = 10
export const FONT_SCALE_DOWN_VALUE = 'scale(.1)'
export const FONT_FAMILY = 'Verdana,Geneva,DejaVu Sans,sans-serif'
export const WIDTH_FONT = '11px Verdana'

function roundUpToOdd(val: number) {
    return val % 2 === 0 ? val + 1 : val
}

export function preferredWidthOf(str: string) {
    return roundUpToOdd(anafanafo(str, { font: WIDTH_FONT }) | 0)
}
