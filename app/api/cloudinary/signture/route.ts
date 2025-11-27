import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder: "rwanda-chef" },
      process.env.CLOUDINARY_API_SECRET as string
    );

    return NextResponse.json({
      signature,
      timestamp,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_NAME,
      folder: "inzozi-employees",
    });
  } catch (error) {
    console.error("Error generating cloudinary signature", error);
    return NextResponse.json(
      { error: "Failed to generate the signature" },
      { status: 500 }
    );
  }
}
