import { BRAND_NAME } from '../../shared/models/brand';
import { INavigationItem } from './navigation-item';

/**
 * APP_NAVIGATION is an array of navigation items used in the application's main navigation.
 * Each item describes the navigation properties for a specific part of the application,
 * including the associated route, display name, icon, supported brands, and required user roles.
 *
 * @type {INavigationItem[]}
 */
export const APP_NAVIGATION: INavigationItem[] = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    route: 'dashboard',
    brands: [BRAND_NAME.BB],
    permission: null,
  },
  {
    name: 'Students',
    icon: 'school',
    route: 'student',
    brands: [BRAND_NAME.BB],
    permission: null,
  },
  {
    name: 'Employees',
    icon: 'badge',
    route: 'employee',
    brands: [BRAND_NAME.BB],
    permission: null,
  },
  {
    name: 'Classrooms',
    icon: 'menu_book',
    route: 'classroom',
    brands: [BRAND_NAME.BB],
    permission: null,
  },
  {
    name: 'Finance Management',
    icon: 'paid',
    route: 'billing',
    brands: [BRAND_NAME.BB],
    permission: null,
  },
  {
    name: 'Vendors',
    icon: 'source_environment',
    route: 'vendor',
    brands: [BRAND_NAME.BB],
    permission: null,
  },
  {
    name: 'Routes',
    icon: 'departure_board',
    route: 'route',
    brands: [BRAND_NAME.BB],
    permission: null,
  },
  {
    name: 'Settings',
    icon: 'settings',
    route: 'Settings',
    brands: [BRAND_NAME.BB],
    permission: null,
  },
  {
    name: 'AppSetting',
    icon: 'AppSetting',
    route: 'AppSetting',
    brands: [BRAND_NAME.BB],
    permission: null,
  },
  {
    name: 'Parent Dashboard',
    icon: 'supervisor_account',
    route: 'parent',
    brands: [BRAND_NAME.BB],
    permission: null,
  },
  {
    name: 'Learning Mgmt',
    icon: 'quiz',
    route: 'exam',
    brands: [BRAND_NAME.BB],
    permission: null,
  },
];
