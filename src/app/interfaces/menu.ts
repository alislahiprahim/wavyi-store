export interface Menu {
  id?: string;
  path?: string;
  title?: string;
  titleAr?: string;
  type?: string;
  megaMenu?: boolean;
  image?: string;
  active?: boolean;
  badge?: boolean;
  badgeText?: string;
  children?: Menu[];
  queryParams?: Record<string, string>
}
