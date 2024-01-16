import { CartData, CartDataWithoutVariantId, CartService } from './cart.service';
import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { Variant } from '../interface/variants';

@Injectable({
  providedIn: 'root'
})

export class ProductDetailsMethods {
  currentProductItemThumb: any = {};
  currentProductItem: any = {};
  productItemsList: any[] = [];
  cartData: CartData = { productItemId: '', quantity: 1, selectionVariationOptions: [] }
  productItemVariants: Variant[] = []


  constructor(private CartService: CartService) { }

  selectThumb(productItemImage: any) {
    this.currentProductItemThumb = productItemImage;
  }

  selectProductItem(id: string) {
    this.currentProductItem = this.productItemsList.find(p => p.id == id);
    this.selectThumb(this.currentProductItem.productItemImages[0] ?? null);
  }


  addToCart() {
    const data: CartDataWithoutVariantId = {
      productItemId: this.cartData.productItemId,
      quantity: this.cartData.quantity,
      selectionVariationOptions: this.cartData.selectionVariationOptions?.map(({ variationOptionId }) => ({
        variationOptionId,
      }))
    };
    this.CartService.addToCart(data);
    this.cartData = { productItemId: '', quantity: 1, selectionVariationOptions: [] };
  }

  productItemsExist(productService: ProductService) {
    if (this.productItemsList.length) {
      this.currentProductItem = this.productItemsList[0];
      if (this.currentProductItem?.productItemImages.length)
        this.currentProductItemThumb = this.currentProductItem?.productItemImages[0] ?? {};
      else
        this.currentProductItemThumb = productService?.singleProduct.productImages[0] ?? {};

      // this.cartData.productItemId = this.currentProductItem.id;
      this.CartService.itemAddedToCart$.subscribe(result => {
        if (result) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      })
    }
  }

  clear() {
    this.currentProductItemThumb = {};
    this.currentProductItem = {};
    this.productItemsList = [];
    this.cartData = { productItemId: '', quantity: 1, selectionVariationOptions: [] };
  }

  mapProductVariants(productItemVariants: any) {
    return productItemVariants.map(v => {
      return {
        id: v.variationId,
        name: v.variationName,
        type: v.variationType,
        options: [],
        optionId: v.variationOptionId,
        optionName: v.variationOptionName
      }
    })
  }

  getProductItemVariants() {
    const variantsMap = {};
    this.productItemsList.forEach(item => {
      item.productItemVariants.forEach(variant => {
        const { id } = variant;
        if (!variantsMap[id]) {
          variantsMap[id] = {
            id: id,
            name: variant.name,
            type: variant.type,
            options: []
          };
        }
        const existingOption = variantsMap[id].options.find(opt => opt.id === variant.optionId);
        if (existingOption) {
          existingOption.productItemId.push(item.id);
        } else {
          variantsMap[id].options.push({
            id: variant.optionId,
            name: variant.optionName,
            productItemId: [item.id], // Change type to array of strings
            isDisable: false,
            variantId: id
          });
        }
      });
    });

    this.productItemVariants = Object.values(variantsMap);
    if (!this.productItemVariants.length) {
      this.cartData.productItemId = this.productItemsList[0].id;
    }
    console.log('this.productItemVariants', this.productItemVariants);
  }

}
