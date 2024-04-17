import {CTA} from '@/components/DynamicComponent/DynamicComponent.types';
import cn from 'classnames';

import {ArrowRight} from '../Icons/Icons';

type IProps = {
  label: string;
  url?: string;
  blank?: boolean;
  isTrueButton?: boolean | false;
  isJsButton?: boolean | false;
  modifiers?: string[];
  customClass?: string;
  scope?: string;
  icon?: any;
};

interface IPropsWrapper {
  cta: CTA;
  icon?: any;
  scopeStyles?: any;
  scope?: string;
  isAnimated?: boolean | false;
}

export const Button = ({
  label,
  url,
  blank,
  isTrueButton,
  isJsButton,
  modifiers,
  customClass,
  scope,
  icon,
}: IProps) => {
  const ButtonTag = url ? 'a' : 'button';
  const modString = modifiers?.map((modifier: string) => `btn--${modifier}`);
  const isTextButton = modifiers?.some((modifier: string) => {
      return modifier == 'text';
    });

  const attributes: object = {
    href: url ? url : '',
    target: blank ? '_blank' : '',
    role: isTrueButton && ButtonTag === 'a' ? 'button' : '',
    type: isJsButton && ButtonTag === 'button' ? 'button' : '',
  };

  return (
    <ButtonTag className={cn('btn', 'type-ui-3', scope, customClass, modString)} {...attributes}>
      {isTextButton ? (
        <>
          {icon ? icon : <ArrowRight customClass="btn__icon" />}
          <span className="btn__text">{label}</span>
        </>
      ) : (
        <>
          <span className="btn__text">{label}</span>
          {icon ? icon : <ArrowRight customClass="btn__icon" />}
        </>
      )}
    </ButtonTag>
  );
};

export const Actions = ({cta, icon, scopeStyles, scope, isAnimated}: IPropsWrapper) => {
  const ctaStyle = scopeStyles && scope ? scopeStyles[`${scope}__cta`] : '';

  return (
    <div className={cn('btn-row', ctaStyle)}>
      {cta?.map((item: any, index: number) => {
        let modifiers: any[] = [];

        if (isAnimated) {
          modifiers.push('animated');
        }

        if (index == 1) {
          modifiers.push('secondary');
        }

        return (
          <Button key={index} label={item.label} url={item.url} modifiers={modifiers} icon={icon} />
        );
      })}
    </div>
  );
};
