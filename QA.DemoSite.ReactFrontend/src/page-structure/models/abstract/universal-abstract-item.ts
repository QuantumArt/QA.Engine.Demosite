export interface UniversalAbstractItem {
  readonly type: string;
  readonly id: number;
  readonly alias?: string;
  readonly title?: string;
  isPage: boolean;
  readonly sortOrder: number;
  readonly regionIds?: number[];
  readonly cultureId?: number;
  childItems?: UniversalAbstractItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly untypedFields: { [key: string]: any };
}
