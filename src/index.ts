import { url_post, url_redirect } from "./controllers"
import file from "./public"
import rl from "@fastify/rate-limit"
import Router from "fastify"

const fastify = Router()
fastify.register(rl, { max: 20, timeWindow: "1 minute" })

fastify.get("/", (_, reply) => reply.type("text/html").send(file))
fastify.get("/status", (_, reply) => reply.code(200).send({ status: "ok" }))

fastify.post("/", url_post)
fastify.get("/:code", url_redirect)

// fastify.use((_req, reply) => reply.status(404).json({ error: "Oh no... look like you entered wrong url" }))

export default fastify
