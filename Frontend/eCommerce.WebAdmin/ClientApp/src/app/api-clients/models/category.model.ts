

export class CategoryReturnModel {
    items: object[];
    totalRows: number;
    totalPages: number;
}

export class LableOptions {
    lable: string;
    options: string;

    constructor(lable?: string, options?: string) {
        this.lable = lable;
        this.options = options;
    }
}

class Base {
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

    constructor(name: string, lableOptions: LableOptions[]) {
        if (lableOptions.length < 5) {
            for (let i = lableOptions.length; i < 5; i++) {
                lableOptions.push(new LableOptions());
            }
        }
        this.name = name;
        this.c1Lable = lableOptions[0].lable;
        this.c1Options = lableOptions[0].options;
        this.c2Lable = lableOptions[1].lable;
        this.c2Options = lableOptions[1].options;
        this.c3Lable = lableOptions[2].lable;
        this.c3Options = lableOptions[2].options;
        this.c4Lable = lableOptions[3].lable;
        this.c4Options = lableOptions[3].options;
        this.c5Lable = lableOptions[4].lable;
        this.c5Options = lableOptions[4].options;
    }
}

export class CreateCategoryRequest extends Base {
    constructor(name: string, lableOptions: LableOptions[]) {
        super(name, lableOptions);
    }
}

export class UpdateCategoryRequest extends Base {

}

export class CategoryDetails {
    id: string;
    name: string;
    lableOptions: LableOptions[];
}

export class Category extends Base {

    id: string;
    constructor(id: string, name: string, lableOptions: LableOptions[]) {
        super(name, lableOptions);
        this.id = id;
    }
}

export class CategoryResponse {
    id: string;
    name: string;
    items: Category[];
}
