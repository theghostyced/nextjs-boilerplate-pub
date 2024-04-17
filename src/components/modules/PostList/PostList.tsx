import cn from 'classnames';
import {createContext, useContext, useEffect, useState} from 'react';
import styles from './PostList.module.scss';
import {IPostListFields, IPost} from '@/types/contentful';
import {IDynamicComponent} from '@/components/DynamicComponent/DynamicComponent.types';
import Card from '@/components/elements/Card/Card';
import Headline from '@/components/modules/Headline/Headline';
import {formatImage} from '@/utils/formatMedia';
import {flatHeadlineProps} from '@/utils/remapedHeadline';
import slugify from '@sindresorhus/slugify';
import sortBy from 'lodash.sortby';
import {Date} from '@/utils/time';
import buildUrl from '@/utils/buildUrl';

const PostList = (props: IDynamicComponent<IPostListFields>) => {
	const {
		sectionId,
		theme,
		headline,
		sort,
		order,
		limit,
		postItems,
		posts,
		semanticLevel
	} = props;


	const sortedPosts = sortBy(posts.all, [`fields.${sort}`]) as IPost[];
	const orderedPosts = order == 'asc' ? sortedPosts : sortedPosts.reverse();
	const limitedPosts = limit ? orderedPosts.slice(0, limit) : orderedPosts;

	const themeClass = theme ? `theme-${theme}` : '';
  	const headlineProps = flatHeadlineProps(headline);

  	return (
  		<section
	  		id={sectionId}
	  		className={cn('section', 'post-list', themeClass)}
	  	>
	  		{headline && (
		    	<Headline
		      	{...headlineProps}
		    	/>
		  	)}	
		  	<ul className="container | grid">
		  		{limitedPosts.map((post: IPost, index: number) => {
		  			const postLink = {
		  				slug: post.fields.slug,
		  				contentType: post.sys.contentType.sys.id,
		  				type: post.fields.type,
		  				category: slugify(post.fields.category!)
		  			}
		  			return (
		  				<li key={index} className={cn(styles['post-list__item'])}>
			  				<Card
			  					eyebrow={Date(post.fields.publishedOn, 'DDD') == 'Invalid DateTime' ? false : Date(post.fields.publishedOn, 'DDD')}
			  					title={post?.fields?.title}
			  					figure={formatImage(post?.fields?.thumbnailImage)}
			  					body={post.fields.thumbnailText}
			  					cta={[{label: 'Read more', url: buildUrl(postLink)}]}
			  					scope="post-list"
	                			variant="vertical"
			  				/>
			  			</li>
		  			)
		  		})}
		  	</ul>
	  	</section>
  	)
}

export default PostList;