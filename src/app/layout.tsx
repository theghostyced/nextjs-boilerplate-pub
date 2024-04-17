import {getSiteSettings} from '@/lib/api';
import {buildMetadata} from '@/lib/metadata';
import '@/scss/screen.scss';

export default async function RootLayout({children}: {children: React.ReactNode}) {
  return <html lang="en">{children}</html>;
}

export async function generateMetadata() {
  const settings = await getSiteSettings();
  return await buildMetadata({siteSettings: settings!});
}
