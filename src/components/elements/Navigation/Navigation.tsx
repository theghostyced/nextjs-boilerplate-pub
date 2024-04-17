/* eslint-disable react/no-children-prop */
import {ElementRef, MouseEvent, createRef, useEffect, useMemo, useRef, useState} from 'react';

import {NavItem, NavLink, NavList} from './NavTypes';

import {ICTAProps, IFeature} from '@/components/modules/SiteNavigation/SiteNavigation';
import useMediaQuery from '@/hooks/useMediaQuery';
import {getFocusableElements} from '@/utils/getFocusableElements';
import {IMainNavItem} from '@/utils/getMainNavigation';

interface IProps {
  navItems?: IMainNavItem[];
  features?: IFeature[];
  primaryCta?: ICTAProps;
  secondaryCta?: ICTAProps;
  onKeyDown?: (event: any) => void;
}

interface INav {
  mobileNav?: string;
  openNav?: any;
  event?: any;
  init?: boolean;
}

const Navigation = ({navItems, features, primaryCta, secondaryCta, onKeyDown}: IProps) => {
  const isMobile = useMediaQuery(1000);
  const OPEN_SUBNAV_KEYS = ['Enter', 'ArrowDown'];

  let $openSubnavItem: any;
  let $openSubnavButton: any;

  const handleMouseEvent = (event: MouseEvent<HTMLElement>) => {
    const type = event.type;

    if (type == 'mouseover') {
      if (isMobile) return;
      const $item = (event.target as HTMLElement).closest('.nav__item');
      if ($item && $item !== $openSubnavItem) closeSubnav();
    }

    if (type == 'click') {
      const $itemButton = (event.target as HTMLElement).closest('.nav__item__button');
      if (!$itemButton) return;

      const $item = $itemButton.closest('.nav__item');
      toggleSubnav($item);
    }
  };

  const handleKeyDown = (event: MouseEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      closeSubnav();
      onKeyDown(event);
    }

    const isOpeningSubnav =
      OPEN_SUBNAV_KEYS.includes(event.key) &&
      (event.target as HTMLElement).matches('.nav__item__button--subnav');

    if (isOpeningSubnav) {
      event.preventDefault();
      const $item = (event.target as HTMLElement).closest('.nav__item');
      if ($item === $openSubnavItem && event.key !== 'ArrowDown') {
        closeSubnav();
      } else {
        openSubnav($item);
      }
    }
  };

  const openSubnav = ($item) => {
    if (!$item) return;
    if ($openSubnavItem) closeSubnav($openSubnavItem); // close previous

    $openSubnavItem = $item;
    $openSubnavButton = $item.querySelector('.nav__item__button');
    $openSubnavItem.classList.add('is-subnav-open');
    $openSubnavButton.setAttribute('aria-expanded', 'true');
  };

  const closeSubnav = () => {
    if (!$openSubnavItem) return;

    $openSubnavItem.classList.remove('is-subnav-open');
    $openSubnavButton.setAttribute('aria-expanded', 'false');
    $openSubnavItem = null;
    $openSubnavButton = null;
  };

  const toggleSubnav = ($item) => {
    if ($item === $openSubnavItem) {
      closeSubnav();
    } else {
      openSubnav($item);
    }
  };

  return (
    <>
      {(navItems || primaryCta || secondaryCta) && (
        <nav
          id="nav__menu"
          className="nav__menu"
          role="navigation"
          aria-label="main navigation"
          onMouseOver={handleMouseEvent}
          onKeyDown={handleKeyDown}
          onClick={handleMouseEvent}
        >
          <ul className="nav__list nav__list--primary">
            {navItems &&
              navItems.length &&
              navItems.map((item, index: number) =>
                item.type == 'link' ? (
                  <NavLink key={index} items={item} />
                ) : item.type == 'list' ? (
                  <NavList key={index} items={item} />
                ) : (
                  <NavItem key={index} items={item} features={features} />
                ),
              )}
          </ul>

          {(primaryCta || secondaryCta) && (
            <div className="nav__list nav__list--secondary">
              {primaryCta && (
                <div className="nav__item nav__item--cta">
                  <a
                    className="btn"
                    href={primaryCta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {primaryCta.label}
                  </a>
                </div>
              )}

              {secondaryCta && (
                <div className="nav__list nav__list--tertiary">
                  <div className="nav__item nav__item--cta">
                    <a
                      className="btn btn--secondary"
                      href={secondaryCta.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {secondaryCta.label}
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default Navigation;
