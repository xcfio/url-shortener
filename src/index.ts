import { lookup } from "node:dns"
import { Router } from "express"
import { URL } from "node:url"
import postgres from "postgres"
import file from "./file"

const router = Router()
const sql = postgres(process.env.URI)
let scam_website: Set<string>

fetch("https://raw.githubusercontent.com/nikolaischunk/discord-phishing-links/main/domain-list.json")
    .then((buffer) => buffer.json())
    .then((data) => (scam_website = new Set<string>(data.domains as Array<string>)))
    .catch(console.trace)

router.use((req, _res, next) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress
    const language = req.headers["accept-language"]
    const method = req.method
    const url = req.url

    console.log(method, url, ip, language)
    console.log(req.headers.accept)
    console.log(req.headers["user-agent"])
    next()
})

router.get("/", (_req, res) => res.send(file))
router.post("/", async (req, res) => {
    try {
        const url = new URL(req.body.original_url)
        if (scam_website.has(url.href)) return res.sendStatus(400)

        lookup(url.hostname, async (invalid) => {
            if (invalid) return res.sendStatus(400)

            const exist = (await sql`SELECT short_code FROM urls WHERE original_url = ${url.href}`).shift()
            if (exist) return res.json({ shortUrl: exist.short_code, original_url: url.href })

            const short_code = new Date().getTime().toString(36)
            await sql`INSERT INTO urls ${sql({ original_url: url.href, short_code })}`

            res.json({ shortUrl: short_code, original_url: url.href })
        })
    } catch (error) {
        if (error instanceof Error && error.message === "Invalid URL") return res.sendStatus(400)
        res.status(500).json({ error: "An unknown error happen" })
        console.log(error)
    }
})

router.get("/:code", async (req, res) => {
    try {
        const [result] = await sql<Array<{ original_url: string }>>`
            SELECT original_url FROM urls 
            WHERE short_code = ${req.params.code ?? ""}
        `

        if (!result) return res.status(404).send("URL not found")
        res.redirect(result.original_url)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "An unknown error happen" })
    }
})

router.use((_req, res) => res.status(404).json({ error: "Oh no... look like you entered wrong url" }))
export default () => router

/*
-- create table
CREATE TABLE urls (
  id UUID PRIMARY KEY default gen_random_uuid(),
  original_url TEXT NOT NULL,
  short_code VARCHAR(10) NOT NULL UNIQUE
);
*/
