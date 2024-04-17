'use client';

import {useEffect, useRef, useState} from 'react';

import styles from './LogoCloud.module.scss';
import cn from 'classnames';

import {IDynamicComponent} from '@/components/DynamicComponent/DynamicComponent.types';
import Heading from '@/components/elements/Heading/Heading';
import {ChevronDown} from '@/components/elements/Icons/Icons';
import Media from '@/components/elements/Media/Media';
import {ILogoCloudFields} from '@/types/contentful';
import {formatImage} from '@/utils/formatMedia';

import Headline from '@/components/modules/Headline/Headline';
import {flatHeadlineProps} from '@/utils/remapedHeadline';

const LogoCloud = (props: IDynamicComponent<ILogoCloudFields>) => {
  const {
    sectionId, 
    theme, 
    headline,
    images, 
    semanticLevel
  } = props;
  
  const headlineProps = flatHeadlineProps(headline);
  const themeClass = theme ? `theme-${theme}` : '';
  const imagesArray = images?.map((img: any) => {
    return formatImage(img);
  });

  const scroll = false;
  const mobileCount = 4;
  const scrollClass = scroll ? 'logo-cloud--scroll' : '';
  const gridClass = scroll ? '' : 'grid';

  const refLogoCloud: any = useRef();
  const refToggleLabel: any = useRef();
  const refImageWrapper: any = useRef();

  const [toggleLabel, setToggleLabel] = useState<string>('View more');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Not sure we need this on the nextjs way.
  // If needed, it should be done globally when attribute is there if it is possible.
  useEffect(() => {
    refLogoCloud.current.setAttribute('data-initialized', true);
  }, []);

  return (
    <section
      id={sectionId}
      className={cn('section', styles['logo-cloud'], themeClass, styles[`${scrollClass}`])}
      ref={refLogoCloud}
      data-initialized="false"
    >
      <div className="container">
        {headline && (
          <Headline
            {...headlineProps}
          />
        )}

        <ul
          className={cn(styles['logo-cloud__images'], gridClass)}
          data-expanded="false"
          ref={refImageWrapper}
          id={`${sectionId}-images`}
        >
          {imagesArray &&
            imagesArray.map((img: any, index: number) => (
              <li
                key={index}
                className={cn(
                  styles['logo-cloud__image'],
                  index > mobileCount ? styles['logo-cloud__image--overflow'] : '',
                )}
              >
                <Media media={img} />
              </li>
            ))}
        </ul>

        {imagesArray.length > mobileCount && !scroll && (
          <button
            aria-controls={`${sectionId}-images`}
            aria-expanded="false"
            className={cn(styles['logo-cloud__toggle'], 'u-button-reset')}
            onClick={handleClick}
          >
            <span ref={refToggleLabel}>{toggleLabel}</span>
            <ChevronDown customClass={cn(styles['logo-cloud__toggle-icon'])} />
          </button>
        )}
      </div>
    </section>
  );

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    const wrapper: HTMLUListElement = refImageWrapper.current;

    if (isExpanded) {
      setIsExpanded(false);
      wrapper.setAttribute('data-expanded', 'false');
      button.setAttribute('aria-expanded', 'false');
      setToggleLabel('View more');
    } else {
      setIsExpanded(true);
      wrapper.setAttribute('data-expanded', 'true');
      button.setAttribute('aria-expanded', 'true');
      setToggleLabel('View less');
    }
  }
};

export default LogoCloud;
