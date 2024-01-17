import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LocalStorageConfigService } from './localStorageConfig.service';

@Injectable({
  providedIn: 'root'
})
export class MetaTagsService {

  storeName: string = ''
  constructor(private title: Title, private meta: Meta, private localStorageConfig: LocalStorageConfigService) {
    // this.storeName = this.localStorageConfig.storeSettings.storeName
  }

  setMetaData(title: string, description: string, setStoreName: boolean = false) {
    this.title.setTitle(`${title}${setStoreName ? ` | ${this.storeName}` : ''}`);
    this.meta.updateTag({ name: 'description', content: description });
  }
}
