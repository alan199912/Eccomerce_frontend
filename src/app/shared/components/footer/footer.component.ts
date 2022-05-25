import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public year = new Date().getFullYear();

  constructor() {}

  ngOnInit(): void {}

  public openPortfolio() {
    window.open('/assets/PDF/portafolio COSMOgroup.pdf', '_blank');
  }
}
