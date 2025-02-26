import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { MatDialog } from '@angular/material/dialog';
import { navItems } from '../sidebar/sidebar-data';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { Route, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';

interface notifications {
  id: number;
  icon: string;
  color: string;
  title: string;
  time: string;
  subtitle: string;
}

interface profiledd {
  id: number;
  title: string;
  link: string;
  queryParams?: { [key: string]: string }; // Add this line
  new?: boolean;
}

interface apps {
  id: number;
  icon: string;
  color: string;
  title: string;
  subtitle: string;
  link: string;
}
interface loginUserDetail {
  userFullName: string;
  userRole: string;
  userProfilePicturePath: string;
  userEmail: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
    TranslateModule
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();
  userDetail: loginUserDetail = {
    userFullName: '',
    userRole: '',
    userProfilePicturePath: '',
    userEmail: '',
  };

  showFiller = false;

  public selectedLanguage: any = {
    language: 'English',
    code: 'en',
    type: 'US',
    icon: '/assets/images/flag/icon-flag-en.svg',
  };

  public languages: any[] = [
    {
      language: 'English',
      code: 'en',
      type: 'US',
      icon: '/assets/images/flag/icon-flag-en.svg',
    },
    {
      language: 'Arabic',
      code: 'ar',
      icon: '/assets/images/flag/icon-flag-es.svg',
    },
    // {
    //   language: 'Español',
    //   code: 'es',
    //   icon: '/assets/images/flag/icon-flag-es.svg',
    // },
    // {
    //   language: 'Français',
    //   code: 'fr',
    //   icon: '/assets/images/flag/icon-flag-fr.svg',
    // },
    // {
    //   language: 'German',
    //   code: 'de',
    //   icon: '/assets/images/flag/icon-flag-de.svg',
    // },
  ];

  constructor(
    private settings: CoreService,
    private vsidenav: CoreService,
    public dialog: MatDialog,
    private translate: TranslateService,
    private router: Router
  ) {
    translate.setDefaultLang('en');
  }
  trackByTitle(index: number, profile: profiledd): string {
    return profile.title;
  }
  ngOnInit(): void {
    this.userDetail.userFullName =
      localStorage.getItem('firstName') +
      ' ' +
      localStorage.getItem('lastName');
    this.userDetail.userEmail = localStorage.getItem('email') ?? '';
    this.userDetail.userRole = localStorage.getItem('roles') ?? '';
    const profileImage = localStorage.getItem('profilePicture');
    this.userDetail.userProfilePicturePath = profileImage
      ? this.adjustProfileImgUrl(profileImage)
      : '/assets/images/profile/user-1.jpg';
  }

  adjustProfileImgUrl(profileImage: string): string {
    if (profileImage.includes('http') || profileImage.includes('https')) {
      return profileImage;
    }
    return `/UploadedFiles/${profileImage}`;
  }

  options = this.settings.getOptions();

  setDark() {
    this.settings.toggleTheme();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AppSearchDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  changeLanguage(lang: any): void {
    this.translate.use(lang.code);
    this.selectedLanguage = lang;
  }

  notifications: notifications[] = [
    {
      id: 1,
      icon: 'a-b-2',
      color: 'primary',
      time: '8:30 AM',
      title: 'Launch Admin',
      subtitle: 'Just see the my new admin!',
    },
    {
      id: 2,
      icon: 'calendar',
      color: 'accent',
      time: '8:21 AM',
      title: 'Event today',
      subtitle: 'Just a reminder that you have event',
    },
    {
      id: 3,
      icon: 'settings',
      color: 'warning',
      time: '8:05 AM',
      title: 'Settings',
      subtitle: 'You can customize this template',
    },
    {
      id: 4,
      icon: 'a-b-2',
      color: 'success',
      time: '7:30 AM',
      title: 'Launch Templates',
      subtitle: 'Just see the my new admin!',
    },
    {
      id: 5,
      icon: 'exclamation-circle',
      color: 'error',
      time: '7:03 AM',
      title: 'Event tomorrow',
      subtitle: 'Just a reminder that you have event',
    },
  ];

  profiledd: profiledd[] = [
    {
      id: 1,
      title: 'My Profile',
      link: '/Profile',
      queryParams: { tab: 'profile' },
    },
    {
      id: 2,
      title: 'My Subscription',
      link: '/Profile',
      queryParams: { tab: 'subscription' },
    },
    {
      id: 3,
      title: 'My Invoice',
      new: true,
      link: '/Profile',
      queryParams: { tab: 'invoice' },
    },
    {
      id: 4,
      title: 'Account Settings',
      link: '/Profile',
      queryParams: { tab: 'security' },
    },
    {
      id: 5,
      title: 'Sign Out',
      link: '/authentication/logout',
    },
  ];

  apps: apps[] = [
    {
      id: 1,
      icon: 'solar:chat-line-line-duotone',
      color: 'primary',
      title: 'Chat Application',
      subtitle: 'Messages & Emails',
      link: '/',
    },
    {
      id: 2,
      icon: 'solar:checklist-minimalistic-line-duotone',
      color: 'accent',
      title: 'Todo App',
      subtitle: 'Completed task',
      link: '/',
    },
    {
      id: 3,
      icon: 'solar:bill-list-line-duotone',
      color: 'success',
      title: 'Invoice App',
      subtitle: 'Get latest invoice',
      link: '/',
    },
    {
      id: 4,
      icon: 'solar:calendar-line-duotone',
      color: 'error',
      title: 'Calendar App',
      subtitle: 'Get Dates',
      link: '/',
    },
    {
      id: 5,
      icon: 'solar:smartphone-2-line-duotone',
      color: 'warning',
      title: 'Contact Application',
      subtitle: '2 Unsaved Contacts',
      link: '/',
    },
    {
      id: 6,
      icon: 'solar:ticket-line-duotone',
      color: 'primary',
      title: 'Tickets App',
      subtitle: 'Create new ticket',
      link: '/',
    },
    {
      id: 7,
      icon: 'solar:letter-line-duotone',
      color: 'accent',
      title: 'Email App',
      subtitle: 'Get new emails',
      link: '/',
    },
    {
      id: 8,
      icon: 'solar:book-2-line-duotone',
      color: 'warning',
      title: 'Courses',
      subtitle: 'Create new course',
      link: '/',
    },
  ];

  onSignOut(profile: profiledd): void {
    if (profile.title === 'Sign Out') {
      localStorage.clear(); // Clear all localStorage items
      // Redirect to login page
      this.router.navigate(['/authentication/login']);
    }
  }
}

@Component({
  selector: 'search-dialog',
  standalone: true,
  imports: [RouterModule, MaterialModule, TablerIconsModule, FormsModule],
  templateUrl: 'search-dialog.component.html',
})
export class AppSearchDialogComponent {
  searchText: string = '';
  navItems = navItems;

  navItemsData = navItems.filter((navitem) => navitem.displayName);

  // filtered = this.navItemsData.find((obj) => {
  //   return obj.displayName == this.searchinput;
  // });
}
