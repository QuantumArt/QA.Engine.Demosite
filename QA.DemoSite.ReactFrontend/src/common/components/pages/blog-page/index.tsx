import React from 'react';
import { PageProps } from '../../page-props';
import { Layout } from '../../layout';
import { BlogPageModel } from 'common/models';

export const BlogPage: React.FunctionComponent<PageProps<BlogPageModel>> = ({ page }: PageProps<BlogPageModel>) => (
  <Layout page={page}>
    <div>This is blog page</div>
  </Layout>
);
