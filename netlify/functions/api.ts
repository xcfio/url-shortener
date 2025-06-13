import serverless from "serverless-http"
import fastify from "../../src/index"

export const handler = serverless(fastify as any)
// fastify.listen({ port: 7200 }, () => console.log("server running at http://localhost:7200"))
