import React from 'react';

import SiteFooter from '@/components/modules/SiteFooter/SiteFooter';
import SiteNavigation from '@/components/modules/SiteNavigation/SiteNavigation';
import {ISettings} from '@/types/contentful';

const Layout = ({
  children,
  settings,
  bodyClass,
}: {
  children: React.ReactNode;
  settings: ISettings;
  bodyClass?: string;
}) => {
  return (
    <body className={bodyClass}>
      <SiteNavigation settings={settings} />
      <main id="main" className="type-body" data-pagefind-body>
        {children}
      </main>
      <SiteFooter settings={settings} />
    </body>
  );
};

export default Layout;
