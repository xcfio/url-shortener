import { Request, Response } from "express"
import { isBlacklisted, sql } from "../utils"
import { lookup } from "node:dns"
import { URL } from "node:url"

export function url_post(req: Request, res: Response) {
    try {
        const url = new URL(req.body.original_url ?? "")
        if (isBlacklisted(url.hostname)) return res.status(403).json({ error: "Oh no... this url is blacklisted" })

        lookup(url.hostname, async (invalid) => {
            if (invalid) return res.status(400).json({ error: "Please enter a valid URL" })

            const exist = (await sql`SELECT short_code FROM url_shortener WHERE original_url = ${url.href}`).shift()
            if (exist) return res.json({ shortUrl: exist.short_code, original_url: url.href })

            const short_code = new Date().getTime().toString(36)
            await sql`INSERT INTO url_shortener ${sql({ original_url: url.href, short_code })}`

            res.json({ shortUrl: short_code, original_url: url.href })
        })
    } catch (error) {
        // prettier-ignore
        if (error instanceof Error && error.message === "Invalid URL") return res.status(400).json({ error: "Please enter a valid URL" })
        res.status(500).json({ error: "An unknown error happen" })
        console.log(error)
    }
}
