const escapeChars = [[/&/g, '&amp;'], [/</g, '&lt;'], [/>/g, '&gt;'], [/"/g, '&quot;'], [/'/g, '&apos;']] as const

function escape(value: string): string {
    return escapeChars.reduce((v, [c, r]) => v.replace(c, r), value)
}

export type XmlChild = XmlElement | XmlFragment | string

export class XmlElement {
    constructor(
        public name: string,
        public props: Record<string, string | number> = {},
        public children: Array<XmlChild> = [],
    ) { }
    public toString(): string {
        const props = Object.entries(this.props).map(([k, v]) => ` ${k}="${escape(`${v}`)}"`).join('')
        const children = this.children.join('')
        return children
            ? `<${this.name}${props}>${children}</${this.name}>`
            : `<${this.name}${props}/>`
    }
}

export class XmlFragment {
    constructor(public children: Array<XmlChild>) { }
    public toString(): string {
        return this.children.join('')
    }
}
