import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../shared/Models/Order';


@Component({
  selector: 'order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrls: ['./order-items-list.component.css']
})
export class OrderItemsListComponent implements OnInit {

  @Input()
  order!:Order;
  constructor() { }
  ngOnInit(): void {
  }

}
