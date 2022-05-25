import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { checkPassword } from 'src/app/core/helpers/checkPassword';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss'],
})
export class RestorePasswordComponent implements OnInit {
  public restorePasswordForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {
    this.restorePasswordForm = fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: checkPassword,
      }
    );
  }

  public ngOnInit(): void {
    if (!this.activatedRoute.snapshot.params['encodeToken']) {
      this.router.navigate(['/login']);
      return;
    }

    this.verifyToken(this.activatedRoute.snapshot.params['encodeToken']);
  }

  private verifyToken(token: string): void {
    this.authService.verifyEncodeToken(token).subscribe({
      next: () => {},
      error: (err) => {
        this.toastr.error(err, 'ERROR');
        this.router.navigate(['/login']);
      },
    });
  }

  public restorePassword(): void {
    if (this.restorePasswordForm.invalid) {
      return;
    }

    this.authService
      .restorePassword(
        this.restorePasswordForm.value.password,
        this.activatedRoute.snapshot.params['encodeToken']
      )
      .subscribe({
        next: () => {
          this.toastr.success('Ha cambiado su contraseña exitosamente', 'Constraseña restaurada');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.toastr.error(err, 'ERROR');
          this.restorePasswordForm.reset();
        },
      });
  }
}
