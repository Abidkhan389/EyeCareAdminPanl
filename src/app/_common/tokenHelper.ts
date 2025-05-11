import { jwtDecode } from 'jwt-decode';
import { AuthenticatedUser } from '../interfaces/IAuthenticatedUser';
import { IJwtToken } from '../interfaces/IJwtToken';
const APIPaths = {
    accessTokenKey: 'EyeCare'
}
export class TokenHelper {

    public static getAccessToken(): string {
        return localStorage.getItem(APIPaths.accessTokenKey) ?? '';
    }
    public static setAccessToken(token: string): void {
        return localStorage.setItem(APIPaths.accessTokenKey, token);
    }

    public static setToken(token: any): void {
        this.setAccessToken(token);
        localStorage.setItem("image", token.img);
    }

    public static removeAccessToken(): void {
        return localStorage.removeItem(APIPaths.accessTokenKey);
    }

    public static getBearerToken() {
        const token = localStorage.getItem(APIPaths.accessTokenKey);
        return {
            Authorization: token ? 'Bearer ' + token : null
        };
    }
    public static parseUserToken(): AuthenticatedUser {
        let token = this.getAccessToken();
        const user: AuthenticatedUser = { authenticated: false, cultureName: null, displayName: null, email: null, name: null, username: null, roles: [], verified: false, image: null, fullName: null, rights: null, userRightsString: null, campuses: [], businessUnit: null ,role:null};
        try {
            if (token) {
                const decodedToken: IJwtToken = jwtDecode(token);

                if (!user.authenticated)
                    user.authenticated = true;
                debugger;
                let name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
                let roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                let sid = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameIdentifier'];
                let timeZoneId = decodedToken['TimeZoneId'];
                let image = decodedToken['Image'];
                let fullName = decodedToken['FullName'];
                let userRightsString = (decodedToken as any)['Rights'];
                let businessUnit = (decodedToken as any)['BusinessUnit'];
                user.role=roles;
                user.cultureName = decodedToken['CultureName'];
                //user.displayName = name ? name[1] : null;
                 if (Array.isArray(name)) {
                    user.displayName = name[0]; // Take the first item from the array if it's an array
                } else if (typeof name === 'string') {
                    user.displayName = name; // Use the string directly if it's not an array
                }
                user.email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/email'] || null;
                user.name = name[1];
                user.roles = roles ? (Array.isArray(roles) ? roles.filter(Boolean) : [roles]) : null;
                user.verified = (decodedToken as any)['Verified'] === 'true' ? true : false;
                user.exp = new Date(decodedToken.exp * 1000);
                user.userId = sid;
                user.timeZoneId = timeZoneId;
                user.image = image;
                user.fullName = fullName;
                user.userRightsString = userRightsString;
                user.businessUnit = businessUnit;
            }

        } catch (error) {
            console.log(error);
        }
        return user;
    }
    public static getUserName() {

        return this.parseUserToken();
    }

    public static isTokenCurrent(value: string | AuthenticatedUser) {

        let user: AuthenticatedUser | null = null;

        if (typeof value === 'string') {
            user = TokenHelper.parseUserToken();
        } else {
            user = value;
        }
        if (!user)
            return null;
        else if (!user.authenticated)
            return false;
        else
            return user.exp && user.exp > new Date();
    }

}
