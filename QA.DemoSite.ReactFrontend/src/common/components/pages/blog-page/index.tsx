import React from 'react';
import { BlogPageModel } from '../../../models/pages';
import { PageProps } from '../../page-props';
import { Layout } from '../../layout';

export const BlogPage: React.FunctionComponent<PageProps<BlogPageModel>> = ({ page }: PageProps<BlogPageModel>) => (
  <Layout page={page}>
    <div>This is blog page</div>
  </Layout>
);
