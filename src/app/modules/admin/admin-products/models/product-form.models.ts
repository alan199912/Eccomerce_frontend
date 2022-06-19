import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noSpacesValidator } from 'src/app/core/validators/no-spaces.validator';

export abstract class ProductForm {
  public productForm: FormGroup;

  constructor(protected fb: FormBuilder) {
    this.productForm = this.createEmptyForm();
  }

  public createEmptyForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, noSpacesValidator]],
      description: ['', [Validators.required, noSpacesValidator]],
      richDescription: ['', [Validators.required, noSpacesValidator]],
      brand: ['', [Validators.required, noSpacesValidator]],
      rating: ['', [Validators.required, noSpacesValidator]],
      price: [null, [Validators.required, noSpacesValidator]],
      featured: ['', [Validators.required, noSpacesValidator]],
      category: ['', [Validators.required, noSpacesValidator]],
    });
  }
}
