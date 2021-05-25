import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CKEditorModule } from 'ngx-ckeditor';
import { CKEditorModule as CKEditorModule1 } from 'ng2-ckeditor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductsRoutingModule } from './products-routing.module';

import { SubCategoryComponent } from './physical/sub-category/sub-category.component';
import { ProductListComponent } from './physical/product-list/product-list.component';
import { AddProductComponent } from './physical/add-product/add-product.component';
import { DigitalCategoryComponent } from './digital/digital-category/digital-category.component';
import { DigitalSubCategoryComponent } from './digital/digital-sub-category/digital-sub-category.component';
import { DigitalListComponent } from './digital/digital-list/digital-list.component';
import { DigitalAddComponent } from './digital/digital-add/digital-add.component';
import { ProductDetailComponent } from './physical/product-detail/product-detail.component';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { ProductClient } from '../../api-clients/product.client';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { UpdateProductComponent } from './physical/update-product/update-product.component';
import { SharedModule } from '../../shared/shared.module';
import { BarRatingModule } from 'ngx-bar-rating';
import { RouterModule } from '@angular/router';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
    maxFilesize: 50,
    url: 'https://httpbin.org/post',
};

@NgModule({
    declarations: [
        SubCategoryComponent,
        ProductListComponent,
        DigitalCategoryComponent,
        DigitalSubCategoryComponent,
        DigitalListComponent,
        DigitalAddComponent,
        ProductDetailComponent,
        AddProductComponent,
        UpdateProductComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CKEditorModule,
        CKEditorModule1,
        ProductsRoutingModule,
        Ng2SmartTableModule,
        NgbModule,
        DropzoneModule,
        GalleryModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        IvyCarouselModule,
        SharedModule,
        BarRatingModule,
    ],
    exports: [BarRatingModule],
    providers: [
        {
            provide: DROPZONE_CONFIG,
            useValue: DEFAULT_DROPZONE_CONFIG,
        },
        NgbActiveModal,
        ProductClient,
    ],
})
export class ProductsModule {}
