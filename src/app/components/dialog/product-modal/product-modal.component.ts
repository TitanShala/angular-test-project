import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Product, ProductType } from '../../../services/products/types';

interface ProductForm {
  name: FormControl<string | null>;
  price: FormControl<number | null>;
  date: FormControl<string | null>;
  type: FormControl<ProductType | null>;
}

@Component({
  selector: 'product-modal',
  standalone: true,
  imports: [ButtonModule, DialogModule, ReactiveFormsModule, CalendarModule, CommonModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css'
})

export class EditProductComponent {
  @Input() product: Product | undefined | null;

  @Input() visible: boolean=false;

  @Output() onSaveEdit = new EventEmitter<Product>();

  @Output() onSaveAdd = new EventEmitter<Product>();

  @Output() onCancel = new EventEmitter<void>();

  form: FormGroup<ProductForm>; // Declare form property of type FormGroup
  
  options = Object.values(ProductType);

  constructor(private fb: FormBuilder, private datePipe: DatePipe) { 
    this.form = this.fb.group({
      name: [this.product?.name || '', [Validators.required]],
      price: [1, [Validators.required, Validators.min(1)]],
      date: [this.formatDate(new Date()), [Validators.required]],
      type: [ProductType.ELECTRONICS, [Validators.required]],
    } );
  }
  
  ngOnChanges(): void {
    if (this.product) {
      this.form.patchValue({
        name: this.product.name || '',
        price: this.product.price || 0,
        date: this.formatDate(this.product.date),
        type: this.product.type || ProductType.ELECTRONICS,
      });
    }else{
      this.form.patchValue({
        name: '',
        price: 1,
        date: this.formatDate(new Date()),
        type: ProductType.ELECTRONICS,
      });
    }
  }
  
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  onSaveClick = ()=>{   
    if(this.form.invalid)
      return;
    
    if(!this.form.value.date || !this.form.value.name || !this.form.value.price || !this.form.value.type)
      return;

    const newProduct:Product = {
      id:this.product?.id || new Date().getTime().toString(),
      name: this.form.value.name,
      price: this.form.value.price,
      date: new Date(this.form.value.date),
      type: this.form.value.type,
    };
    
    if(this.product){
      this.onSaveEdit.emit(newProduct);
    }else{
      this.onSaveAdd.emit(newProduct);
    }

    this.onCancel.emit();
  }

  onCancelClick = ()=>{    
    this.onCancel.emit();
  }
}
