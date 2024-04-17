import buildUrl from './buildUrl';

import {ICTAProps} from '@/components/modules/SiteNavigation/SiteNavigation';
import {ISettings} from '@/types/contentful';

type ISubNavItem = {
  text?: string;
  link?: string;
  newWindow?: boolean;
};

type INavSubnavItem = {
  title?: string;
  links?: ISubNavItem[];
};

export type IMainNavItem = {
  type: string;
  text?: string;
  link?: string;
  newWindow?: boolean;
  title?: string;
  items?: INavSubnavItem[] | ISubNavItem[];
  navFeature?: ICTAProps[];
  navBg?: any;
};

/**
 * Grab main navigation data from Contentful
 * @param  {Object} siteSettings - passed in copy of the settings data from Contentful
 * @return {Object} cleaned up api response
 */
const getMainNavigation = (siteSettings: ISettings | null) => {
  const mainNav = siteSettings?.fields?.mainNavigation;

  if (!mainNav) {
    console.log('Could not fetch main navigation');
    return;
  }

  const mainNavItems: IMainNavItem[] = [];

  mainNav.forEach((item: any) => {
    const contentType = item.sys.contentType.sys.id;

    if (contentType == 'link') {
      const url = buildUrl(item);

      // only push to main nav if the link isn't empty
      if (item.fields.text && url) {
        mainNavItems.push({
          type: 'link',
          text: item.fields.text,
          link: buildUrl(item),
          newWindow: item.fields.newWindow,
        });
      }
    }

    if (contentType == 'simpleList') {
      if (item.fields.items) {
        const subnavItems: ISubNavItem[] = [];

        item.fields.items.forEach((subnav: any) => {
          subnavItems.push({
            text: subnav.fields.text,
            link: buildUrl(subnav),
            newWindow: subnav.fields.newWindow,
          });
        });

        // only push to main nav if the subnav isn't empty
        if (subnavItems.length) {
          mainNavItems.push({
            type: 'list',
            title: item.fields.title,
            items: subnavItems,
          });
        }
      }
    }

    if (contentType == 'navItem') {
      const navSubnavItems: INavSubnavItem[] = [];
      const navFeatureModules: any[] = [];

      // Does the navItem have subnav lists?
      if (item.fields.subnavLists) {
        item.fields.subnavLists.forEach((subnav: any) => {
          const subnavLinks: ISubNavItem[] = [];

          subnav.fields.items.forEach((subnavListItem: any) => {
            subnavLinks.push({
              text: subnavListItem.fields.text,
              link: buildUrl(subnavListItem),
              newWindow: subnavListItem.fields.newWindow,
            });
          });

          navSubnavItems.push({
            title: subnav.fields.title,
            links: subnavLinks,
          });
        });
      }

      // Does the navItem have a feature?
      if (item.fields.navFeature) {
        item.fields.navFeature.forEach((feature: any) => {
          navFeatureModules.push({
            type: feature.sys.contentType.sys.id,
            content: feature,
          });
        });
      }

      // Only push to main nav if the navItem isn't empty
      // leave out the feature if one isn't set
      if (navSubnavItems.length) {
        let navItem;

        if (navFeatureModules.length) {
          navItem = {
            type: 'navItem',
            title: item.fields.title,
            items: navSubnavItems,
            navFeature: navFeatureModules,
            navBg: item.fields.navFeatureBg,
          };
        } else {
          navItem = {
            type: 'navItem',
            title: item.fields.title,
            items: navSubnavItems,
          };
        }

        mainNavItems.push(navItem);
      }
    }
  });

  return mainNavItems;
};

export default getMainNavigation;
