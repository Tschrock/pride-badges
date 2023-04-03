declare module 'anafanafo' {
    export = (text: string, options?: { font?: string, guess?: boolean }) => number
}
declare module 'css-color-converter' {
    export interface Color {
        toRgbString(): string
        toHslString(): string
        toHexString(): string
        toRgbaArray(): [number, number, number, number]
        toHslaArray(): [number, number, number, number]
    }
    export function fromRgba(str: string): Color
    export function fromRgb(str: string): Color
    export function fromHsla(str: string): Color
    export function fromHsl(str: string): Color
    export function fromString(str: string): Color | null
}
declare module '*.html' {
    const html: string
    export = html
}
