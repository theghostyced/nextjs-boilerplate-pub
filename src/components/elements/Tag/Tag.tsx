import cn from 'classnames';

interface IProps {
    label: string;
    url?: string;
    icon?: any;
    modifiers?: string[];
}
const Tag = ({label, icon, modifiers, url}: IProps) => {
    const TagEl = url ? 'a' : 'div';
    const modifiersClass: any = modifiers?.map((modifier: string) => {
        return `tag--${modifier}`;
    });
    let attributes;
    if(url) {
        attributes = {href: url};
    }

    return (
        <TagEl className={cn('tag', modifiersClass, 'f-sans-bold', 'type-eyebrow-3')} {...attributes}>
            <span className="tag__label">{ label }</span>
            { icon && icon }
        </TagEl>
    )
}

export default Tag;