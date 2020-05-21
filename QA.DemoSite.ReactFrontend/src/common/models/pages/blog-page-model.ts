import { BasePageModel } from 'page-structure';

export enum BlogPageType {
  Index,
  Details,
}

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
export interface BlogPageIndexViewModel {
  header: string;
  items?: BlogItemInListViewModel[];
}

export interface BlogPageDetailsViewModel {
  title: string;
  categoryName: string;
  date: string;
  tags?: string[];
  text: string;
  image: string;
  youtubeVideoCode: string;
}

export interface BlogPageModel extends BasePageModel {
  blogPageType: BlogPageType;
  viewModel: BlogPageIndexViewModel | BlogPageDetailsViewModel;
}
