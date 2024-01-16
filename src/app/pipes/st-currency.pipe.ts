import { Pipe, PipeTransform } from '@angular/core';
import { LocalStorageConfigService } from '../services/localStorageConfig.service';

@Pipe({
  name: 'stCurrency',
  standalone: true
})
export class StCurrencyPipe implements PipeTransform {
  constructor(private localStorageConfig: LocalStorageConfigService) { }
  transform(value: unknown, ...args: unknown[]): unknown {
    return `${value} ${this.localStorageConfig.currency}`;
  }

}
