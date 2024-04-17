import {getSiteSettings} from '@/lib/api';
import {consoleAndTrack} from '@/utils/telemetry';

export async function POST(request: Request) {
  const {searchParams} = new URL(request.url);
  const secret = searchParams.get('secret');

  const validSecret = secret === process.env.PREVIEW_SECRET;

  if (!validSecret) {
    return new Response('Invalid token', {status: 401});
  }

  const siteSettings = await getSiteSettings();
  return new Response(JSON.stringify({siteSettings}));
}
