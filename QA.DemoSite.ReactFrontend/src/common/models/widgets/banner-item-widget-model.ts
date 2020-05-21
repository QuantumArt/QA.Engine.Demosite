import { BaseWidgetModel } from 'page-structure';

export interface BannerItemWidgetModel extends BaseWidgetModel {
  header: string;
  description: string;
  detailsButtonText: string;
  detailsButtonUrl: string;
  backgroundImage: string;
  image: string;
  showButton: boolean;
}
