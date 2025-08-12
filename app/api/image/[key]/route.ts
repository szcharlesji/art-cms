import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ key: string }> },
) {
  try {
    const { key } = await context.params;

    if (!key) {
      return new NextResponse("Image key is required", { status: 400 });
    }

    // Get Cloudflare context and R2 bucket
    const { env } = await getCloudflareContext({ async: true });

    if (!env.BUCKET) {
      return new NextResponse("Storage not configured", { status: 500 });
    }

    // Fetch image from R2
    const object = await env.BUCKET.get(decodeURIComponent(key));

    if (!object) {
      return new NextResponse("Image not found", { status: 404 });
    }

    // Stream the image body to avoid CPU and memory overhead
    const getContentType = (filename: string): string => {
      const ext = filename.toLowerCase().split(".").pop();
      switch (ext) {
        case "jpg":
        case "jpeg":
          return "image/jpeg";
        case "png":
          return "image/png";
        case "gif":
          return "image/gif";
        case "webp":
          return "image/webp";
        case "svg":
          return "image/svg+xml";
        default:
          return "application/octet-stream";
      }
    };

    const headers = {
      "Content-Type": getContentType(key),
      "Cache-Control": "public, max-age=31536000, immutable",
      ...(object.etag ? { ETag: object.etag } : {}),
    } as Record<string, string>;

    return new NextResponse(object.body as any, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
