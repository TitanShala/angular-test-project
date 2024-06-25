import { Injectable } from '@angular/core';
import { Product, ProductType } from './types';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

const DUMMY_DATA = [
  { id: "1", name: "Product 1", price: 100, date: new Date(), type: ProductType.ELECTRONICS },
  { id: "2", name: "Product 2", price: 200, date: new Date(), type: ProductType.CLOTHING },
  { id: "3", name: "Product 3", price: 300, date: new Date(), type: ProductType.FOOD }
]

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor() {
    this.readProductsFromStorage();

    // Initialize with dummy data if local storage is empty
    if (this.productsSubject.value.length === 0) {
      this.productsSubject.next(DUMMY_DATA);
      this.writeProductsInStorage();
    }
  }

  private setProducts(products: Product[]) {
    this.productsSubject.next(products);
  }

  private getProducts(){
    return this.productsSubject.value
  }

  private readProductsFromStorage = () =>{
    const storedProducts = localStorage.getItem('products');
    if(storedProducts){
      this.setProducts(JSON.parse(storedProducts));
    }
  }

  private writeProductsInStorage = () =>{
    localStorage.setItem('products', JSON.stringify(this.getProducts()));
  }

  addProduct(product:Product) {
    const currentProducts = this.getProducts();

    currentProducts.push(product);
    
    this.setProducts(currentProducts);
    this.writeProductsInStorage();
  }

  removeProduct(id:string) {
    const currentProducts = this.getProducts();    
    const filteredProducts = currentProducts.filter(p => p.id !== id)
    
    this.setProducts(filteredProducts);
    this.writeProductsInStorage();
  }

  editProduct(product:Product) {
    const currentProducts = this.getProducts();
    const index = currentProducts.findIndex(p => p.id === product.id);
    
    if(index === -1){
      return
    }
    
    currentProducts[index] = product;
    
    this.setProducts(currentProducts);
    this.writeProductsInStorage();
  }
}
