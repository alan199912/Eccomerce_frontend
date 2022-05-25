import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss'],
})
export class RecoveryPasswordComponent implements OnInit {
  public recoveryPasswordForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly toastr: ToastrService
  ) {
    this.recoveryPasswordForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public ngOnInit(): void {}

  public recoveryPassword(): void {
    if (this.recoveryPasswordForm.invalid) {
      return;
    }

    this.authService.recoveryPassword(this.recoveryPasswordForm.value).subscribe({
      next: () => {
        this.toastr.success(
          'Por favor, verifique su casilla de correo para restaurar su contraseña',
          'Correo enviado'
        );
      },
      error: (err) => {
        this.toastr.error(err, 'ERROR');
        this.recoveryPasswordForm.reset();
      },
    });
  }
}
