import React from 'react';
import { PageProps } from '../page-props';
import { PageType } from 'common/enums';
import { BlogPage, TextPage } from '../pages';
import { BasePageModel } from 'page-structure';
import { BlogPageModel, TextPageModel } from 'common/models/pages';

export const Page: React.FunctionComponent<PageProps<BasePageModel>> = ({ page }: PageProps<BasePageModel>) => {
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
