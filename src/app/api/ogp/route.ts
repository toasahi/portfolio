import { fetchOGPData } from '@/lib/ogp';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const ogpData = await fetchOGPData(url);

    if (!ogpData) {
      return NextResponse.json(
        { error: 'Failed to fetch OGP data' },
        { status: 404 },
      );
    }

    return NextResponse.json(ogpData);
  } catch (error) {
    console.error('OGP API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
