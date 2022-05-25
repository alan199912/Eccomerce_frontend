import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({})
export class AppMatIconsModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.loadCustomIcons();
  }

  private loadCustomIcons(): void {
    this.matIconRegistry.addSvgIcon(
      'settings',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/cog-sharp.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'like',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/like.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'tray',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/icon-inbox.svg'
      )
    );
  }
}
