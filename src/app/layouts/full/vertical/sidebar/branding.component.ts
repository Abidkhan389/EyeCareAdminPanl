import { Component, EventEmitter, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [RouterModule],
  styles: `
  .d-flex{
    display: flex;
    margin-bottom: -30px;
  }
  .brand-p{
    font-weight: 900;
    font-size: 15pt;
    color: #635bff;
    margin-top: 45px
  }
  .brand-sp{
    font-size: 7pt;
    font-weight: bold;
    position: relative;
    top: -7px;
    left: 42%;
    color: darkorange;
    margin-left: 43px;
  }
  `,
  template: `
    <div class="branding d-flex">
      <a [routerLink]="['/']">
        <img
          [src]="this.logoSrc"
          class="align-middle m-2 branding-logo"
          alt="logo"
        />
      </a>
      @if(!this.options.sidenavCollapsed){
      <p class="brand-p">Eye Care</p>
      }
    </div>
    @if(!this.options.sidenavCollapsed){
    <span class="brand-sp">EyeCare System</span>
    }
  `,
})
export class BrandingComponent {
  options = this.settings.getOptions();
  logoSrc = './assets/LogoWithBrand/eye-care-logo.jpg';
  constructor(private settings: CoreService) {
    this.settings.notify.subscribe((x) => {
      if (x['theme'] === 'dark') {
        this.logoSrc = './assets/LogoWithBrand/logo_dark.png';
      } else {
        this.logoSrc = './assets/LogoWithBrand/eye-care-logo.jpg';
      }
    });
  }
}
