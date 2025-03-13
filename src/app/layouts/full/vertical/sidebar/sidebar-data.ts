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
    allowedRoles: [ ROLES.SuperAdmin,ROLES.Admin,ROLES.Rerecptionist,ROLES.Doctor],
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
    iconName: 'mdi:pill-multiple', // Store icon for medicine type
    route: '/medicineType',
    allowedRoles: [ROLES.SuperAdmin, ROLES.Admin,ROLES.Doctor],
  },
  {
    displayName: 'Medicine  Management',
    iconName: 'mdi:pill', // Store icon for medicine type
    route: '/medicine',
    allowedRoles: [ROLES.SuperAdmin, ROLES.Admin,ROLES.Doctor],
  },
  {
    displayName: 'Patient Appointment',
    iconName: 'mdi:calendar-check', // Store icon for medicine type
    route: '/patientAppointment',
    allowedRoles: [ROLES.SuperAdmin, ROLES.Doctor,ROLES.Rerecptionist],
  },
  {
    displayName: 'Doctor Availability',
    iconName: 'mdi:calendar-clock', // Represents scheduling and availability
    route: '/doctorAvailability',
    allowedRoles: [ROLES.SuperAdmin,ROLES.Admin, ROLES.Doctor],
  },
  {
    displayName: 'Patient CheckUp',
    iconName: 'mdi:calendar-clock', // Represents scheduling and availability
    route: '/patientCheckupDescription',
    allowedRoles: [ROLES.SuperAdmin,ROLES.Admin, ROLES.Doctor,ROLES.Rerecptionist],
  },
];
