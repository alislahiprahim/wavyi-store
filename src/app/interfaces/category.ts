export interface Category {
  id: string;
  nameEn: string;
  nameAr: string;
  parentId: string | null;
  parentName: string;
  imageUrl: string | null;
  iconUrl: string | null;
  childrenCategories: Category[];
  // Other properties as needed
}
