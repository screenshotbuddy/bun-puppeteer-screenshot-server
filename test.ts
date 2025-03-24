// server.ts

import { createServer, type RequestHandler } from "bun"
import puppeteer from "puppeteer"

async function handleRequest(request: Request): Promise<Response> {
  try {
    const url = request.url
    console.log(`Taking screenshot of ${url}`)
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    // Navigate to the specified URL
    await page.goto(url)

    // Take a screenshot as base64
    const screenshotBase64 = await page.screenshot({ type: "png" })

    // Close the browser and return the screenshot image
    await browser.close()
    return new Response(screenshotBase64, {
      headers: {
        "Content-Type": "image/png",
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch (error) {
    console.error("Error taking screenshot:", error)
    return new Response(JSON.stringify({ error }), { status: 500 })
  }
}

const server = createServer({
  fetch: handleRequest,
})

process.on("unhandledRejection", (reason, p) => {
  console.error(reason, "Unhandled promise rejection", p)
})

server.listen({ port: 3000 }, () => {
  console.log("Server running on http://localhost:3000")
})
