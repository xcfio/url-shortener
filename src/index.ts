import { Router } from "express"
import postgres from "postgres"
import file from "./file"

const router = Router()
const sql = postgres(process.env.URI)

router.get("/", (_req, res) => res.send(file))
router.post("/", async (req, res) => {
    try {
        const { original_url } = req.body
        const short_code = new Date().getTime().toString(36)
        await sql`INSERT INTO urls ${sql({ original_url, short_code })}`
        res.json({ shortUrl: short_code, original_url })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "An unknown error happen" })
    }
})

router.get("/:code", async (req, res) => {
    try {
        const { code } = req.params
        const result = await sql`SELECT original_url FROM urls WHERE short_code = ${code}`
        if (!result.length) return res.status(404).send("URL not found")
        res.redirect(result[0].original_url)
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
