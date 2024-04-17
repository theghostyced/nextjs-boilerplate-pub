"use client";
import { A11y, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './Carousel.module.scss';
import cn from 'classnames';
import { ArrowLeft, ArrowRight } from '@/components/elements/Icons/Icons';

interface IProps {
    items: any[];
    children: any;
    settings?: any;
}

const Carousel = ({ items,  children, settings }: IProps) => {
    const sliderOptions = {
        slidesPerView: 1,
        spaceBetween: 16,
        breakpoints: {
            600: {
                slidesPerView: 2
            },
            960: {
                slidesPerView: 3
            },
            1280: {
                slidesPerView: 4
            },
            1440: {
                slidesPerView: 5
            }
        },
        grabCursor: true,
        // pagination: {clickable: true, el: '.pagination__list'},
        navigation: {
            nextEl: '.next',
            prevEl: '.previous',
        },
        ...settings
        // you can override setting options pass settings props to this component
    };

    const pagination = {
        clickable: true,
        el: '.pagination__list',
        renderBullet: function (index, className) {
          return `<button class="${className}">${index + 1}</button>`;
        },
      };

    return (
        <>
            <Swiper
                pagination={pagination}
                className={cn(styles.carousel)}
                modules={ [Pagination, Navigation, A11y]}
                {...sliderOptions}
            >
                {children}
                <div className={cn(styles.container)}>
                    <div className="pagination">
                        <button type="button" className={cn(styles.actions__prev, 'previous')} disabled aria-label="Previous">
                            <ArrowLeft customClass={cn(styles.actions__icon)}/>
                        </button>
                        <div role="group" className="pagination__list"></div>
                        <button type="button" className={cn(styles.actions__next, 'next')} aria-label="Next">
                            <ArrowRight customClass={cn(styles.actions__icon)} />
                        </button>
                    </div>
                </div>
            </Swiper>
        </>
    );
};

export { SwiperSlide as Slide };
export default Carousel;