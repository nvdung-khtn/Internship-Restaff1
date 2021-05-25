import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { InventoryClient } from 'src/app/api-clients/_index';

@NgModule({
  declarations: [InventoryComponent],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    Ng2SmartTableModule
  ],
  providers: [
    InventoryClient
  ]
})
export class InventoryModule { }
