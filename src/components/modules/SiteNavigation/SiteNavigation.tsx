import {documentToReactComponents} from '@contentful/rich-text-react-renderer';

import SiteNavigationComponent from '@/components/modules/SiteNavigation/SiteNavigationComponent';
import {ILink} from '@/types/contentful';
import {ISettings} from '@/types/contentful';
import buildUrl from '@/utils/buildUrl';
import formatCta from '@/utils/formatCta';
import {formatImage} from '@/utils/formatMedia';
import getMainNavigation, {IMainNavItem} from '@/utils/getMainNavigation';
import {markdownToReactElement} from '@/utils/markdownParser';
import {IMediaProps} from '@/utils/responsiveImg';
import {richTextParse} from '@/utils/richTextParser';

export type ICTAProps = {
  label?: string;
  url?: string;
  newWindow?: boolean;
};

export type INavProps = {
  siteTitle?: string;
  logoText?: string;
  logoSvg?: any;
  logoImage?: any;
  logoImageAlt?: string;
  navItems: IMainNavItem[];
  features?: any[];
  primaryCta?: ICTAProps;
  secondaryCta?: ICTAProps;
};

export type IFeature = {
  eyebrow?: string;
  title?: string;
  body?: any;
  figure?: IMediaProps;
  cta?: ILink[];
};

const SiteNavigation = ({settings}: {settings: ISettings}) => {
  const mainNavigation = getMainNavigation(settings);

  const siteTitle = settings?.fields.title;
  const logoImageAlt = settings?.fields.title;
  const logoText = settings?.fields.title;
  const logoSvg = markdownToReactElement(settings?.fields?.logoSvg!);
  const logoImage = settings?.fields?.logoImage?.fields.file.url;
  const primaryCta = {
    label: settings?.fields?.navCta1?.fields?.text,
    url: buildUrl(settings?.fields.navCta1),
    newWindow: settings?.fields?.navCta1?.fields.newWindow,
  };
  const secondaryCta = {
    label: settings?.fields?.navCta2?.fields?.text,
    url: buildUrl(settings?.fields.navCta2),
    newWindow: settings?.fields?.navCta2?.fields.newWindow,
  };

  const features: IFeature[] = [];
  let singleFeature: IFeature = {};
  // Loop through the main navigation and find the first card feature
  // and add it to the features array to be passed to the navigation component
  mainNavigation?.forEach((item: any) => {
    if (item.navFeature) {
      const features = item.navFeature;
      features.forEach((feature: any) => {
        if (feature.type === 'card') {
          const featureModule = feature.content;
          singleFeature = {
            eyebrow: featureModule.fields.eyebrow,
            title: featureModule.fields.title,
            body: documentToReactComponents(featureModule.fields.body, richTextParse),
            figure: formatImage(featureModule.fields.image),
            cta: formatCta(featureModule.fields.cta),
          };
        }
      });
    }
  });
  features.push(singleFeature);

  return (
    <SiteNavigationComponent
      siteTitle={siteTitle}
      logoText={logoText!}
      logoSvg={logoSvg}
      logoImage={logoImage!}
      logoImageAlt={logoImageAlt}
      navItems={mainNavigation!}
      features={features}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
    />
  );
};

export default SiteNavigation;
