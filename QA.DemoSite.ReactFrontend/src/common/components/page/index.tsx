import React from 'react';
import { BaseAbstractPageModel } from '../../../page-structure/models/abstract';
import { PageProps } from '../page-props';
import { PageType } from '../../enums/abstract-item-type';
import { TextPage } from '../pages/text-page';
import { BlogPageModel, TextPageModel } from '../../models/pages';
import { BlogPage } from '../pages/blog-page';

export const Page: React.FunctionComponent<PageProps<BaseAbstractPageModel>> = ({
  page,
}: PageProps<BaseAbstractPageModel>) => {
  const pageType = page.type as PageType;
  switch (pageType) {
    case PageType.TextPage:
      return <TextPage page={page as TextPageModel} />;
    case PageType.BlogPage:
      return <BlogPage page={page as BlogPageModel} />;
    default:
      return null;
  }
};
