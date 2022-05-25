import { userUpdate } from './../../../../state/actions/user.actions';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, mergeMap, throwError } from 'rxjs';
import { User } from 'src/app/core/models/user.models';
import { COUNTRIES } from 'src/app/core/helpers/countries';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserService } from '../../../../core/services/service/user.service';
import { selectFeatureUser } from 'src/app/state/selectors/user.selectors';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  public userForm: FormGroup;
  public countries = COUNTRIES;
  public user: User;
  public isLoader = false;

  get getCountry() {
    return this.userForm.get('country');
  }

  constructor(private readonly fb: FormBuilder, private readonly store: Store<AppState>) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      discordName: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    this.isLoader = true;
    this.store.select(selectFeatureUser).subscribe((user) => {
      this.user = user;
      this.userForm.patchValue({
        username: user.username,
        email: user.email,
        country: user.country,
        phone: user.phone,
        name: user.name,
        lastName: user.lastName,
        discordName: user.discordName,
      });
      this.isLoader = false;
    });
  }

  public changeCountry(e: any) {
    this.getCountry?.setValue(e.target.value);
  }

  public updateUser(): void {
    if (this.userForm.invalid) {
      return;
    }

    this.store.dispatch(userUpdate({ id: this.user.id, user: this.userForm.value }));
  }
}
