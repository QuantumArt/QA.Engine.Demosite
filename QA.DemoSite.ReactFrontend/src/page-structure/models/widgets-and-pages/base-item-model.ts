export interface BaseItemModel {
  readonly type: string;
  readonly id: number;
  readonly title: string;
  readonly alias: string;
  readonly sortOrder: number;
  readonly regionIds?: number[];
  readonly cultureId?: number;
}
