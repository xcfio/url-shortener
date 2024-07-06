import { Request, Response } from "express"
import file from "../public"

export function url_get(_req: Request, res: Response) {
    res.send(file)
}
