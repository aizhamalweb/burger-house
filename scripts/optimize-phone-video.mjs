import { spawnSync } from 'node:child_process'
import { renameSync, rmSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import ffmpeg from 'ffmpeg-static'

const input = fileURLToPath(new URL('../src/assets/videos/bg-video_phone.mp4', import.meta.url))
const output = fileURLToPath(new URL('../src/assets/videos/bg-video_phone-scroll.mp4', import.meta.url))
const temporary = output.replace('.mp4', '.tmp.mp4')

try {
  const result = spawnSync(ffmpeg, [
    '-hide_banner', '-loglevel', 'warning', '-y', '-i', input,
    '-map', '0:v:0', '-an',
    // Preserve the framing; phones do not need to decode the original 4K frames.
    '-vf', "scale=-2:'min(1080,ih)'",
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18',
    // Frequent keyframes and no B-frames make forward/backward seeking cheaper.
    '-g', '6', '-keyint_min', '6', '-sc_threshold', '0', '-bf', '0',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', temporary,
  ], { stdio: 'inherit', windowsHide: true })
  if (result.error) throw result.error
  if (result.status !== 0) throw new Error(`Video conversion failed (${result.status})`)
  renameSync(temporary, output)
  console.log(`Phone video: ${(statSync(input).size / 1e6).toFixed(2)} MB → ${(statSync(output).size / 1e6).toFixed(2)} MB`)
} finally {
  rmSync(temporary, { force: true })
}
