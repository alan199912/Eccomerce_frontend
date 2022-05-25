import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { CategoryForm } from '../models/category-form.models';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss'],
})
export class UpdateCategoryComponent extends CategoryForm implements OnInit {
  public isPreventClickTwice = false;
  public categoryId: string;

  constructor(
    protected override fb: FormBuilder,
    private readonly categoryService: CategoryService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    super(fb);
  }

  ngOnInit(): void {
    this.categoryId = this.activatedRoute.snapshot.params['id'];
    this.getCategory();
  }

  private getCategory(): void {
    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (res) => {
        this.categoryForm.patchValue(res);
      },
      error: () => {
        this.toastr.error('Ha ocurrido un error al obtener la categoria', 'Error');
      },
    });
  }

  public updateCategory(): void {
    if (this.categoryForm.invalid) return;

    this.isPreventClickTwice = true;

    this.categoryService.updateCategory(this.categoryForm.getRawValue(), this.categoryId).subscribe({
      next: (res) => {
        this.categoryForm.reset();
        this.toastr.success('Categoria editada con éxito', 'Éxito');

        this.router.navigate(['/admin/categories']);
      },
      error: () => {
        this.isPreventClickTwice = false;
        this.toastr.error('Ha ocurrido un error al editar la categoria', 'Error');
      },
    });
  }
}
