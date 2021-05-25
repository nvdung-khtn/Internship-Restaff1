import { filter, finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProductClient } from 'src/app/api-clients/product.client';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryReturnModel } from 'src/app/api-clients/models/category.model';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { FileUpload } from 'src/app/shared/service/upload-image/uploadImage.model';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
    selector: 'app-update-product',
    templateUrl: './update-product.component.html',
    styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
    productForm: FormGroup;
    productId: string;
    product: any;
    listUrlImage = [];
    listUrlImageTemp = [];
    defaultUrl = 'assets/images/pro3/1.jpg';
    categories = [];
    selectedFiles?: FileList = null;
    fileUpload?: FileUpload;
    private basePath = '/uploads';
    // private defaultPrice = 1000;

    public config1: DropzoneConfigInterface = {
        clickable: true,
        maxFiles: 10,
        autoReset: 1,
        errorReset: null,
        cancelReset: null,
    };

    public onUploadInit(args: any): void {}

    public onUploadError(args: any): void {}

    public onUploadSuccess(args: any): void {
        this.uploadSingleImage(args[0]);
        this.toastr.success('Upload image successfully!', 'Success...');
    }

    uploadSingleImage(selectedFiles) {
        const file: File | null = selectedFiles;
        selectedFiles = undefined;

        if (file) {
            this.fileUpload = new FileUpload(file);
            const filePath = `${this.basePath}/${this.fileUpload.file.name}`;
            const storageRef = this.storage.ref(filePath);
            const uploadTask = this.storage.upload(
                filePath,
                this.fileUpload.file
            );

            uploadTask
                .snapshotChanges()
                .pipe(
                    finalize(() => {
                        storageRef.getDownloadURL().subscribe((downloadURL) => {
                            this.fileUpload.url = downloadURL;
                            this.fileUpload.name = this.fileUpload.file.name;
                            this.listUrlImage.push(this.fileUpload.url);
                            console.log('list url', this.listUrlImage);
                            console.log('list url', this.listUrlImageTemp);
                        });
                    })
                )
                .subscribe();
        }
    }

    constructor(
        private _route: ActivatedRoute,
        private _productClient: ProductClient,
        private fb: FormBuilder,
        private location: Location,
        private toastr: ToastrService,
        private storage: AngularFireStorage
    ) {}

    ngOnInit() {
        this.productId = this._route.snapshot.paramMap.get('productId');
        this.getAllCategory();
        this.getProductDetail(this.productId);
    }

    getProductDetail(productId: string): any {
        return this._productClient
            .getProductDetail(productId)
            .subscribe((res) => {
                this.product = res;
                this.InitForm();
                this.setValue();
                console.log(this.product);
            });
    }

    getListImage(photos) {
        for (let index = 0; index < photos.length; index++) {
            this.listUrlImageTemp.push(photos[index].url);
        }
        this.listUrlImage = this.listUrlImageTemp;
        console.log(this.listUrlImage);
    }

    InitForm() {
        this.productForm = this.fb.group({
            name: [
                this.product.name,
                [
                    Validators.required,
                    // Validators.minLength(10),
                    // Validators.pattern('^[A-Za-z0-9 .,_-]*$'), //^[A-Za-z0-9_-]*$
                ],
            ],
            price: [
                this.product.price,
                [Validators.required, Validators.pattern('^[0-9]*$')],
            ],
            categoryId: [this.product.category.id, [Validators.required]],
            description: [
                this.product.description,
                [
                    Validators.required,
                    // Validators.minLength(10),
                    // Validators.pattern('^[A-Za-z0-9 .,_-]*$'),
                ],
            ],
        });
        this.getListImage(this.product.photos);
        console.log(this.product);
        console.log(this.productForm);
    }

    get name() {
        return this.productForm.get('name');
    }

    get price() {
        return this.productForm.get('price');
    }

    get categoryId() {
        return this.productForm.get('categoryId');
    }

    get description() {
        return this.productForm.get('description');
    }

    getAllCategory() {
        this._productClient
            .getAllCategory()
            .subscribe((res: CategoryReturnModel) => {
                this.categories = res.items;
            });
    }

    Reset() {
        this.listUrlImageTemp = [];
        this.InitForm();
    }
    onSubmit() {
        const formData = {
            ...this.productForm.value,
            id: this.productId,
            photos: this.listUrlImage,
        };
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!',
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('updated');
                this._productClient.updateProduct(formData).subscribe(
                    (res) => {
                        console.log(res);
                        console.error('Update suscess', formData);
                        this.location.back();
                    },
                    (err) => {
                        console.log(err);
                    }
                );
                Swal.fire(
                    'Updated!',
                    'Your product has been updated.',
                    'success'
                );
            }
        });
    }
    setValue() {
        this.productForm.setValue({
            name: this.product.name,
        });
    }
    deleteImage(image) {
        this.listUrlImage = this.listUrlImage.filter((item) => item !== image);
        console.log(this.listUrlImage);
        this.toastr.success('Delete image successfully!', 'Success...');
    }
}
