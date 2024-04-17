import Page from '../layouts/Page';

import {getFourOhFourEntry, getSiteSettings} from '@/lib/api';

export default async function DynamicPost() {
  const page = await getFourOhFourEntry();
  const settings = await getSiteSettings();
  if (!settings || !page) return;

  return <Page page={page} settings={settings} />;
}
