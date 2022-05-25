import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/core/models/category.models';
import { CategoryService } from '../../../core/services/category/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  public categories: Category[] = [];
  public columns: string[] = [];
  public isLoading = false;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProductList();
  }

  public getProductList(): void {
    this.isLoading = true;
    this.categoryService.getCategoriesListIncludeDeleted().subscribe({
      next: (res) => {
        if (!res || res.length === 0) {
          this.isLoading = false;
          return;
        }

        this.categories = res;
        this.categories = this.categories.map((category) => {
          return {
            ...category,
            createdAt: new Date(category.createdAt).toLocaleDateString(),
            updatedAt: new Date(category.updatedAt).toLocaleDateString(),
            deletedAt: category.deletedAt && new Date(category.deletedAt).toLocaleDateString(),
          };
        });
        this.columns = Object.keys(this.categories[0]);
        this.columns = this.columns.filter(
          (column) => column !== 'images' && column !== 'image' && column !== 'Category'
        );
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  public deleteCategory(id: string): void {
    this.isLoading = true;
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.toastr.success('La categoria se elimino correctamente', 'Eliminado');
        this.getProductList();
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('No se pudo eliminar la categoria', 'Error');
        this.isLoading = false;
      },
    });
  }

  public restoreCategory(id: string): void {
    this.isLoading = true;
    this.categoryService.restoreCategory(id).subscribe({
      next: () => {
        this.getProductList();
        this.toastr.success('La categoria se restauro correctamente', 'Restaurado');
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('No se pudo restaurar la categoria', 'Error');
        this.isLoading = false;
      },
    });
  }
}
