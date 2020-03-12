import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@core/material/material.module';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('346054450113-nb0l4atr9h6r9s3rmfli7u75ep5pl3be')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
})
export class LoginModule { }
