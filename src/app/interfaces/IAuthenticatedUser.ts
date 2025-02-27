export interface AuthenticatedUser {
    authenticated: boolean;
    cultureName?: string | null;
    displayName?: string | null;
    email?: string | null;
    enabled?: boolean | null;
    name?: string | null;
    roles?: string[] | null;
    username: string | null;
    verified?: boolean;
    exp?: Date;
    userId?: string | null;
    timeZoneId?: string;
    image ?: string | null;
    fullName?: string | null;
    rights?: UserRights | null;
    userRightsString?: string | null;
    campuses: any[];
    businessUnit?:string | null;
    role:any;
}
export interface UserRights {
    BusinessUnit: General;
    Region: General;
}
export interface General {
    Id: string;
    Text: string;
}