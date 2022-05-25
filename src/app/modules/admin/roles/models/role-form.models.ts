import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noSpacesValidator } from 'src/app/core/validators/no-spaces.validator';

export abstract class RoleForm {
  public roleForm: FormGroup;

  constructor(protected fb: FormBuilder) {
    this.roleForm = this.createEmptyForm();
  }

  public createEmptyForm(): FormGroup {
    return this.fb.group({
      name: [null, [Validators.required, noSpacesValidator]],
    });
  }
}
