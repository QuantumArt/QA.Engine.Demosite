import { UniversalAbstractItem } from '../universal-abstract-item';

export abstract class BaseAbstractItemModel implements UniversalAbstractItem {
  alias?: string;
  parent?: UniversalAbstractItem;
  childItems?: UniversalAbstractItem[];
  cultureId?: number;
  id: number;
  isPage: boolean;
  regionIds?: number[];
  sortOrder: number;
  title?: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  untypedFields: { [p: string]: any };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  viewModel?: any;

  protected constructor(
    abstractItem: UniversalAbstractItem,
    mapper: (x: UniversalAbstractItem) => BaseAbstractItemModel,
  ) {
    this.alias = abstractItem.alias;
    this.childItems = abstractItem.childItems?.map(x => mapper(x));
    this.cultureId = abstractItem.cultureId;
    this.id = abstractItem.id;
    this.regionIds = abstractItem.regionIds;
    this.sortOrder = abstractItem.sortOrder;
    this.title = abstractItem.title;
    this.type = abstractItem.type;
    this.untypedFields = abstractItem.untypedFields;
    this.isPage = abstractItem.isPage;
    this.viewModel = abstractItem.viewModel;
  }

  protected getField<T>(fieldName: string, defaultValue: T): T {
    return this.untypedFields?.hasOwnProperty(fieldName) ? (this.untypedFields[fieldName] as T) : defaultValue;
  }
}
