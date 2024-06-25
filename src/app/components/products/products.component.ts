import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product, ProductType } from '../../services/products/types';
import { ProductsService } from '../../services/products/products.service';
import { CommonModule, DatePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { EditProductComponent } from '../dialog/product-modal/product-modal.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule,EditProductComponent, ToastModule, ConfirmDialogModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products:Product[] = []
  selectedProduct:Product | null = null

  visibleModal: boolean = false;

  constructor(
    private productsService: ProductsService, 
    private datePipe: DatePipe, 
    private confirmationService: 
    ConfirmationService, 
    private messageService: MessageService) { 
  }

  ngOnInit() {
    this.productsService.products$.subscribe(
      (products) => {
        this.products = products;
      }
    );
  }

  formatDate(date: Date) {
    return this.datePipe.transform(date, 'dd-MM-yyyy') || '';
  }

  addProduct(product: Product) {
    this.productsService.addProduct(product);
    this.showSuccess("Product added")
  }

  editProduct(product: Product) {
    this.productsService.editProduct(product)
    this.showSuccess("Product edited")
  }

  removeProduct(id:string) {    
    this.productsService.removeProduct(id)
    this.showSuccess("Product removed")
  }

  showEditDialog(product:Product){    
    this.selectedProduct = product;
    this.visibleModal = true;    
    
  }

  showAddDialog(){
    this.selectedProduct = null;
    this.visibleModal = true;
  }

  onCancel(){
    this.visibleModal = false;
  }

  confirm(id:string) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => this.removeProduct(id),
        reject: () => null
    });
  }

  showSuccess(text:string) {
    this.messageService.add({severity:'success', summary: 'Success', detail: text});
  }

}
