import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'appendIfTrue'
})
export class AppendIfTrue implements PipeTransform {
    transform(value: any, appendText: any, condition = false): string {
        if(condition) {
            return value+appendText;
        }
        return value;
    }
}