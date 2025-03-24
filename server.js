import puppeteer from "puppeteer"
const server = Bun.serve({
  async fetch(req) {
    const { pathname: path, searchParams } = new URL(req.url)

    if (
      req.method === "GET" &&
      path === "/screenshot" &&
      searchParams.get("url")
    ) {
      const url = searchParams.get("url")

      console.log("url :>> ", url)
      let browser
      try {
        // Launch a Chromium browser instance
        browser = await puppeteer.launch({
          headless: true, // running with headless mode
          args: ["--no-sandbox", "--disable-setuid-sandbox"], // minimal arguments required to start headless browser
        })

        // Create a new page in the browser
        const page = await browser.newPage()

        // Navigate to the specified URL
        await page.goto(url)

        // Take a screenshot of the current page you can set type 'png' | 'jpeg' | 'webp'
        const buffer = await page.screenshot({ type: "png" })

        // Set the content type for the response set correct header based on type you set above
        const headers = new Headers()
        headers.append("Content-Type", "image/png")

        // Send the screenshot as a response
        return new Response(buffer, { headers })
      } catch (error) {
        console.error("Error taking screenshot:", error)
        return new Response("Internal Server Error", { status: 500 })
      } finally {
        // Close the browser instance
        await browser.close()
      }
    }

    // 404
    return new Response("Page not found", { status: 404 })
  },
})

console.log(`Listening on ${server.url}`)
