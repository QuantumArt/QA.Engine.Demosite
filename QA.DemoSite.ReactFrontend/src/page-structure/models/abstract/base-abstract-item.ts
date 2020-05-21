import { UniversalAbstractItem } from './universal-abstract-item';

export abstract class BaseAbstractItem {
  readonly alias?: string;
  readonly parent?: BaseAbstractItem;
  readonly childItems?: ReadonlyArray<BaseAbstractItem>;
  readonly cultureId?: number;
  readonly id: number;
  readonly isPage: boolean;
  readonly regionIds?: number[];
  readonly sortOrder: number;
  readonly title?: string;
  readonly type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly untypedFields: { [key: string]: any };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  constructor(
    abstractItem: UniversalAbstractItem,
    mapper: (x: UniversalAbstractItem, parent: BaseAbstractItem) => BaseAbstractItem,
    parent?: BaseAbstractItem,
  ) {
    this.alias = abstractItem.alias;
    this.childItems = abstractItem.childItems?.map(x => mapper(x, this));
    this.parent = parent;
    this.cultureId = abstractItem.cultureId;
    this.id = abstractItem.id;
    this.regionIds = abstractItem.regionIds;
    this.sortOrder = abstractItem.sortOrder;
    this.title = abstractItem.title;
    this.type = abstractItem.type;
    this.untypedFields = abstractItem.untypedFields;
    this.isPage = abstractItem.isPage;
  }

  protected getField<T>(fieldName: string, defaultValue: T): T {
    return this.untypedFields?.hasOwnProperty(fieldName) ? (this.untypedFields[fieldName] as T) : defaultValue;
  }
}
