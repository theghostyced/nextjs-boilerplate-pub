'use client';

import {FC, useCallback, useEffect, useRef, useState} from 'react';

import {INavProps} from './SiteNavigation';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

import Navigation from '@/components/elements/Navigation/Navigation';
import useMediaQuery from '@/hooks/useMediaQuery';

const SiteNavigationComponent: FC<INavProps> = ({
  siteTitle,
  logoText,
  logoSvg,
  logoImage,
  logoImageAlt,
  navItems,
  features,
  primaryCta,
  secondaryCta,
}) => {
  const pathname = usePathname();
  const BrandingEl = pathname == '/' ? 'h1' : 'div';

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const inputCheckboxRef = useRef<HTMLElement>();
  const isSmall = useMediaQuery(1000);
  const isDesktop = useMediaQuery(1001);

  const handleChange = (event: React.MouseEvent<HTMLElement>) => {
    const isOpen = (event.target as HTMLElement).checked;
    setIsMenuOpen(isOpen);
  };

  const handleKeyDown = (event: React.MouseEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      if (isMenuOpen) closeMenu();
      return;
    }
  };

  const closeMenu = useCallback(() => {
    inputCheckboxRef.current.checked = false;
    setIsMenuOpen(false);
    document.documentElement.classList.remove('nav-menu-open', isMenuOpen);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (isDesktop) {
        closeMenu();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };

    document.documentElement.classList.toggle('nav-menu-open', isMenuOpen);
  }, [isMenuOpen, closeMenu, isDesktop]);

  return (
    <>
      <Link href="#main" className="skipnav" role="button">
        skip to content
      </Link>

      {/*Checkbox hack so menu works without JS. Checkbox outsite .nav for easier CSS*/}
      <input
        type="checkbox"
        id="nav-menu-checkbox"
        ref={inputCheckboxRef}
        onChange={handleChange}
        className="nav-menu-checkbox is-visually-hidden"
      />

      <header className="nav" role="banner">
        <div className="container nav__container">
          <Link href="/" className="nav__branding" aria-label={`link to ${siteTitle} homepage`}>
            <BrandingEl className="nav__branding__wordmark">
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
                <span className="nav__branding__text" data-element="logo-text">
                  {logoText}
                </span>
              )}
            </BrandingEl>
          </Link>

          <div className="nav__menu-mobile-buttons">
            <label
              htmlFor="nav-menu-checkbox"
              className="nav__menu-btn nav__menu-btn btn"
              aria-expanded="true"
              aria-controls="nav__menu"
              tabIndex={0}
            >
              <span className="is-visually-hidden">Toggle Main Navigation</span>
            </label>
          </div>

          <Navigation
            navItems={navItems}
            features={features}
            primaryCta={primaryCta}
            secondaryCta={secondaryCta}
            onKeyDown={handleKeyDown}
          />
        </div>
      </header>
    </>
  );
};

export default SiteNavigationComponent;
