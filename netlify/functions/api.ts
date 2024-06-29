import { json } from "express"
import { config } from "dotenv"
import router from "../../src/index"
import serverless from "serverless-http"
import express from "express"
import cors from "cors"
config()

export const app = express().use(cors()).use(json()).use(router())
export const handler = serverless(app)
