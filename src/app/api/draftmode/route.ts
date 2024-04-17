import {draftMode} from 'next/headers';

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const secret = searchParams.get('secret');

  const validSecret = secret === process.env.PREVIEW_SECRET;

  if (!validSecret) {
    return new Response('Invalid token', {status: 401});
  }

  const {isEnabled: isPreviewMode} = draftMode();

  return new Response(JSON.stringify({isPreviewMode}));
}
