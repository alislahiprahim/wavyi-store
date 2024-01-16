import { Category } from "../interfaces/category";


export function mapCategoryChildren(categories: any[]) {
  const categoryMap = new Map();

  // Iterate over the categories array and map child categories to their respective parent categories
  categories.forEach(category => {
    const parentId = category.parentId;
    if (parentId === null) {
      // If the category is a parent, add it directly to the map
      categoryMap.set(category.id, {
        ...category,
        children: []
      });
    } else {
      // If the category is a child, find its parent category and add it as a subcategory
      const parentCategory = categoryMap.get(parentId);
      if (parentCategory) {
        parentCategory.children.push({
          ...category, path: `/products`,
          queryParams: { catId: category.id },
        });
      }
    }
  });

  // Retrieve the mapped parent categories
  const parentCategories = Array.from(categoryMap.values());
  return parentCategories;
}

export function getCategoriesWithNoChildren(categories: Category[]): Category[] {
  let result: Category[] = [];

  function checkCategories(category: Category) {
    if (category.childrenCategories.length === 0) {
      result.push(category);
    } else {
      category.childrenCategories.forEach((child: any) => {
        checkCategories(child);
      });
    }
  }

  categories.forEach(category => {
    checkCategories(category);
  });

  return result;
}

export function haveSameValues<T>(array1: T[], array2: T[]): boolean {
  if (array1.length !== array2.length) {
    return false;
  }

  const sortedArray1 = array1.slice().sort();
  const sortedArray2 = array2.slice().sort();

  for (let i = 0; i < sortedArray1.length; i++) {
    if (sortedArray1[i] !== sortedArray2[i]) {
      return false;
    }
  }

  return true;
}

export function arraysIncludeValues<T>(array1: T[], array2: T[]): boolean {
  return array1.every(value => array2.includes(value)) || array2.every(value => array1.includes(value));
}
