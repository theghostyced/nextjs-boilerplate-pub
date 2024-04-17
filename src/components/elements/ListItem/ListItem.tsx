import cn from 'classnames';
import { Button } from '../Button/Button';
import Wrap from '../Wrapper/Wrapper';

interface IProps {
    title: string;
    body: React.ReactNode;
    cta?: any;
    htmlTag?: string;
    scopeStyle?: any;
}

const ListItem = ({
    title,
    body,
    cta,
    htmlTag,
    scopeStyle
}: IProps) => {
    const ItemTag: any = htmlTag ? htmlTag : 'li';
    const url = cta != undefined && cta.length > 0 ? cta[0].url : undefined;

    return (
        <ItemTag className={cn(scopeStyle.listItem)}>
            <Wrap
                if={cta}
                with="a"
                wrapperProps={{'href': url, 'className': cn(scopeStyle['listItem-link'], 'u-link-reset')}}
            >
                <div className={cn(scopeStyle.listItem__content, 'stack', 'stack--s')}>
                    <p className="type-body-1">{title}</p>
                    {body && <div className="type-body-3">{body}</div>}
                </div>
                {cta &&
                    <div className={cn(scopeStyle.listItem__link)}>
                        <Button label={cta[0].label} modifiers={['text']} />
                    </div>
                }
            </Wrap>
        </ItemTag>
    )
}

export default ListItem;