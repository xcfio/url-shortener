import { url_post, url_redirect } from "./controllers"
import file from "./public"
import rl from "@fastify/rate-limit"
import Fastify from "fastify"

export async function init() {
    const fastify = Fastify({ logger: true })
    await fastify.register(rl, { max: 20, timeWindow: 60000 })

    fastify.get("/", (_, reply) => reply.type("text/html").send(file))
    fastify.get("/status", (_, reply) => reply.code(200).send({ status: "ok" }))

    fastify.post("/", url_post)
    fastify.get("/:code", url_redirect)

    const port = Number(process.env.PORT || 3000)
    const host = "RENDER" in process.env ? `0.0.0.0` : `localhost`

    await fastify.listen({ host, port })
    return fastify
}

init()
