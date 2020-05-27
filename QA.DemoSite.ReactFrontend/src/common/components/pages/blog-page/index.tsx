import React from 'react';
import { PageProps } from '../../page-props';
import { BlogPageModel, BlogPageType } from 'common/models';
import { BlogItemsPage } from './blog-items';
import { BlogDetailsPage } from './blog-details';

export const BlogPage: React.FunctionComponent<PageProps<BlogPageModel>> = ({ page }: PageProps<BlogPageModel>) => {
  switch (page.blogPageType) {
    case BlogPageType.Index:
      return <BlogItemsPage page={page} />;

    case BlogPageType.Details:
      return <BlogDetailsPage page={page} />;

    default:
      return null;
  }
};
