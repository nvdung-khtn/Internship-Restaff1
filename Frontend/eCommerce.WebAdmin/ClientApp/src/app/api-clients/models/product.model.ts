import { ProfileComponent } from './../../components/setting/profile/profile.component';
export class Product {
    id: string;
    name: string;
    price: number;
    categoryId: string;
    quantity: number;
    description: string;
    photos: string[];
}

export class ProductList {
    id: string;
    name: string;
    price: number;
    category: ProductCategory;
    owner: User;
    photos: string[];
    items: any;
    description: string;
}

class ProductCategory {
    id: string;
    name: string;
    c1Lable: string;
    c1Options: string;
    c2Lable: string;
    c2Options: string;
    c3Lable: string;
    c3Options: string;
    c4Lable: string;
    c4Options: string;
    c5Lable: string;
    c5Options: string;
}

class User {
    id: string;
    username: string;
}

export class UpdateProductModel {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
}

export class GetStarInCardResponse {
    productId: string;
    avgValueDouble: number;
}
