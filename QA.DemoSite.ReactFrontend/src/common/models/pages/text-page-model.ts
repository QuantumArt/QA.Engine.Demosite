import { BasePageModel } from 'page-structure';

export interface TextPageModel extends BasePageModel {
  text: string;
  hideTitle: boolean;
}
