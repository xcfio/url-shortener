import { Request, Response } from "express"
import { sql } from "../utils"

export async function url_redirect(req: Request, res: Response) {
    try {
        const [result] = await sql<Array<{ original_url: string }>>`
            SELECT original_url FROM url_shortener
            WHERE short_code = ${req.params.code ?? ""}
        `

        if (!result) return res.status(404).json({ error: "URL not found" })
        res.redirect(result.original_url)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "An unknown error happen" })
    }
}
