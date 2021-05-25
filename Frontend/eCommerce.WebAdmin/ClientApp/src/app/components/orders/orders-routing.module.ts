import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListOrderComponent } from './list-order/list-order.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-order',
        component: ListOrderComponent,
        data: {
          title: "Order List",
          breadcrumb: "Order List"
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
