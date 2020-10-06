import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure : false //by defauilt it's true and soen't need to be added. 
  //if u make it false, ur pipe will run on every change on page
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filtereString : string, propName : string): any {
    if(value.length===0 || filtereString==='')//means value array is empty
    {
      return value;
    }
    const resultArray =[];
    for(const item of value){
      
      if(item[propName]===filtereString){
        resultArray.push(item);
      }
     
    }
    return resultArray;
  }

}
