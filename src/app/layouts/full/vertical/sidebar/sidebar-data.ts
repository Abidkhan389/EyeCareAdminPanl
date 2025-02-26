import { ROLES } from 'src/app/shared/models/ROLES';
import { NavItem } from './nav-item/nav-item';

///MAIN ROUTER ITEMS ARRAY
export const navItems: NavItem[] = [
  {
    navCap: '',
  },
  {
    displayName: 'Dashboard',
    iconName: 'mdi:view-dashboard-outline', // Home icon from Material Design Icons
    route: '/starter',
    allowedRoles: [ROLES.SuperAdmin, ROLES.Admin],
  },
  {
    displayName: 'Finance Management',
    iconName: 'mdi:wallet-outline', // Wallet icon for Billing
    route: '/billing',
    allowedRoles: [ROLES.SuperAdmin, ROLES.Admin,ROLES.Finance],
  },
  {
    displayName: 'Classroom',
    iconName: 'mdi:school-outline', // School icon for Classroom
    route: '/classroom',
    allowedRoles: [ROLES.SuperAdmin, ROLES.Admin,ROLES.Teacher],
  },
  {
    displayName: 'Employee',
    iconName: 'mdi:account-outline', // User icon for Employee
    route: '/employee',
    allowedRoles: [ROLES.SuperAdmin, ROLES.Admin],
  },
  {
    displayName: 'Learning Management',
    iconName: 'mdi:book-open-outline', // Book icon for Learning Management
    route: '/learning',
    allowedRoles: [ROLES.SuperAdmin, ROLES.Admin, ROLES.Teacher],
  },
  {
    displayName: 'Parent',
    iconName: 'mdi:account-heart-outline', // Heart icon for Parent
    route: '/parent',
    allowedRoles: [ROLES.SuperAdmin, ROLES.Admin,ROLES.StudentParent],
  },
  {
    displayName: 'Route',
    iconName: 'mdi:road-variant', // Road icon for Route
    route: '/route',
    allowedRoles: [ROLES.SuperAdmin, ROLES.Admin, ROLES.Driver],
  },
  {
    displayName: 'Setting',
    iconName: 'mdi:cog-outline', // Settings icon
    route: '/AppSetting',
    allowedRoles: [ROLES.SuperAdmin, ROLES.Admin],
  },
  {
    displayName: 'Student',
    iconName: 'mdi:school', // School icon for Student
    route: '/student',
    allowedRoles: [ROLES.SuperAdmin, ROLES.Admin,ROLES.Student],
  },
  {
    displayName: 'Vendors',
    iconName: 'mdi:store-outline', // Store icon for Vendors
    route: '/vendor',
    allowedRoles: [ROLES.SuperAdmin, ROLES.Admin],
  },
  {
    displayName: 'User Management',
    iconName: 'mdi:cog-outline', // Store icon for Vendors
    route: '/user',
    allowedRoles: [ROLES.SuperAdmin, ROLES.Admin],
  },
];
