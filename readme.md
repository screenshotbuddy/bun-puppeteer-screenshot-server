# Bun Puppeteer Screenshot Server

Create bun server to take webpage screenshot using puppeteer

## Install Chrome on Ubuntu/Debian

```
apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    apt-transport-https \
    xvfb

wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable

```

## Install Bun

```
curl -fsSL https://bun.sh/install | bash
```

## Get Started

Clone repo and install dependencies

```
git clone https://github.com/screenshotbuddy/bun-puppeteer-screenshot-server.git
cd bun-puppeteer-screenshot-server
bun install
bun run dev
```

## Test Server

```
http://localhost:3000/screenshot?url=https://www.wikipedia.org/
```

## Homepage


![screenshotbuddy.com home page](https://api.screenshotbuddy.com/render/waatbjcdv529xl86oq0373v3aenduecc?url=https%3A%2F%2Fwww.screenshotbuddy.com%2F&format=png&viewport=1366x1366&hide_banners=true&signature=1ce0cdf344dd8513f4e557d1a561271c4d53548c6260a708542968bd20ea19d8)
