export interface BreadcrumpModel {
  title: string;
  url?: string;
  // active: boolean;
}

export interface BreadcrumpsModel {
  breadcrumps: BreadcrumpModel[];
}
