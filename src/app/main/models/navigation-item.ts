import { BRAND_NAME } from '../../shared/models/brand';

/**
 * Interface for defining a navigation item within the application.
 * Each navigation item includes a name, icon, route, and other properties
 * that describe how the item should be displayed and where it should navigate.
 *
 * @property {string} name - The display name of the navigation item.
 * @property {BRAND_NAME[] | null} brands - The associated brands with this navigation item. Null if applicable to all brands.
 * @property {string | null} [icon] - The icon for the navigation item. Optional, can be null.
 * @property {string | null} [route] - The route for the navigation item in the application. Optional, can be null.
 * @property {string[] | null} [permission] - The user roles that are permitted to view this navigation item. Optional, can be null.
 * @property {INavigationItem[] | null} [children] - Child navigation items, if any. Optional, can be null.
 */
export interface INavigationItem {
  name: string;
  brands: BRAND_NAME[] | null;
  icon?: string | null;
  route?: string | null;
  permission?: string[] | null;
  children?: INavigationItem[] | null;
}
