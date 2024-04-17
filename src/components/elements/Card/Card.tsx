import {Button} from '../Button/Button';
import Heading from '../Heading/Heading';
import Media from '../Media/Media';
import Tag from '../Tag/Tag';
import Wrap from '../Wrapper/Wrapper';
import cn from 'classnames';
import {IMediaProps} from '@/utils/responsiveImg';

interface IProps {
  eyebrow?: string;
  title?: string;
  figure?: IMediaProps;
  body?: React.ReactNode;
  cta?: any;
  tag?: any;
  scope?: string;
  scopeStyle?: any;
  variant?: string;
  modifiers?: string[];
  btnModifiers?: string[];
  btnIcon?: string;
  semanticLevel?: any;
}

const Card = ({
  eyebrow,
  title,
  figure,
  body,
  cta,
  tag,
  scope,
  scopeStyle,
  variant,
  modifiers,
  btnModifiers,
  btnIcon,
  semanticLevel = 'h2',
}: IProps) => {

  const link = cta ? cta[0].url : '';
  const CardTag = link ? 'a' : 'article';
  const variantClass = variant ? `card--${variant}` : '';
  const modifiersString = modifiers?.map((modifier: string) => {
    return `card--${modifier}`;
  });
  const ratio = variant == 'horizontal' ? '1-1' : '16-9';

  let cardStyle;
  if (scopeStyle && scope) {
    cardStyle = scopeStyle[`${scope}__card`];
  } else if (scope) {
    cardStyle = `${scope}__card`;
  }

  const scopedClass = (name: string) => {
    if (scopeStyle && scope) {
      return scopeStyle[`${scope}__card-${name}`];
    } else if (!scopeStyle && scope) {
      return `${scope}__card-${name}`;
    }
  };

  return (
    <Wrap
        if={link}
        with="a"
        wrapperProps={{'href': link, 'className': cn('card', variantClass, modifiersString, cardStyle, 'u-link-reset')}}
    >
      {tag && (
        <div className={cn('card__tag')}>
          <Tag label={tag.label} />
        </div>
      )}

      {figure && (
        <div className={cn('card__media', scopedClass('media'))}>
          <Media media={figure} ratio={ratio} />
        </div>
      )}

      <div className={cn('card__content', scopedClass('content'))}>
        <div className="head | stack stack--s">
          {eyebrow && (
            <p className={cn('f-sans-bold', 'type-eyebrow-3', scopedClass('eyebrow'))}>{eyebrow}</p>
          )}
          <Heading level={semanticLevel} className={cn('type-headline-3', scopedClass('title'))}>
            {title}
          </Heading>
          {body && <div className={cn('type-body-3', scopedClass('body'))}>{body}</div>}
        </div>

        {cta && cta[0].label && cta != undefined && (
          <div className="bottom">
            <Button label={cta[0].label} modifiers={btnModifiers} icon={btnIcon!} />
          </div>
        )}
      </div>
    </Wrap>
  );
};

export default Card;
