
class InventoryBase {
    id: string;
    quantity: number;
    rowVersion: string[];
    constructor(id: string, quantity: number, rowVersion: string[]) {
        this.id = id;
        this.quantity = quantity;
        this.rowVersion = rowVersion;
    }
}

export class UpdateInventoryRequest extends InventoryBase {

    constructor(id: string, quantity: number, rowVersion: string[]) {
        super(id, quantity, rowVersion);
    }
}

export class Inventory extends InventoryBase {
    product: InventoryProduct;
    lastUpdated: Date;
    lastUpdatedBy: string;
    ownerUsername: string;
    productCategoryName: string;
}

export class InventoryProduct {
    id: string;
    name: string;
    price: number;

}
