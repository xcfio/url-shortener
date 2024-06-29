import { Router } from "express"
import postgres from "postgres"

const router = Router()
const sql = postgres(process.env.URI)

router.use((_req, res) => res.status(404).json({ error: "Oh no... look like you entered wrong url" }))
export default () => router
