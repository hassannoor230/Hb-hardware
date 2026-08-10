const fs = require('fs')
const path = require('path')

const outDir = path.join(__dirname, 'public', 'images')
fs.mkdirSync(outDir, { recursive: true })

function createMinimalPng(filePath, r, g, b) {
  const rgba = [r, g, b, 255]
  const width = 800
  const height = 600

  function crc32(buf) {
    let crc = -1
    for (let i = 0; i < buf.length; i++) {
      crc ^= buf[i]
      for (let j = 0; j < 8; j++) crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1
    }
    return (crc ^ -1) >>> 0
  }

  function chunk(type, data) {
    const buf = Buffer.alloc(data.length + 8)
    buf.writeUInt32BE(data.length, 0)
    buf.write(type, 4, 4, 'ascii')
    data.copy(buf, 8)
    const crc = Buffer.alloc(4)
    crc.writeUInt32BE(crc32(Buffer.concat([Buffer.from(type, 'ascii'), data])), 0)
    return Buffer.concat([buf, crc])
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8
  ihdr[9] = 2
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  const raw = Buffer.alloc(height * (1 + width * 3))
  for (let y = 0; y < height; y++) {
    raw[y * (1 + width * 3)] = 0
    for (let x = 0; x < width; x++) {
      const i = y * (1 + width * 3) + 1 + x * 3
      raw[i] = rgba[0]
      raw[i + 1] = rgba[1]
      raw[i + 2] = rgba[2]
    }
  }

  const zlib = require('zlib')
  const compressed = zlib.deflateSync(raw)
  const buf = Buffer.concat([signature, chunk('IHDR', ihdr), chunk('IDAT', compressed), chunk('IEND', Buffer.alloc(0))])
  fs.writeFileSync(filePath, buf)
}

const images = [
  { name: 'door-hardware.jpg', color: [203, 213, 225] },
  { name: 'cabinet-hardware.jpg', color: [186, 199, 219] },
  { name: 'bathroom-hardware.jpg', color: [165, 185, 210] },
  { name: 'kitchen-hardware.jpg', color: [148, 172, 200] },
  { name: 'construction-hardware.jpg', color: [132, 159, 191] },
  { name: 'hardware-shelves.jpg', color: [115, 146, 181] },
  { name: 'store-placeholder.jpg', color: [99, 133, 172] },
  { name: 'hero-placeholder.jpg', color: [82, 120, 162] }
]

for (const img of images) {
  createMinimalPng(path.join(outDir, img.name), ...img.color)
  console.log('Created', img.name)
}

console.log('Done')
