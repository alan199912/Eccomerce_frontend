import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noSpacesValidator } from 'src/app/core/validators/no-spaces.validator';

export abstract class ProductForm {
  public productForm: FormGroup;

  constructor(protected fb: FormBuilder) {
    this.productForm = this.createEmptyForm();
  }

  public createEmptyForm(): FormGroup {
    return this.fb.group({
      name: ['Product 1', [Validators.required, noSpacesValidator]],
      description: ['description 1', [Validators.required, noSpacesValidator]],
      richDescription: ['rich desc', [Validators.required, noSpacesValidator]],
      brand: ['brand', [Validators.required, noSpacesValidator]],
      // image: ['', [Validators.required, noSpacesValidator]],
      // images: ['', [Validators.required, noSpacesValidator]],
      rating: ['2', [Validators.required, noSpacesValidator]],
      price: [15, [Validators.required, noSpacesValidator]],
      featured: ['1', [Validators.required, noSpacesValidator]],
      category: ['2', [Validators.required, noSpacesValidator]],
    });
  }
}
