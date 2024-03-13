import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UpperandfusionPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // console.log(value);
    // console.log(metadata);
    if (metadata.type == 'body') {
      let res = value.data.map((element) => element.toUpperCase()).join('-');
      return res;
    }

    return value;
  }
}
