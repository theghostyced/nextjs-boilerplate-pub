/* eslint-disable react/display-name */
import {ElementRef, RefObject, forwardRef} from 'react';

import cn from 'classnames';

import Card from '@/components/elements/Card/Card';
import {ChevronDown} from '@/components/elements/Icons/Icons';
import {IFeature} from '@/components/modules/SiteNavigation/SiteNavigation';
import {IMainNavItem} from '@/utils/getMainNavigation';
import slugifyString from '@/utils/slugify';

interface IProps {
  items?: IMainNavItem;
  features?: IFeature[];
  navigationRef?: RefObject<ElementRef<'div'>> | RefObject<ElementRef<'button'>>;
  subNavigationRef?: {
    btnRef?: RefObject<ElementRef<'button'>>;
    subnavRef?: RefObject<ElementRef<'div'>>;
  };
}

export const NavItem = (props: IProps) => {
  const {title, items} = props.items!;
  const slugTitle = slugifyString(title!);

  return (
    <li className="nav__item">
      <button
        className="nav__item__button nav__item__button--subnav"
        type="button"
        aria-expanded="false"
        aria-controls={`id-${slugTitle}-menu`}
        data-ref="nav-btn"
        ref={props.subNavigationRef?.btnRef as any}
      >
        {title}
        <ChevronDown customClass="nav__subnav-icon" />
      </button>
      {(items || props.features) && (
        <div
          ref={props.subNavigationRef?.subnavRef as any}
          id={`id-${slugTitle}-menu`}
          className={cn('nav__subnav', props.features ? 'nav__subnav--feature' : '')}
          data-ref="main-menu-subnav"
        >
          <div className="nav__subnav__layout">
            {items && (
              <div className="nav__subnav__lists">
                {items.map((item: any, index: number) => (
                  <div key={index} className="nav__subnav__sublist">
                    {item.title && (
                      <p className="type-eyebrow-3 nav__subnav__eyebrow">{item.title}</p>
                    )}
                    <ul className="nav__subnav__list">
                      {item.links?.map((link: any, index: number) => {
                        let attributes;
                        if (item.newWindow) {
                          attributes = {
                            target: '_blank',
                            rel: 'noopener noreferrer',
                          };
                        }
                        return (
                          <li key={index}>
                            <a className="nav__subnav__link" href={link.link} {...attributes}>
                              {link.text}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            {props.features &&
              props.features.map((item: any, index: number) => (
                <div key={index} className="nav__subnav__feature">
                  <Card
                    eyebrow={item.eyebrow}
                    title={item.title}
                    body={item.body}
                    figure={item.figure}
                    cta={item.cta}
                    variant="horizontal"
                    scope="nav-feature"
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </li>
  );
};

export const NavLink = (props: IProps) => {
  const {text, link, newWindow} = props.items!;
  let attributes;

  if (newWindow) {
    attributes = {
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  }

  return (
    <li className="nav__item">
      <a className="nav__item__button | type-ui-2" href={link} {...attributes}>
        {text}
      </a>
    </li>
  );
};

export const NavList = (props: IProps) => {
  const {title, items} = props.items!;
  const slugTitle = slugifyString(title!);

  return (
    <li className="nav__item">
      <button
        className="nav__item__button nav__item__button--subnav"
        type="button"
        aria-expanded="false"
        aria-controls={`id-${slugTitle}-menu`}
        data-ref="nav-btn"
        ref={props.subNavigationRef?.btnRef as any}
      >
        {title}
        <ChevronDown customClass="nav__subnav-icon" />
      </button>
      {items && (
        <div
          ref={props.subNavigationRef?.subnavRef as any}
          id={`id-${slugTitle}-menu`}
          className="nav__subnav"
          data-ref="main-menu-subnav"
        >
          <ul className="nav__subnav__list">
            {items.map((item: any, index: number) => {
              let attributes;
              if (item.newWindow) {
                attributes = {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                };
              }
              return (
                <li key={index}>
                  <a className="nav__subnav__link" href={item.link} {...attributes}>
                    {item.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </li>
  );
};
