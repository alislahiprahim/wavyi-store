import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imgBaseUrl',
  standalone: true
})
export class ImgBaseUrlPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (value?.includes('http') ?? false) return value;
    else return environment.imgURL + value;
  }

}
