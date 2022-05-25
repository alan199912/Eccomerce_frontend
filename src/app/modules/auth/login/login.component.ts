import { selectFeatureLoginLoading } from './../../../state/selectors/login.selectors';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadLogin } from 'src/app/state/actions/login.actions';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm: FormGroup;
  public isLoading$: Observable<boolean> = new Observable();

  constructor(private readonly fb: FormBuilder, private readonly store: Store<AppState>) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public loginUser(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading$ = this.store.select(selectFeatureLoginLoading);
    this.store.dispatch(loadLogin(this.loginForm.value));
  }
}
