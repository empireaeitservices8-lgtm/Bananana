import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const item = searchParams.get("item");

  const brainDir = "C:\\Users\\SONA\\.gemini\\antigravity-ide\\brain\\5234139c-d9aa-42ae-ad34-a19a480b6871";
  const publicImgDir = path.join(process.cwd(), "public", "images");

  if (!fs.existsSync(publicImgDir)) {
    fs.mkdirSync(publicImgDir, { recursive: true });
  }

  try {
    // 1. MATERIAL QUALITY: Premium close-up knit fabric texture
    if (item === "material") {
      const srcPath = path.join(brainDir, "mundu_material_quality_1790750266900.jpg");
      const destPath = path.join(publicImgDir, "concern-material-quality.jpg");
      if (fs.existsSync(srcPath)) {
        if (!fs.existsSync(destPath)) fs.copyFileSync(srcPath, destPath);
        const data = fs.readFileSync(srcPath);
        return new NextResponse(data, {
          headers: {
            "Content-Type": "image/jpeg",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      }
      if (fs.existsSync(destPath)) {
        const data = fs.readFileSync(destPath);
        return new NextResponse(data, {
          headers: {
            "Content-Type": "image/jpeg",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      }
    }

    // 2. ELASTIC: Clear close-up of woven elastic waistband construction
    if (item === "elastic") {
      const destPath = path.join(publicImgDir, "concern-elastic-waistband.jpg");
      if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
        const data = fs.readFileSync(destPath);
        return new NextResponse(data, {
          headers: {
            "Content-Type": "image/jpeg",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      }

      // Fetch high-definition close-up of woven elastic waistband
      const elasticUrl = "https://images.unsplash.com/photo-1556441708-814416d76cc2?auto=format&fit=crop&w=1200&q=85";
      try {
        const res = await fetch(elasticUrl, { next: { revalidate: 86400 } });
        if (res.ok) {
          const buffer = Buffer.from(await res.arrayBuffer());
          fs.writeFileSync(destPath, buffer);
          return new NextResponse(buffer, {
            headers: {
              "Content-Type": "image/jpeg",
              "Cache-Control": "public, max-age=31536000, immutable",
            },
          });
        }
      } catch (err) {
        console.error("Failed to fetch elastic image:", err);
      }
    }

    // 3. RIB: Clear close-up of ribbed texture / woven rib knit construction
    if (item === "rib") {
      const destPath = path.join(publicImgDir, "concern-rib-texture.jpg");
      if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
        const data = fs.readFileSync(destPath);
        return new NextResponse(data, {
          headers: {
            "Content-Type": "image/jpeg",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      }

      // Fetch high-definition close-up of ribbed weave textile
      const ribUrl = "https://images.unsplash.com/photo-1550631392-26e6823af219?auto=format&fit=crop&w=1200&q=85";
      try {
        const res = await fetch(ribUrl, { next: { revalidate: 86400 } });
        if (res.ok) {
          const buffer = Buffer.from(await res.arrayBuffer());
          fs.writeFileSync(destPath, buffer);
          return new NextResponse(buffer, {
            headers: {
              "Content-Type": "image/jpeg",
              "Cache-Control": "public, max-age=31536000, immutable",
            },
          });
        }
      } catch (err) {
        console.error("Failed to fetch rib image:", err);
      }
    }
  } catch (err: any) {
    console.error("concern-image error:", err);
  }

  // Fallback to 404
  return new NextResponse("Image not found", { status: 404 });
}
