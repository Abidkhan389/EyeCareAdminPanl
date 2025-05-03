export interface IJwtToken {
    aud: string,
    exp: number,
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/email': string,
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string[],
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string | string[];
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameIdentifier'?: string;  
    FullName:string,
    TimeZoneId:string;
    Image:string;
    CultureName:string;
    iss: string,
    nbf: number,
    sub: string
    }