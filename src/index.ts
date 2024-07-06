import { url_get, url_post, url_redirect } from "./controllers"
import { rate_limit } from "./middleware"
import { Router } from "express"

const router = Router()
router.get("/", url_get)
router.post("/", rate_limit, url_post)
router.get("/:code", url_redirect)

router.use((_req, res) => res.status(404).json({ error: "Oh no... look like you entered wrong url" }))
export default () => router
