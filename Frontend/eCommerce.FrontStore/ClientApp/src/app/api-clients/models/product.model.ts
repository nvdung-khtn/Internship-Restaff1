export class Product {
    id: string;
    name: string;
    price: number;
    category: ProductCategory;
    owner: User;
    photos: Photos[];
    description: string;
    lastUpdated: Date;
    quantity: number;
    inventory: inventory
    selectedProperty: Property[];
}
class Photos {
    id: string;
    url: string;
}

class inventory {
    quantity: number;
}

export class ProductCategory {
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

export class User {
    id: string;
    username: string;
}

export class SearchRequestProduct {
    searchTerm?: string;
    sort?: string;
    pageNumber?: string;
    pageSize?: string;
    ownerName?: string;
    categoryName?: string;
    minPrice?: string;
    maxPrice?: string;
    pageIndex?: string;
}

export class Property {
    index: number;
    name: string;
    value: string;

    constructor(index, name, value) {
        this.index = index;
        this.name = name;
        this.value = value;
    }
}
