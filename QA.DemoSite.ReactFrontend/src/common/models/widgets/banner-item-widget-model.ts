import { BaseAbstractWidgetModel } from 'page-structure';

export class BannerItemWidgetModel extends BaseAbstractWidgetModel {
  get header(): string {
    return this.getField<string>('HEADER', '');
  }

  get description(): string {
    return this.getField<string>('DESCRIPTION', '');
  }

  get detailsButtonText(): string {
    return this.getField<string>('DETAILSBUTTONTEXT', '');
  }

  get detailsButtonUrl(): string {
    return this.getField<string>('DETAILSBUTTONURL', '');
  }

  get backgroundImage(): string {
    return this.getField<string>('BACKGROUNDURL', '');
  }

  get image(): string {
    return this.getField<string>('IMAGE', '');
  }

  get showButton(): boolean {
    return !!this.detailsButtonText && !this.detailsButtonUrl;
  }
}
