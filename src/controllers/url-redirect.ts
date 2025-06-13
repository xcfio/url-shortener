import { FastifyRequest, FastifyReply } from "fastify"
import { sql } from "../utils"

export async function url_redirect(request: FastifyRequest, reply: FastifyReply) {
    try {
        const [result] = await sql<Array<{ original_url: string }>>`
            SELECT original_url FROM url_shortener
            WHERE short_code = ${(request.params as any).code ?? ""}
        `

        if (!result) return reply.status(404).send({ error: "URL not found" })
        reply.redirect(result.original_url)
    } catch (error) {
        console.error(error)
        reply.status(500).send({ error: "An unknown error happen" })
    }
}
