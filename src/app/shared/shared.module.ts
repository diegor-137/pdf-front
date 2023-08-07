import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    FooterComponent,
    MenuComponent
  ],
  exports:[
    FooterComponent,
    MenuComponent
  ]
  ,
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
