import { BaseAbstractPageModel } from 'page-structure';

export interface BlogItemInListViewModel {
  id: number;
  title: string;
  brief: string;
  categoryName: string;
  date: string;
  image: string;
  youtubeVideoCode: string;
  url: string;
  published: boolean;
}
export interface BlogPageIndexModel {
  header: string;
  items?: BlogItemInListViewModel[];
}

export interface BlogPageDetailsModel {
  title: string;
  categoryName: string;
  date: string;
  tags?: string[];
  text: string;
  image: string;
  youtubeVideoCode: string;
}

export interface BlogPageViewModel {
  isDetails: boolean;
  data: BlogPageIndexModel | BlogPageDetailsModel;
}

export class BlogPageModel extends BaseAbstractPageModel {
  viewModel?: BlogPageViewModel;
}
