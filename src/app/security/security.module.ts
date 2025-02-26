import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SecurityComponent],
  imports: [CommonModule, SecurityRoutingModule, MaterialModule, SharedModule],
})
export class SecurityModule {}
