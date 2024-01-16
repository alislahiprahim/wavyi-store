import { LocalStorageConfigService } from './localStorageConfig.service';
import { Injectable, HostListener, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { RequestBase } from './http/request-base.service';
import { URLS } from '../constant/urls';
import { DestroySubscription } from '../utils/destroySubsription';
import { Category } from '../interfaces/category';
import { Menu } from '../interfaces/menu';
import { getCategoriesWithNoChildren, mapCategoryChildren } from '../utils/methods';

@Injectable({
  providedIn: 'root'
})

export class CategoryServices implements DestroySubscription {

  MENUITEMS: Menu[] = []
  categoryTreeList = signal<Category[]>([]);
  Homecategories$ = signal<Category[]>([]);
  rootcategories$ = signal<Category[]>([]);
  subscriptions: { [key: string]: Subscription; } = {};
  items = signal<Menu[]>([]);;
  selectedCategory: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  constructor(private reqBase: RequestBase, private localStorageConfig: LocalStorageConfigService) { }

  getCategories() {
    console.log('qweqwe',);
    this.reqBase.get<any>(URLS.HOME_CATEGORIES).subscribe({
      next: (res) => {
        this.Homecategories$.set(res.data)
      }
    });
  }


  getRootCategoryies() {

    this.reqBase.get<any>(URLS.ROOT_CATEGORIES).subscribe({
      next: (res) => {
        this.rootcategories$.set(res.data)
      }
    });
  }

  getCategoryTree() {
    this.reqBase.get<any>(URLS.TREE_CATEGORIES).subscribe({
      next: (res) => {
        this.categoryTreeList.set(res.data)
      }
    });
  }

  getAllCategories() {
    this.reqBase.get<any>(`${URLS.STORE_CATEGORIES_WITH_SUB}/${this.localStorageConfig.storeSettings.storeId}`).subscribe({
      next: (res) => {
        this.categoryTreeList.set(getCategoriesWithNoChildren(res.data))
        let categories: any[] = mapCategoryChildren(res.data);
        this.MENUITEMS = this.mapCategoryMenu(categories.map(c => { return { megaMenu: true, ...c } }))
        this.items.set(this.MENUITEMS)
        console.log('this.categoryTreeList()', this.categoryTreeList());
      }
    });


  }

  getCategoryById(id: string) {
    return this.categoryTreeList().find(c => c.id === id)
  }

  mapCategoryMenu(catList: any[]): Menu[] {
    const items: Menu[] = [];
    for (const cat of catList) {
      const catObj: Menu = {
        id: cat.id,
        title: cat.nameEn,
        titleAr: cat.nameAr,
        path: `/products`,
        type: cat.childrenCategories?.length ? 'sub' : 'link',
        queryParams: { catId: cat.id }
      };
      if (cat.childrenCategories?.length) {
        catObj.children = this.mapCategoryMenu(cat.childrenCategories);
      }
      items.push(catObj);
    }
    return items;
  }
}

