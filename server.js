import puppeteer from "puppeteer"
const server = Bun.serve({
  port: 3000,
  routes: {
    // creating a bun server endpoint
    "/screenshot": {
      GET: async (req) => {
        // parsing request URL
        const { searchParams } = new URL(req.url)

        if (searchParams.get("url")) {
          // geting url query param from request URL
          const url = searchParams.get("url")

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
            // you wil need to change Content-Type if you change screenshot type here accordingly
            const buffer = await page.screenshot({ type: "png" })

            // Seting the content type for the response
            // set correct header based on screenshot type you set above
            const headers = new Headers()
            headers.append("Content-Type", "image/png")
            headers.append("Access-Control-Allow-Origin", "*")

            // Send the screenshot as a response
            return new Response(buffer, { headers })
          } catch (error) {
            console.error("Error taking screenshot:", error)
            return new Response("Internal Server Error", { status: 500 })
          } finally {
            // Close the browser instance
            await browser.close()
          }
        } else {
          return new Response("Invalid request", { status: 500 })
        }
      },
    },
  },
})

console.log(`Listening on ${server.url}`)
