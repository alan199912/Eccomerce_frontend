import { FormControl } from '@angular/forms';

export const noSpacesValidator = (control: FormControl): { [key: string]: boolean } | null => {
  if (!control.value || !String(control.value).replace(/\s/g, '')) {
    return { required: true };
  }

  return;
};
