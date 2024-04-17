import {FC} from 'react';

import {IFooterProps} from './SiteFooter';
import Link from 'next/link';
import Image from 'next/image';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/elements/Icons/Icons';

const SiteFooterComponent: FC<IFooterProps> = ({
  logoSvg,
  logoImg,
  logoText,
  siteTitle,
  navItems,
  legalNavItems,
  legalName,
  linkedin,
  facebook,
  twitter,
  instagram,
  cookieBotId,
  now,
}) => {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        {/*LOGO*/}
        <Link href="/" className="site-footer__branding" aria-label={`link to ${siteTitle} homepage`}>
          <div className="site-footer__branding-wordmark">
            {logoSvg ? (
              logoSvg
            ) : logoImage ? (
              logoImage
            ) : (
              <Image src={logoImage} alt={logoImageAlt!} />
            )}

            {siteTitle ? (
              <span className="is-visually-hidden">{siteTitle}</span>
            ) : (
              <span className="site-footer__branding-text">
                {logoText}
              </span>
            )}
          </div>
        </Link>

        {/*HEADLINE*/}
        <div className="site-footer__headline">
            <h2 className="type-headline-1">Some headline</h2>
        </div>

        {/*NAVIGATION*/}
        <nav className="footer-nav">
          <ul className="footer-nav__list | grid">
            {navItems.map((item: any, index: number) => {
              let attributes;
              if (item.newWindow) {
                attributes = {target: '_blank', rel: 'noopener noreferrer'};
              }
              return item.type == 'link' ? (
                <li key={index} className="footer-subnav__list__item">
                  <a className="footer-nav__link" href={item.link} {...attributes}>
                    {item.text}
                  </a>
                </li>
              ) : (
                <li key={index} className="footer-nav__item">
                  {item.title && (
                    <h3 className="footer-nav__heading | type-eyebrow-3 u-mb--space-fixed-2">
                      {item.title}
                    </h3>
                  )}
                  {item.items &&
                    <ul className="footer-subnav__list">
                      {item.items.map((item: any, index: number) => {
                        let attributes;
                        if (item.newWindow) {
                          attributes = {target: '_blank', rel: 'noopener noreferrer'};
                        }
                        return (
                          <li key={index} className="footer-subnav__list__item">
                            <a className="footer-nav__link" href={item.link} {...attributes}>
                              {item.text}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  }
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="footer-credits">
          <div className="site-credits | type-ui-3">
            <>
              <p>
                © {legalName} {now}
              </p>

              {legalNavItems?.map((item: any, index: number) => {
                <p key={index}>
                  <a href={item.url}>{item.text}</a>
                </p>;
              })}

              {cookieBotId && (
                <p>
                  <a href="javascript: Cookiebot.renew()">Update Cookie Preferences</a>
                </p>
              )}
            </>
          </div>

          <ul className="social-links">
            {facebook && (
              <li>
                <a
                  className="social-links__link"
                  target="_blank"
                  href={`https://www.facebook.com/${facebook}`}
                >
                  <FacebookIcon customClass="social-links__icon" />
                </a>
              </li>
            )}
            {instagram && (
              <li>
                <a
                  className="social-links__link"
                  target="_blank"
                  href={`https://instagram.com/${instagram}`}
                >
                  <InstagramIcon customClass="social-links__icon" />
                </a>
              </li>
            )}
            {twitter && (
              <li>
                <a
                  className="social-links__link"
                  target="_blank"
                  href={`https://twitter.com/${twitter}`}
                >
                  <TwitterIcon customClass="social-links__icon" />
                </a>
              </li>
            )}
            {linkedin && (
              <li>
                <a
                  className="social-links__link"
                  target="_blank"
                  href={`https://linkedin.com/company/${linkedin}`}
                >
                  <LinkedInIcon customClass="social-links__icon" />
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooterComponent;
