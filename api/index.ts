import { url_post, url_redirect } from "./controllers"
import file from "./public"
import rl from "@fastify/rate-limit"
import Router from "fastify"

const fastify = Router()

fastify.get("/", (_, reply) => reply.type("text/html").send(file))
fastify.get("/status", (_, reply) => reply.code(200).send({ status: "ok" }))

fastify.post("/", url_post)
fastify.get("/:code", url_redirect)

export default async function handler(req: any, reply: any) {
    await fastify.register(rl, { max: 20, timeWindow: "1 minute" })
    await fastify.ready()
    fastify.server.emit("request", req, reply)
}
