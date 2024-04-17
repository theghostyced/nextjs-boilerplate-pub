import cn from 'classnames';
import styles from './Breadcrumbs.module.scss';
import Link from 'next/link';

interface IProps {
	entries?: object[];
	currentEntry?: string;
	modifiers?: string[];
}

interface IEntry {
	text: string;
	url: string;
}

const Breadcrumbs = ({entries, currentEntry, modifiers}: IProps) => {
	return (
		<div className={cn(styles.breadcrumbs, 'type-caption-s', modifiers)}>
			 <div className="container">
			 	<ul className={styles.breadcrumbs__list}>
			 		{entries.map((entry, index) => 
			 			<li key={index}>
				 			<Link href={entry.url} className={cn(styles.breadcrumbs__link, 'type-eyebrow-2')}>{entry.text}</Link>
				 			&nbsp;/&nbsp;
				 			{(((entries.length - 1) == index) && currentEntry) && <span className={cn(styles.breadcrumbs__text, 'type-eyebrow-2')}>{currentEntry}</span>}
			 			</li>
			 		)}
			 	</ul>
			 </div>
		</div>
	)
}

export default Breadcrumbs;