import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, mergeMap } from 'rxjs';
import { Category } from 'src/app/core/models/category.models';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { MainImageService } from 'src/app/core/services/product/main-image.service';
import { ProductService } from 'src/app/core/services/product/product.service';
import { RestImageService } from 'src/app/core/services/product/rest-image.service';
import { ProductForm } from '../models/product-form.models';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent extends ProductForm implements OnInit {
  public isPreventClickTwice = false;
  public categories: Category[] = [];
  public formDataImage: FormData;
  public formDataMultipleImages: FormData;

  constructor(
    protected override fb: FormBuilder,
    private readonly productService: ProductService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly categoryService: CategoryService,
    private readonly mainImageService: MainImageService,
    private readonly restImageService: RestImageService
  ) {
    super(fb);
  }

  ngOnInit(): void {
    this.getCategoriesList();
  }

  public getCategoriesList(): void {
    this.categoryService.getCategoriesList().subscribe({
      next: (res) => {
        this.categories = res.categories;
      },
      error: (err) => {
        this.toastr.error('Ha ocurrido un error al cargar las categorias, intente más tarde', 'ERROR');
      },
    });
  }

  public setProduct(): void {
    if (this.productForm.invalid) {
      return;
    }

    this.isPreventClickTwice = true;

    const images = forkJoin([
      this.mainImageService.setMainImageProduct(this.formDataImage),
      this.restImageService.setRestImageProduct(this.formDataMultipleImages),
    ]);

    images
      .pipe(
        mergeMap((res) => {
          const { featured, category, ...product } = this.productForm.value;
          const newProduct = {
            ...product,
            mainProductImageId: res[0].mainImage.id,
            restProductImageId: res[1].restImage.id,
            isFeatured: featured,
            categoryId: category,
          };
          return this.productService.setProduct(newProduct);
        })
      )
      .subscribe({
        next: (res) => {
          this.toastr.success('Producto creado correctamente', 'ÉXITO');
          this.router.navigate(['/admin/products']);
        },
        error: (err) => {
          this.toastr.error('Ha ocurrido un error al crear el producto, intente más tarde', 'ERROR');
        },
      });
  }

  loadMainImage(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.formDataImage = new FormData();
      Array.prototype.forEach.call(fileList, (file) => {
        this.formDataImage.append('image', file);
      });
    }
  }

  loadImages(event) {
    let fileList: FileList = event.target.files;
    this.formDataMultipleImages = new FormData();

    Array.prototype.forEach.call(fileList, (file) => {
      this.formDataMultipleImages.append('images', file);
    });
  }
}
