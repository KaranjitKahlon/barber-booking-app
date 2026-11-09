
import sharp from "sharp"
import { readFileSync } from "node:fs"

const src = "public/jslAppIcon.png"
const navy = { r: 17, g: 24, b: 33, alpha: 1 }   // #111821

const meta = await sharp(src).metadata()
if (meta.width !== meta.height) {
  console.warn(`Warning: source is ${meta.width}x${meta.height}, not square. Icons will be cropped.`)
}

const { data } = await sharp(src).ensureAlpha().extract({ left: 0, top: 0, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true })
const bg = data[3] === 255
  ? { r: data[0], g: data[1], b: data[2], alpha: 1 }
  : { r: 17, g: 24, b: 33, alpha: 1 }   // #111821

async function makeIcon(file, size, logoSize) {
  const logo = await sharp(src)
    .resize(logoSize, logoSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer()

  await sharp({ create: { width: size, height: size, channels: 4, background: navy } })
    .composite([{ input: logo, gravity: "center" }])
    .png()
    .toFile(`public/${file}`)
}

await makeIcon("icon-192.png", 192, 192)
await makeIcon("icon-512.png", 512, 512)
await makeIcon("icon-maskable-512.png", 512, 300)
await makeIcon("apple-touch-icon.png", 180, 180)
