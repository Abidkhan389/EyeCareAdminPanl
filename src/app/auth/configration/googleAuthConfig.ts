// src/app/auth/auth.config.ts
import { AuthConfig } from 'angular-oauth2-oidc';

export const googleAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,

  redirectUri: window.location.origin + '/signin-google',
  clientId: '481801256993-jglad9jcvmv6dvu571p8493gff35mjqi.apps.googleusercontent.com', // Replace with your client ID
  scope: 'openid profile email',
  customQueryParams:{
    prompt: 'select_account',
  },
  showDebugInformation: true,
};
