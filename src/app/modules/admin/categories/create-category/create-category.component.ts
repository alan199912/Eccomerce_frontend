import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { CategoryForm } from '../models/category-form.models';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent extends CategoryForm {
  public isPreventClickTwice = false;

  constructor(
    protected override fb: FormBuilder,
    private readonly categoryService: CategoryService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {
    super(fb);
  }

  public setCategory(): void {
    if (this.categoryForm.invalid) return;

    this.isPreventClickTwice = true;

    this.categoryService.setCategory(this.categoryForm.getRawValue()).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.categoryForm.reset();
        }
        this.toastr.success('Se ha agregado una nueva categoria con éxito', 'Éxito');

        this.router.navigate(['/admin/categories']);
      },
      error: () => {
        this.isPreventClickTwice = false;
        this.toastr.error('Ha ocurrido un error al agregar una nueva categoria', 'Error');
      },
    });
  }
}
