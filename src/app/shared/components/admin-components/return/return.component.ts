import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss'],
})
export class ReturnComponent {
  constructor(private readonly location: Location) {}

  public locationBack(): void {
    this.location.back();
  }
}
