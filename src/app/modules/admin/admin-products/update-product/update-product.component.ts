import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, mergeMap } from 'rxjs';
import { Category } from 'src/app/core/models/category.models';
import { Product } from 'src/app/core/models/product.models';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { MainImageService } from 'src/app/core/services/product/main-image.service';
import { ProductService } from 'src/app/core/services/product/product.service';
import { RestImageService } from 'src/app/core/services/product/rest-image.service';
import { ProductForm } from '../models/product-form.models';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent extends ProductForm implements OnInit {
  public isPreventClickTwice = false;
  public categories: Category[] = [];
  public formDataImage: FormData;
  public formDataMultipleImages: FormData;
  public product!: Product;
  private productId!: string;
  public previewImage: string;
  public previewImages: string[] = [];
  public mainImageId: string;
  public restImagesId: string[] = [];

  constructor(
    protected override fb: FormBuilder,
    private readonly productService: ProductService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly categoryService: CategoryService,
    private readonly mainImageService: MainImageService,
    private readonly restImageService: RestImageService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly sanitizer: DomSanitizer
  ) {
    super(fb);
  }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];
    this.getCategoriesList();
    this.getProductById();
  }

  private getCategoriesList(): void {
    this.categoryService.getCategoriesList().subscribe({
      next: (res) => {
        this.categories = res.categories;
      },
      error: (err) => {
        this.toastr.error('Ha ocurrido un error al cargar las categorias, intente más tarde', 'ERROR');
      },
    });
  }

  private getProductById(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (res) => {
        console.log(res);
        this.product = res.product;
        this.productForm.patchValue({
          name: res.product.name,
          description: res.product.description,
          richDescription: res.product.richDescription,
          brand: res.product.brand,
          price: res.product.price,
          rating: res.product.rating,
          featured: res.product.isFeatured ? 1 : 0,
          category: res.product.categoryId,
        });
        this.previewImage = res.product.MainProductImage.file;
        res.product.RestProductImage.files.split(',').forEach((file) => this.previewImages.push(file));
      },
      error: (err) => {
        this.toastr.error('Ha ocurrido un error al cargar el producto, intente más tarde', 'ERROR');
      },
    });
  }

  public updateProduct(): void {
    console.log(this.productForm.value);
    if (this.productForm.invalid) {
      return;
    }

    this.isPreventClickTwice = true;

    const forkJoinable = [];

    if (this.formDataImage) {
      forkJoinable.push(
        this.mainImageService.updateMainImageProduct(
          this.formDataImage,
          this.product.MainProductImage.id
        )
      );
    }

    if (this.formDataMultipleImages) {
      forkJoinable.push(
        this.restImageService.updateRestImageProduct(
          this.formDataMultipleImages,
          this.product.RestProductImage.id
        )
      );
    }

    if (forkJoinable.length === 0) {
      const { featured, category, ...product } = this.productForm.value;
      const productUpdated = {
        ...product,
        mainProductImageId: this.product.MainProductImage.id,
        restProductImageId: this.product.RestProductImage.id,
        isFeatured: featured,
        categoryId: category,
      };

      console.log(productUpdated);

      this.productService.updateProduct(productUpdated, this.productId).subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.success('Producto actualizado correctamente', 'ÉXITO');
          this.router.navigate(['/admin/products']);
        },
        error: (err) => {
          this.toastr.error(
            'Ha ocurrido un error al actualizar el producto, intente más tarde',
            'ERROR'
          );
        },
      });
      return;
    }

    const images = forkJoin(forkJoinable);

    images
      .pipe(
        mergeMap((res) => {
          res.map((images) => {
            this.mainImageId = images.mainImage ? images.mainImage.id : null;
            this.restImagesId = images.restImage ? images.restImage.id : null;
          });

          const { featured, category, ...product } = this.productForm.value;
          const newProduct = {
            ...product,
            mainProductImageId: this.mainImageId || this.product.MainProductImage.id,
            restProductImageId: this.restImagesId || this.product.RestProductImage.id,
            isFeatured: featured,
            categoryId: category,
          };
          return this.productService.updateProduct(newProduct, this.productId);
        })
      )
      .subscribe({
        next: (res) => {
          this.toastr.success('Producto actualizado correctamente', 'ÉXITO');
          this.router.navigate(['/admin/products']);
        },
        error: (err) => {
          this.toastr.error(
            'Ha ocurrido un error al actualizar el producto, intente más tarde',
            'ERROR'
          );
        },
      });
  }

  loadMainImage(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.formDataImage = new FormData();
      Array.prototype.forEach.call(fileList, (file) => {
        this.extractBase64(file).then((image: any) => (this.previewImage = image.base));
        this.formDataImage.append('image', file);
      });
    }
  }

  loadImages(event) {
    this.previewImages = [];
    let fileList: FileList = event.target.files;
    this.formDataMultipleImages = new FormData();

    Array.prototype.forEach.call(fileList, (file) => {
      this.extractBase64(file).then((image: any) => this.previewImages.push(image.base));
      this.formDataMultipleImages.append('images', file);
    });
  }

  private extractBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustHtml(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };

        reader.onerror = (error) => {
          resolve({
            base: reader.result,
          });
        };
      } catch (error) {}
    });
}
