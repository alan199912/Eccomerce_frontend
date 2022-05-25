import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { userLoad } from 'src/app/state/actions/user.actions';
import { selectFeatureUserLoading } from 'src/app/state/selectors/user.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public isLoading: Observable<boolean> = new Observable<boolean>();

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.isLoading = this.store.select(selectFeatureUserLoading);
    this.store.dispatch(userLoad());
  }
}
