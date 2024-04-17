import buildUrl from './buildUrl';
import {ISettings} from '@/types/contentful';

/**
 * Grab main navigation data from Contentful
 * @param  {Object} siteSettings - passed in copy of the settings data from Contentful
 * @return {Object} cleaned up api response
 */
export const getMainNavigation = (siteSettings: ISettings) => {
  const mainNav = siteSettings?.fields?.mainNavigation;

  if (!mainNav) {
    return;
  }

  const mainNavItems: any[] = [];

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
        const subnavItems: any[] = [];

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
      const navSubnavItems: any[] = [];
      const navFeatureModules: any[] = [];

      // Does the navItem have subnav lists?
      if (item.fields.subnavLists) {
        item.fields.subnavLists.forEach((subnav: any) => {
          const subnavLinks: any[] = [];

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

/**
 * Grab footer navigation data from Contentful
 * @param  {Object} siteSettings - passed in copy of the settings data from Contentful
 * @return {Object} cleaned up api response
 */
export const getFooterNavigation = (siteSettings: ISettings) => {
  const footerNav = siteSettings?.fields?.footerNavigation;

  if (!footerNav) {
    return;
  }

  const footerNavItems: any[] = [];

  footerNav.forEach((item: any) => {
    const contentType = item.sys.contentType.sys.id;

    if (contentType == 'link') {
      const url = buildUrl(item);

      // only push to nav if the link isn't empty
      if (item.fields.text && url) {
        footerNavItems.push({
          type: 'link',
          text: item.fields.text,
          link: buildUrl(item),
          newWindow: item.fields.newWindow,
        });
      }
    }

    if (contentType == 'simpleList') {
      if (item.fields.items) {
        const subnavItems: any[] = [];

        item.fields.items.forEach((subnav: any) => {
          subnavItems.push({
            text: subnav.fields.text,
            link: buildUrl(subnav),
            newWindow: subnav.fields.newWindow,
          });
        });

        // only push to nav if the subnav isn't empty
        if (subnavItems.length) {
          footerNavItems.push({
            type: 'list',
            title: item.fields.title,
            items: subnavItems,
          });
        }
      }
    }
  });

  return footerNavItems;
};
