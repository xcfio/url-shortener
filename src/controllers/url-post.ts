import { FastifyRequest, FastifyReply } from "fastify"
import { promisify } from "node:util"
import { isBlacklisted, sql } from "../utils"
import { lookup } from "node:dns"
import { URL } from "node:url"

export async function url_post(request: FastifyRequest, reply: FastifyReply) {
    try {
        const url = new URL((request.body as any).original_url ?? "")
        if (await isBlacklisted(url.hostname)) {
            return reply.status(403).send({ error: "Oh no... this url is blacklisted" })
        }

        await promisify(lookup)(url.hostname)

        const exist = (await sql`SELECT short_code FROM url_shortener WHERE original_url = ${url.href}`).shift()
        if (exist) return { shortUrl: exist.short_code, original_url: url.href }

        const short_code = new Date().getTime().toString(36)
        await sql`INSERT INTO url_shortener ${sql({ original_url: url.href, short_code })}`

        return { shortUrl: short_code, original_url: url.href }
    } catch (error) {
        // prettier-ignore
        if (error instanceof Error && error.message === "Invalid URL") return reply.status(400).send({ error: "Please enter a valid URL" })
        reply.status(500).send({ error: "An unknown error happen" })
        console.log(error)
    }
}
