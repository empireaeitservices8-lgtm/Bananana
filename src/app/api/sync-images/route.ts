import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const brainDir = "C:\\Users\\SONA\\.gemini\\antigravity-ide\\brain\\5234139c-d9aa-42ae-ad34-a19a480b6871";
    const publicImgDir = path.join(process.cwd(), "public", "images");

    if (!fs.existsSync(publicImgDir)) {
      fs.mkdirSync(publicImgDir, { recursive: true });
    }

    // 1. Material Quality
    const matSrc = path.join(brainDir, "mundu_material_quality_1790750266900.jpg");
    const matDest = path.join(publicImgDir, "concern-material-quality.jpg");
    if (fs.existsSync(matSrc)) {
      fs.copyFileSync(matSrc, matDest);
    }

    // 2. Elastic Waistband
    const elasticSrc = path.join(publicImgDir, "wc_samples", "Daily-Wear-Mund8.jpeg");
    const elasticDest = path.join(publicImgDir, "concern-elastic.jpg");
    if (fs.existsSync(elasticSrc)) {
      fs.copyFileSync(elasticSrc, elasticDest);
    }

    // 3. Rib Structure
    const ribSrc = path.join(publicImgDir, "wc_samples", "Premium-Kasavu-Mundu4.jpeg");
    const ribDest = path.join(publicImgDir, "concern-rib.jpg");
    if (fs.existsSync(ribSrc)) {
      fs.copyFileSync(ribSrc, ribDest);
    }
    const wcSamplesDir = path.join(publicImgDir, "wc_samples");
    if (!fs.existsSync(wcSamplesDir)) {
      fs.mkdirSync(wcSamplesDir, { recursive: true });
    }

    const sampleNames = [
      "Daily-Wear-Mund.jpeg",
      "Daily-Wear-Mund1.jpeg",
      "Daily-Wear-Mund2.jpeg",
      "Daily-Wear-Mund3.jpeg",
      "Daily-Wear-Mund4.jpeg",
      "Daily-Wear-Mund5.jpeg",
      "Daily-Wear-Mund6.jpeg",
      "Daily-Wear-Mund7.jpeg",
      "Daily-Wear-Mund8.jpeg",
      "Daily-Wear-Mund9.jpeg",
      "Daily-Wear-Mund10.jpeg",
      "Daily-Wear-Mund11.jpeg",
      "Premium-Kasavu-Mundu3.jpeg",
      "Premium-Kasavu-Mundu4.jpeg",
    ];

    for (const sName of sampleNames) {
      const sDest = path.join(wcSamplesDir, sName);
      if (!fs.existsSync(sDest)) {
        try {
          const res = await fetch(`https://lightcoral-vulture-629273.hostingersite.com/wp-content/uploads/2026/08/${sName}`);
          if (res.ok) {
            fs.writeFileSync(sDest, Buffer.from(await res.arrayBuffer()));
          }
        } catch (e) {}
      }
    }

    let wcImages: any[] = [];
    try {
      const { getProducts } = await import("@/lib/woocommerce/api");
      const products = await getProducts("?per_page=50");
      wcImages = products.map((p: any) => ({
        id: p.id,
        name: p.name,
        images: p.images?.map((img: any) => img.src) || []
      }));
    } catch (e: any) {
      console.error("WC error:", e);
    }

    return NextResponse.json({
      success: true,
      materialExists: fs.existsSync(matDest),
      elasticExists: fs.existsSync(elasticDest),
      ribExists: fs.existsSync(ribDest),
      wcProducts: wcImages
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

