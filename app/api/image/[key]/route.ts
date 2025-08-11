import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ key: string }> }
) {
  try {
    const { params } = context;
    const resolvedParams = await params;
    const { key } = resolvedParams;

    if (!key) {
      return new NextResponse('Image key is required', { status: 400 });
    }

    // Get Cloudflare context and R2 bucket
    const { env } = getCloudflareContext();
    
    if (!env.BUCKET) {
      return new NextResponse('Storage not configured', { status: 500 });
    }

    // Fetch image from R2
    const object = await env.BUCKET.get(decodeURIComponent(key));
    
    if (!object) {
      return new NextResponse('Image not found', { status: 404 });
    }

    // Get the image data
    const imageData = await object.arrayBuffer();
    
    // Determine content type based on file extension
    const getContentType = (filename: string): string => {
      const ext = filename.toLowerCase().split('.').pop();
      switch (ext) {
        case 'jpg':
        case 'jpeg':
          return 'image/jpeg';
        case 'png':
          return 'image/png';
        case 'gif':
          return 'image/gif';
        case 'webp':
          return 'image/webp';
        case 'svg':
          return 'image/svg+xml';
        default:
          return 'image/jpeg'; // Default fallback
      }
    };

    const contentType = getContentType(key);

    // Return the image with proper headers
    return new NextResponse(imageData, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
        'ETag': object.etag || `"${Date.now()}"`,
      },
    });

  } catch (error) {
    console.error('Error serving image:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}