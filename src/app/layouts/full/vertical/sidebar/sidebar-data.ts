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
    displayName: 'Classroom Testing',
    iconName: 'mdi:school-outline', // School icon for Classroom
    route: '/classroom',
    allowedRoles: [ROLES.SuperAdmin, ROLES.Admin],
  },
  
  {
    displayName: 'Setting',
    iconName: 'mdi:cog-outline', // Settings icon
    route: '/AppSetting',
    allowedRoles: [ROLES.SuperAdmin, ROLES.Admin],
  },
 
  {
    displayName: 'User Management',
    iconName: 'mdi:cog-outline', // Store icon for Vendors
    route: '/user',
    allowedRoles: [ROLES.SuperAdmin, ROLES.Admin],
  },
  {
    displayName: 'Medicine Type Management',
    iconName: 'mdi:cog-outline', // Store icon for medicine type
    route: '/medicineType',
    allowedRoles: [ROLES.SuperAdmin, ROLES.Admin],
  },
  {
    displayName: 'Medicine  Management',
    iconName: 'mdi:cog-outline', // Store icon for medicine type
    route: '/medicine',
    allowedRoles: [ROLES.SuperAdmin, ROLES.Admin],
  },
];
