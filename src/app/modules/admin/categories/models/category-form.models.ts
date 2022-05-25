import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noSpacesValidator } from 'src/app/core/validators/no-spaces.validator';

export abstract class CategoryForm {
  public categoryForm: FormGroup;

  constructor(protected fb: FormBuilder) {
    this.categoryForm = this.createEmptyForm();
  }

  public createEmptyForm(): FormGroup {
    return this.fb.group({
      name: [null, [Validators.required, noSpacesValidator]],
    });
  }
}
