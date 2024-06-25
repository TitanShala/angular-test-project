export interface Product {
    id:string;
    name:string;
    price:number;
    date:Date;
    type:ProductType;
}

export enum ProductType {
    ELECTRONICS = 'electronics',
    CLOTHING = 'clothing',
    FOOD = 'food'
}