import adminData from "./adminData.json";

export const PHONE = adminData.site.phone;
export const PHONE_DISPLAY = adminData.site.phoneDisplay;
export const EMAIL = adminData.site.email;
export const ADDRESS = adminData.site.address;
export const INSTAGRAM_URL = adminData.site.instagramUrl;
export const FACEBOOK_URL = adminData.site.facebookUrl;
export const COMPLIANCE_TEXT = adminData.site.complianceText;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/#projects" },
  { label: "Our Team", href: "/team" },
  { label: "Contact", href: "/#contact" },
];

export interface Project {
  id: string;
  name: string;
  type: string;
  price: string;
  location: string;
  mapsUrl: string;
  image: string;
  images: string[];
  whatsappMessage: string;
  offers?: string[];
  landmarks: string[];
}

export const projects: Project[] = adminData.projects;

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  mobile: string;
}

export const teamMembers: TeamMember[] = adminData.teamMembers;
