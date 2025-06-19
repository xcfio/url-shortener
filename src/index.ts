import { url_post, url_redirect } from "./controllers"
import file from "./public"
import rl from "@fastify/rate-limit"
import Router from "fastify"

const fastify = Router({ logger: true })

fastify.get("/", (_, reply) => reply.type("text/html").send(file))
fastify.get("/status", (_, reply) => reply.code(200).send({ status: "ok" }))

fastify.post("/", url_post)
fastify.get("/:code", url_redirect)

fastify.register(rl, { max: 20, timeWindow: "1 minute" })

const port = Number(process.env.PORT || 3000)
const host = "RENDER" in process.env ? `0.0.0.0` : `localhost`

fastify.listen({ host: host, port: port }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})
