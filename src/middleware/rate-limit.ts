import { NextFunction, Request, Response } from "express"

const requestCounts = new Map<string, number>()
const WINDOW_SIZE_IN_MINUTES = 8
const MAX_REQUEST_COUNT = 20

export function rate_limit(req: Request, res: Response, next: NextFunction) {
    const clientIP = getClientIP(req)
    if (!requestCounts.has(clientIP)) requestCounts.set(clientIP, 0)

    const currentCount = requestCounts.get(clientIP)!
    requestCounts.set(clientIP, currentCount + 1)

    if (currentCount >= MAX_REQUEST_COUNT) {
        return res.status(429).json({ error: "Too many requests, please try again later." })
    }
    setTimeout(() => {
        const updatedCount = requestCounts.get(clientIP)! - 1
        requestCounts.set(clientIP, 0)
    }, WINDOW_SIZE_IN_MINUTES * 60 * 1000)

    next()
}

function getClientIP(req: Request): string {
    const forwarded = req.headers["x-forwarded-for"] as string | undefined
    return forwarded ? forwarded.split(/, /)[0] : req.socket.remoteAddress || req.ip || "unknown-ip"
}
