import Page from '@/layouts/Page';
import {getHomepageEntry, getSiteSettings} from '@/lib/api';

const Homepage = async () => {
  const homepage = await getHomepageEntry();
  const settings = await getSiteSettings();
  if (!homepage || !settings) return;

  return (
    <>
      <Page page={homepage} settings={settings} />
    </>
  );
};

export default Homepage;
