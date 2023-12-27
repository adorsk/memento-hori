import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const html_template = fs.readFileSync(`${__dirname}/../src/template.html`, { encoding: 'utf8' })
const raw_bundle = fs.readFileSync(`${__dirname}/../build/bundle.min.js`, { encoding: 'utf8' })
const formatted_bundle = `<script>${raw_bundle.slice(25, -5)}</script>` // Remove IIFE wrapper.
process.stderr.write(`LENGTH: ${formatted_bundle.length}`)
const html = html_template.replace(/<script.*<\/script>/, formatted_bundle)
console.log(html)
