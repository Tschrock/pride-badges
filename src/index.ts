import { errorBadge, prideBadge } from './badge';
import { toSvgColor } from './color';
import { XmlElement } from './xml';

import indexText from './index.html'

export interface Env { }

function svgResponse(xml: XmlElement): Response {
    return new Response(xml.toString(), {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "image/svg+xml;charset=utf-8",
            "Cache-Control": "max-age=86400, s-maxage=86400"
        }
    })
}

const EXAMPLES = [
    "/static/v1?label=lgbtq%2B%20friendly&stripeWidth=6&stripeColors=E40303,FF8C00,FFED00,008026,24408E,732982",
    "/static/v1?label=trans%20rights&stripeWidth=6&stripeColors=5BCEFA,F5A9B8,FFFFFF,F5A9B8,5BCEFA"
]

export default {
    async fetch(
        request: Request,
        env: Env,
        ctx: ExecutionContext
    ): Promise<Response> {
        const url = new URL(request.url)
        const method = request.method
        if (url.pathname == "/static/v1") {
            if (method == "GET") {
                const label = url.searchParams.get("label")
                const labelColor = url.searchParams.get("labelColor") ?? "#555"
                const stripeWidth = url.searchParams.get("stripeWidth") ?? "6"
                const stripeColors = url.searchParams.get("stripeColors")

                if (!stripeColors) return svgResponse(errorBadge("stripeColors is required"))

                const stripeWidthInt = Number(stripeWidth)

                if (!Number.isSafeInteger(stripeWidthInt) || stripeWidthInt <= 0 || stripeWidthInt > 100) {
                    return svgResponse(errorBadge("stripeWidth must be a positive integer between 1 and 100"))
                }

                const stripeColorsArr = stripeColors.split(",").map(x => x.trim()).filter(x => x)

                if (!stripeColorsArr.length) return svgResponse(errorBadge("stripeColors is required"))

                return svgResponse(prideBadge(label, toSvgColor(labelColor), stripeWidthInt, stripeColorsArr.map(toSvgColor)))
            } else {
                return new Response("Method Not Allowed", { status: 405, headers: { "Allow": "GET" } })
            }
        } else if (url.pathname == "/") {
            if (method == "GET") {
                const examplesHtml = EXAMPLES.map(e => `<img src="${e}" /><pre>${new URL(e, url).toString()}</pre>`).join('')
                return new Response(indexText.replace("<!-- EXAMPLES -->", examplesHtml), { status: 200, headers: { "Content-Type": "text/html;charset=utf-8" } })
            } else {
                return new Response("Method Not Allowed", { status: 405, headers: { "Allow": "GET" } })
            }
        } else {
            return new Response("Not Found", { status: 404 })
        }
    }
}
