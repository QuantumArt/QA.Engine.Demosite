export interface BreadcrumpModel {
  title: string;
  url?: string;
}

export interface BreadcrumpsModel {
  breadcrumps: BreadcrumpModel[];
}
