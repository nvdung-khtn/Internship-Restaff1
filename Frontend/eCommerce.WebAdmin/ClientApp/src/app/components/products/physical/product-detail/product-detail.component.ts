import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Image } from '@ks89/angular-modal-gallery';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductClient } from 'src/app/api-clients/product.client';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
    //providers: [NgbRatingConfig],
})
export class ProductDetailComponent implements OnInit {
    public closeResult: string;
    public counter: number = 1;
    product: any;
    productId: string;
    public labels: string[] = [];
    listUrlImage: string[] = [];
    listUrlImageTemp = [];
    property = [0, 0, 0, 0, 0];
    starAvg = 0;
    ratingNumber = 0;

    constructor(
        private modalService: NgbModal,
        //config: NgbRatingConfig,
        private productClient: ProductClient,
        private _route: ActivatedRoute,
        private toastr: ToastrService,
        private location: Location
    ) {
        // config.max = 5;
        // config.readonly =true;
    }

    open(content) {
        this.modalService
            .open(content, { ariaLabelledBy: 'modal-basic-title' })
            .result.then(
                (result) => {
                    this.closeResult = `Closed with: ${result}`;
                },
                (reason) => {
                    this.closeResult = `Dismissed ${this.getDismissReason(
                        reason
                    )}`;
                }
            );
    }
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    async getProductDetail(productId: string) {
        return await this.productClient
            .getProductDetail(this.productId)
            .subscribe((response) => {
                this.product = response;
                this.getCategory();
                this.getListImage(this.product.photos);
                console.log(this.product);
            });
    }

    async ngOnInit() {
        this.productId = this._route.snapshot.paramMap.get('productId');
        this.product = await this.getProductDetail(this.productId);
        this.getStarAvg();
    }

    getCategory() {
        let labels: any[] = [];
        let category = this.product.category;

        if (category && category.c1Lable) {
            //options.push(category.c1Options.split(/[ ,]+/))
            labels.push({
                label: category.c1Lable,
                options: category.c1Options.split(/[,]+/),
            });
        }
        if (category && category.c2Lable) {
            labels.push({
                label: category.c2Lable,
                options: category.c2Options.split(/[,]+/),
            });
        }
        if (category && category.c3Lable) {
            labels.push({
                label: category.c3Lable,
                options: category.c3Options.split(/[,]+/),
            });
        }
        if (category && category.c4Lable) {
            labels.push({
                label: category.c4Lable,
                options: category.c4Options.split(/[,]+/),
            });
        }
        if (category && category.c5Lable) {
            labels.push({
                label: category.c5Lable,
                options: category.c5Options.split(/[,]+/),
            });
        }
        this.labels = labels;
        console.log(this.labels);
    }

    getListImage(photos) {
        for (let index = 0; index < photos.length; index++) {
            this.listUrlImageTemp.push(photos[index].url);
        }
        this.listUrlImage = this.listUrlImageTemp;
        console.log(this.listUrlImage);
    }

    deleteProduct(productId: string) {
        console.log(productId);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                this.productClient
                    .deleteProducts(productId)
                    .subscribe((res) => {
                        this.toastr.success(
                            'delete product successfully!',
                            'Success...'
                        );
                        this.location.back();
                    });
                Swal.fire(
                    'Deleted!',
                    'Your product has been deleted.',
                    'success'
                );
            }
        });
    }

    onSelectedProperty(indexLabel: number, indexActive: number) {
        this.property[indexLabel] = indexActive;
    }

    getStarAvg() {
        this.productClient
            .getStartInCard(this.productId)
            .subscribe((response: any) => {
                console.log(response);
                this.ratingNumber = response.numberRating;
                this.starAvg = response.avgValueDouble;
            });
    }
}
