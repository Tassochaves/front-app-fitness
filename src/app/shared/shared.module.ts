import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ComponentsNgZorroModule } from '../ComponentsNgZorroModule';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsNgZorroModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink,
    RouterOutlet
  ],
  exports:[
    CommonModule,
    ComponentsNgZorroModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink,
    RouterOutlet
  ]
})
export class SharedModule { }
