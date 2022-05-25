import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-content-admin',
  templateUrl: './content-admin.component.html',
  styleUrls: ['./content-admin.component.scss'],
})
export class ContentAdminComponent {
  @Input() public title!: string;
  @Input() public link!: string;
}
