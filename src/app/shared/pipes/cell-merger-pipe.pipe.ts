import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cellMerger'
})
export class CellMerger implements PipeTransform {
    transform(listOfColumnFactors: string[], expansionFactor: number, currentIndex: number): string {
        return (listOfColumnFactors.slice(currentIndex,currentIndex+expansionFactor).map((factor)=> parseInt(factor)*0.01).reduce((accumulator,value)=> accumulator+value,0)*100).toString()+"%"
    }
}