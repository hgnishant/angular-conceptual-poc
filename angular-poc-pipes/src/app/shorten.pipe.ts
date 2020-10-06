//custom pipe
import {Pipe, PipeTransform} from '@angular/core';

@Pipe(
    {name:'shorten'}
    )

export class ShortenPipe implements PipeTransform
{
    //it must return something always
    transform(value:any,limit:number) //passing params, second param onwards is param for pipe, u can pass any number of params
    {
        //return custom value that u need
        //now register it in app.module
        if(value.length>limit)
        return value.substr(0,limit-1)+'...';
        return value;
    }
}