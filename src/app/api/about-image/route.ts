import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SOURCE_PATH = "C:\\Users\\SONA\\.gemini\\antigravity-ide\\brain\\40dfff8c-285b-4674-8a8c-1ae66385e5cc\\.user_uploaded\\media_1791270257661.png";
const DEST_FILE = path.join(process.cwd(), "public", "images", "about-us-hero.jpg");

export async function GET() {
  try {
    if (fs.existsSync(SOURCE_PATH)) {
      const sharp = require("sharp");
      const meta = await sharp(SOURCE_PATH).metadata();
      const width = meta.width || 400;
      const height = meta.height || 800;

      // Extract the main product photo (cleanly excluding browser chrome, header, and thumbnail strip)
      const left = Math.round(width * 0.04);
      const top = Math.round(height * 0.228);
      const cropWidth = Math.round(width * 0.92);
      const cropHeight = Math.round(height * 0.562);

      // Process left-side-mundu with 4x Lanczos3 super-resolution and unsharp masking
      const LEFT_SOURCE = "C:\\Users\\SONA\\.gemini\\antigravity-ide\\brain\\40dfff8c-285b-4674-8a8c-1ae66385e5cc\\.user_uploaded\\media_1791269827558.png";
      if (fs.existsSync(LEFT_SOURCE)) {
        try {
          const leftMeta = await sharp(LEFT_SOURCE).metadata();
          const lWidth = leftMeta.width || 400;
          const lHeight = leftMeta.height || 600;

          const lLeft = Math.round(lWidth * 0.070);
          const lTop = Math.round(lHeight * 0.494);
          const lCropWidth = Math.round(lWidth * 0.860);
          const lCropHeight = Math.round(lHeight * 0.328);

          const leftDestJpg = path.join(process.cwd(), "public", "images", "left-side-mundu.jpg");
          const leftDestPng = path.join(process.cwd(), "public", "images", "left-side-mundu.png");

          // 4x Lanczos3 super-resolution upscaling + edge sharpening
          const processedLeft = sharp(LEFT_SOURCE)
            .extract({ left: lLeft, top: lTop, width: lCropWidth, height: lCropHeight })
            .resize({
              width: lCropWidth * 4,
              height: lCropHeight * 4,
              kernel: "lanczos3",
              fit: "fill"
            })
            .sharpen({
              sigma: 1.6,
              m1: 1.3,
              m2: 2.4
            });

          await processedLeft.png({ compressionLevel: 1 }).toFile(leftDestPng);
          await sharp(leftDestPng).jpeg({ quality: 100, chromaSubsampling: "4:4:4" }).toFile(leftDestJpg);
          console.log("Successfully generated crystal-clear left-side-mundu image!");
        } catch (lErr) {
          console.error("Error processing left-side-mundu:", lErr);
        }
      }

      // If no WC high-res, upscale 3x with sharp lanczos3 + unsharp mask for crystal clarity
      const croppedBuffer = await sharp(SOURCE_PATH)
        .extract({ left, top, width: cropWidth, height: cropHeight })
        .resize({ width: cropWidth * 3, height: cropHeight * 3, kernel: "lanczos3" })
        .sharpen({ sigma: 1.5, m1: 1.2, m2: 2.0 })
        .png({ compressionLevel: 1 })
        .toBuffer();

      const destPng = path.join(process.cwd(), "public", "images", "about-us-hero.png");
      try {
        fs.writeFileSync(DEST_FILE, croppedBuffer);
        fs.writeFileSync(destPng, croppedBuffer);
      } catch (err) {}

      return new NextResponse(croppedBuffer, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "no-store",
        },
      });
    }

    if (fs.existsSync(DEST_FILE)) {
      const buffer = fs.readFileSync(DEST_FILE);
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    return new NextResponse("Image not found", { status: 404 });
  } catch (error) {
    console.error("Error in about-image route:", error);
    return new NextResponse("Error reading image", { status: 500 });
  }
}
