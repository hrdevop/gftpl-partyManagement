import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { SentenceCasePipe } from './sentence-case.pipe';

const PIPES = [
  FilterPipe,
  SentenceCasePipe
]
@NgModule({
  declarations: [...PIPES],
  imports: [

  ],
  exports: [
    ...PIPES
  ]
})
export class PipeModule { }
