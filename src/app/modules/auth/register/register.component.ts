import { COUNTRIES } from '../../../core/helpers/countries';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public registerForm: FormGroup;
  public countries = COUNTRIES;
  public isLoader = false;

  get getCountry() {
    return this.registerForm.get('country');
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {
    this.registerForm = fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      country: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      discordName: ['', [Validators.required]],
    });
  }

  public changeCountry(e: any) {
    this.getCountry?.setValue(e.target.value);
  }

  public registerUser(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoader = true;

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.toastr.success('Registro exitoso');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoader = false;
        this.toastr.error(err, 'ERROR');
        this.registerForm.reset();
      },
    });
  }
}
