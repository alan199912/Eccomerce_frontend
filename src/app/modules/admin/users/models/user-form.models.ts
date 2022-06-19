import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noSpacesValidator } from 'src/app/core/validators/no-spaces.validator';

export abstract class UserForm {
  public userForm: FormGroup;

  constructor(protected fb: FormBuilder) {
    this.userForm = this.createEmptyForm();
  }

  public createEmptyForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required, noSpacesValidator]],
      email: ['', [Validators.required, Validators.email, noSpacesValidator]],
      password: ['', [Validators.required, Validators.minLength(8), noSpacesValidator]],
      country: ['', [Validators.required, noSpacesValidator]],
      phone: ['', [Validators.required, noSpacesValidator]],
      name: ['', [Validators.required, noSpacesValidator]],
      lastName: ['', [Validators.required, noSpacesValidator]],
      role: ['', [Validators.required, noSpacesValidator]],
      status: ['', [Validators.required, noSpacesValidator]],
    });
  }
}
