import SiteFooterComponent from '@/components/modules/SiteFooter/SiteFooterComponent';
import {metadata} from '@/lib/metadata';
import {ISettings} from '@/types/contentful';
import {getFooterNavigation} from '@/utils/getNavigations';
import {markdownToReactElement} from '@/utils/markdownParser';
import {Year} from '@/utils/time';

export type IFooterProps = {
  logoSvg?: any;
  logoImage?: any;
  logoImageAlt?: string;
  siteTitle?: string;
  navItems: any[];
  legalNavItems?: any[];
  legalName?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  cookieBotId?: string;
  now?: string;
};

const SiteFooter = ({settings}: {settings: ISettings}) => {
  const logoSvg = markdownToReactElement(settings?.fields?.logoSvg!);
  const logoImage = settings?.fields?.logoImage?.fields.file.url;
  const logoImageAlt = settings?.fields.title;
  const siteTitle = settings?.fields.title;
  const navItems = getFooterNavigation(settings);
  const legalNavItems = settings?.fields?.legalNavigation;
  const legalName = settings?.fields?.legalName || metadata.legal_name;
  const linkedIn = settings?.fields?.linkedIn;
  const facebook = settings?.fields?.facebook || metadata.social.facebook;
  const twitter = settings?.fields?.twitter || metadata.social.twitter;
  const instagram = settings?.fields?.instagram;
  const cookieBotId = settings?.fields?.cookieBotId;

  return (
    navItems && (
      <SiteFooterComponent
        logoSvg={logoSvg}
        logoImage={logoImage}
        logoImageAlt={logoImageAlt}
        siteTitle={siteTitle}
        navItems={navItems}
        legalNavItems={legalNavItems!}
        legalName={legalName!}
        linkedIn={linkedIn!}
        facebook={facebook!}
        twitter={twitter!}
        instagram={instagram!}
        cookieBotId={cookieBotId!}
        now={Year('now')}
      />
    )
  );
};

export default SiteFooter;
