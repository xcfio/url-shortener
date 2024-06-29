import { json } from "express"
import { config } from "dotenv"
import router from "../../src/index"
import serverless from "serverless-http"
import express from "express"
config()

export const app = express().use(json(), router())
export const handler = serverless(app)
