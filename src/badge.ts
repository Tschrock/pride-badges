import { colorsForBackground } from "./color";
import { FONT_FAMILY, FONT_SCALE_DOWN_VALUE, FONT_SCALE_UP_FACTOR, preferredWidthOf } from "./text";
import { XmlChild, XmlElement, XmlFragment } from "./xml";

const PADDING_HORIZ = 5
const LABEL_MARGIN = 1
const BADGE_HEIGHT = 20

const GRADIENT = new XmlElement('linearGradient', { id: 's', x2: 0, y2: '100%' }, [
    new XmlElement('stop', { offset: 0, 'stop-color': '#bbb', 'stop-opacity': '.1' }),
    new XmlElement('stop', { offset: 1, 'stop-opacity': '.1' }),
])

function rect(x: number, width: number, height: number, fill: string): XmlElement {
    return new XmlElement('rect', { ...(x == 0 ? {} : { x }), width, height, fill })
}

function clipPath(width: number, height: number): XmlElement {
    return new XmlElement('clipPath', { id: 'r' }, [
        new XmlElement('rect', { width, height, rx: 3, fill: '#fff' })
    ])
}

function backgroundGroup(children: XmlChild[]): XmlElement {
    return new XmlElement('g', { 'clip-path': 'url(#r)' }, children)
}

function foregroundGroup(children: XmlChild[]): XmlElement {
    return new XmlElement('g', {
        fill: '#fff',
        'text-anchor': 'middle',
        'font-family': FONT_FAMILY,
        'text-rendering': 'geometricPrecision',
        'font-size': 110,
    }, children)
}

function getTextElement(leftMargin: number, content: string, bgColor: string, textWidth: number) {
    const { textColor, shadowColor } = colorsForBackground(bgColor)
    const x = FONT_SCALE_UP_FACTOR * (leftMargin + 0.5 * textWidth + PADDING_HORIZ)

    const text = new XmlElement('text', {
        x,
        y: 140,
        transform: FONT_SCALE_DOWN_VALUE,
        fill: textColor,
        textLength: FONT_SCALE_UP_FACTOR * textWidth,
    }, [content])

    const shadowText = new XmlElement('text', {
        'aria-hidden': 'true',
        x,
        y: 150,
        fill: shadowColor,
        'fill-opacity': '.3',
        transform: FONT_SCALE_DOWN_VALUE,
        textLength: FONT_SCALE_UP_FACTOR * textWidth,
    }, [content])
    return new XmlFragment([shadowText, text])
}

export function svgBadge(title: string | null, width: number, height: number, content: XmlChild[]): XmlElement {
    return new XmlElement('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        'xmlns:xlink': 'http://www.w3.org/1999/xlink',
        width,
        height,
        role: 'img',
        'aria-label': title ?? ''
    }, [
        title ? new XmlElement('title', {}, [title]) : '',
        GRADIENT,
        clipPath(width, height),
        ...content
    ])
}

export function errorBadge(message: string): XmlElement {
    const messageWidth = preferredWidthOf(message)
    const badgeWidth = messageWidth + 2 * PADDING_HORIZ
    return svgBadge("Error", badgeWidth, BADGE_HEIGHT, [
        backgroundGroup([
            rect(0, badgeWidth, BADGE_HEIGHT, '#ff0000'),
            rect(0, badgeWidth, BADGE_HEIGHT, 'url(#s)')
        ]),
        foregroundGroup([getTextElement(LABEL_MARGIN, message, '#ff0000', messageWidth)]),
    ])
}

export function prideBadge(label: string | null, labelColor: string, stripeWidth: number, stripes: string[]): XmlElement {
    const background: XmlChild[] = []
    const foreground: XmlChild[] = []
    let badgeWidth = 0

    if (label && label.length) {
        const labelWidth = preferredWidthOf(label)
        const leftWidth = labelWidth + 2 * PADDING_HORIZ
        background.push(rect(badgeWidth, leftWidth, BADGE_HEIGHT, labelColor))
        badgeWidth += leftWidth
        foreground.push(getTextElement(LABEL_MARGIN, label, labelColor, labelWidth))
    }

    for (const stripeColor of stripes) {
        background.push(rect(badgeWidth, stripeWidth, BADGE_HEIGHT, stripeColor))
        badgeWidth += stripeWidth
    }
    background.push(rect(0, badgeWidth, BADGE_HEIGHT, 'url(#s)'))

    return svgBadge(label, badgeWidth, BADGE_HEIGHT, [
        backgroundGroup(background),
        foregroundGroup(foreground)
    ])
}
