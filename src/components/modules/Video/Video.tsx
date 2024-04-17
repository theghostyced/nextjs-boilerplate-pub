'use client';

import {MouseEvent, useEffect, useState} from 'react';
import ReactPlayer from 'react-player/lazy';
import {Modal} from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import styles from './Video.module.scss';
import cn from 'classnames';

import {IDynamicComponent} from '@/components/DynamicComponent/DynamicComponent.types';
import {Close} from '@/components/elements/Icons/Icons';
import useIsMounted from '@/hooks/useIsMounted';
import {IVideoFields} from '@/types/contentful';
import {formatImage} from '@/utils/formatMedia';
import imgParams from '@/utils/imgParams';

import Headline from '@/components/modules/Headline/Headline';
import {flatHeadlineProps} from '@/utils/remapedHeadline';

const Video = (props: IDynamicComponent<IVideoFields>) => {
  const isMounted = useIsMounted();

  const {
    sectionId,
    theme,
    headline,
    title, 
    url, 
    poster, 
    thumbnail, 
    openInModal
  } = props;

  const themeClass = theme ? `theme-${theme}` : '';
  const headlineProps = flatHeadlineProps(headline);
  const figure = formatImage(poster);
  const thumb = formatImage(thumbnail);

  const posterSize = 1200;

  const posterUrl =
    figure && figure.src
      ? `${figure.src}?${imgParams({'w': posterSize, 'q': figure.quality, 'fm': 'webp'})}`
      : '';

  const thumbnailImageUrl =
    thumb && thumb.src
      ? `${thumb.src}?${imgParams({
          'w': thumb.width,
          'q': thumb.quality,
          'fm': 'webp',
        })}`
      : '';
  const modalId = Math.random() * (10 - 1) + 1;
  const modalMode = openInModal && modalId ? true : false;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isModalPlaying, setIsModalPlaying] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handlePlayPause = (event: MouseEvent<HTMLElement>) => {
    const parent = (event.currentTarget as HTMLElement).parentNode;
    (parent as HTMLElement).classList.toggle(cn(styles.isActivated));
    setIsPlaying(!isPlaying);
  };
  const handleModalPlayPause = (event: MouseEvent<HTMLElement>) => {
    const parent = (event.currentTarget as HTMLElement).parentNode;
    setIsModalPlaying(!isModalPlaying);

    if (isModalVisible && isModalPlaying) {
      (parent as HTMLElement).classList.remove(cn(styles.isActivated));
    } else {
      (parent as HTMLElement).classList.add(cn(styles.isActivated));
    }
  };

  const toggleModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    if (!isModalVisible) setIsModalPlaying(false);
  }, [isModalVisible, setIsModalPlaying, isModalPlaying]);

  if (!isMounted) return null;

  return (
    <>
      {modalMode && (
        <>
          <div className={cn(styles.videoContainer)}>
            <div
              className={cn(styles.liteVideo)}
              style={{
                ['--lite-ratio' as string]: '16/9',
                ['backgroundImage' as string]: `url(${posterUrl || thumbnailImageUrl})`,
              }}
              aria-label="play video"
              onClick={toggleModalVisibility}
            >
              <span className={cn(styles.litePlaybtn)}></span>
            </div>
          </div>

          <Modal
            open={isModalVisible}
            onClose={toggleModalVisibility}
            center
            styles={{closeButton: {display: 'none'}}}
            classNames={{
              root: 'modal--video',
              overlay: 'modal__overlay',
              modal: 'modal__container',
            }}
          >
            <header className={cn(styles.modal__header)}>
              <h2 className="is-visually-hidden">{title}</h2>
              <button
                role="button"
                className="modal__close modal__close--video"
                aria-label="Close modal"
                onClick={toggleModalVisibility}
              >
                <Close customClass="modal__close-icon" />
              </button>
            </header>

            <div className={styles.modal__content}>
              <div className={cn(styles.videoContainer)}>
                <div className={cn(styles.liteOverlay)} onClick={handleModalPlayPause}>
                  <span className={cn(styles.litePlaybtn)}></span>
                </div>
                <ReactPlayer
                  style={{['--lite-ratio' as string]: '16/9'}}
                  className={cn(styles.liteVideo)}
                  url={url}
                  controls
                  playsinline
                  width="100%"
                  height="100%"
                  playing={isModalPlaying}
                />
              </div>
            </div>
          </Modal>
        </>
      )}

      {!modalMode && (
        <section 
          id={sectionId}
          className={cn('section', 'video', themeClass)}
        >
          {headline && (
            <Headline
              {...headlineProps}
            />
          )}
          <div className={cn(styles.videoContainer)}>
            <div className={cn(styles.liteOverlay)} onClick={handlePlayPause}>
              <span className={cn(styles.litePlaybtn)}></span>
            </div>
            <ReactPlayer
              style={{['--lite-ratio' as string]: '16/9'}}
              className={cn(styles.liteVideo)}
              url={url}
              controls
              playsinline
              width="100%"
              height="100%"
              playing={isPlaying}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default Video;
