import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppMatIconsModule } from './icons/app-mat-icons.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';

export const MATERIAL = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatDividerModule,
  MatMenuModule,
  MatCheckboxModule,
  MatTableModule,
  MatDialogModule,
  MatSelectModule,
  MatPaginatorModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatTreeModule,
  MatDatepickerModule,
  MatTabsModule,
  ScrollingModule,
  MatRadioModule,
  MatProgressBarModule,
  MatSnackBarModule,
  OverlayModule,
  MatProgressSpinnerModule,
  AppMatIconsModule,
  MatStepperModule,
  MatButtonToggleModule,
  MatBadgeModule,
  MatListModule,
  MatSortModule,
];

@NgModule({
  declarations: [],
  imports: [MATERIAL],
  exports: [MATERIAL],
})
export class MaterialModule {}
