import { Address } from './address';

export interface Vendor {
  vendorId?: number; // Equivalent to VendorId
  name: string;
  description?: string; // Optional fields based on [Required] attribute in C#
  phoneNumber?: string;
  countryCode?: string;
  contactPersonName?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  servicesProvided?: string; // Corrected typo from "ServicesProviced"
  contactPersonNumber?: string;
  email?: string;
  website?: string;
}
