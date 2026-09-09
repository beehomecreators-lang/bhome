export const PHONE = "+916381895472";
export const PHONE_DISPLAY = "+91 63818 95472";
export const EMAIL = "beehomecreators@gmail.com";
export const ADDRESS = ["49 Madhavan Salai,", "K.K. Nagar, Trichy - 620021"];
export const INSTAGRAM_URL =
  "https://www.instagram.com/beehomecreators?igsh=cWxiMTd6OGtoeDZ4";
export const FACEBOOK_URL = "https://www.facebook.com/share/19ANeW5idu/";
export const COMPLIANCE_TEXT =
  "DTCP APPROVED PLOTS AND RERA REGISTERED PROJECT";

export const NAV_LINKS = [
  { label: "Our projects", href: "#projects" },
  { label: "Why choose us", href: "#why-us" },
  { label: "Our team", href: "#team" },
  { label: "Contact", href: "#contact" },
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

export const projects: Project[] = [
  {
    id: "sre-vasantham-avenue",
    name: "Vasantham Avenue",
    type: "Residential Plots",
    price: "₹777",
    location: "Vasantham Avenue",
    mapsUrl: "https://maps.app.goo.gl/Ugq7GX4cSrfxzTJt8",
    image: "/images/vasantham avenue/Gemini_Generated_Image_ahvqlzahvqlzahvq.png",
    images: [
      "/images/vasantham avenue/Gemini_Generated_Image_ahvqlzahvqlzahvq.png",
      "/images/vasantham avenue/Gemini_Generated_Image_x72vp6x72vp6x72v.png",
      "/images/vasantham avenue/plot-view-1.jpg",
      "/images/vasantham avenue/plot-view-2.jpg",
      "/images/vasantham avenue/plot-view-3.jpg",
      "/images/vasantham avenue/plot-view-4.jpg",
      "/images/vasantham avenue/plot-view-5.jpg",
    ],
    whatsappMessage:
      "Hello Bee Home Creators, I am interested in Vasantham Avenue. I would like to know more details about the plots.",
    offers: ["Free registration", "Free 1 gram gold"],
    landmarks: ["Alampatti Pudur nearby", "Trichy to Dindigul Bypass"],
  },
  {
    id: "kungumam-nagar",
    name: "Kungumam Nagar",
    type: "Residential Plots",
    price: "₹360",
    location: "Kungumam Nagar",
    mapsUrl: "https://maps.app.goo.gl/UzvvgJTmCTJecBH89",
    image: "/images/kungumam nagar/Gemini_Generated_Image_824c95824c95824c.png",
    images: [
      "/images/kungumam nagar/Gemini_Generated_Image_824c95824c95824c.png",
      "/images/kungumam nagar/Gemini_Generated_Image_gnnnqhgnnnqhgnnn.png",
      "/images/kungumam nagar/plot-real-view-1.jpg",
      "/images/kungumam nagar/plot-real-view-2.jpg",
      "/images/kungumam nagar/plot-real-view-3.jpg",
      "/images/kungumam nagar/plot-real-view-4.jpg",
      "/images/kungumam nagar/plot-real-view-5.jpg",
    ],
    whatsappMessage:
      "Hello Bee Home Creators, I am interested in Kungumam Nagar. I would like to know more details about the plots.",
    offers: ["Free registration", "1 gram gold"],
    landmarks: ["TNPL nearby", "Trichy to Dindigul Bypass"],
  },
  {
    id: "sri-vellaiyammal-garden-69",
    name: "Sri Vellaiyammal Garden - 69",
    type: "Residential Plots",
    price: "₹3333",
    location: "Madakkudi",
    mapsUrl: "https://maps.app.goo.gl/86xqX8JYDwZU9hSw8",
    image: "/images/Sri vellaiyammal garden-69/1000035270.jpg",
    images: [
      "/images/Sri vellaiyammal garden-69/1000035270.jpg",
    ],
    whatsappMessage:
      "Hello Bee Home Creators, I am interested in Sri Vellaiyammal Garden - 69. I would like to know more details about the plots.",
    landmarks: [
      "Near Trichy tollgate",
      "Nearby school facility",
      "Nearby hospital facility",
      "Trichy to Chennai Bypass, Chidambaram Highway",
    ],
  },
  {
    id: "sathya-nagar",
    name: "Sathya Nagar",
    type: "Premium Plots",
    price: "₹555",
    location: "Sathya Nagar",
    mapsUrl: "",
    image: "/images/sathya nagar/Gemini_Generated_Image_ezu2muezu2muezu2.png",
    images: [
      "/images/sathya nagar/Gemini_Generated_Image_ezu2muezu2muezu2.png",
      "/images/sathya nagar/1000038395.jpg",
      "/images/sathya nagar/1000038394.jpg",
      "/images/sathya nagar/1000038397.jpg",
      "/images/sathya nagar/1000038393.jpg"
    ],
    whatsappMessage:
      "Hello Bee Home Creators, I am interested in Sathya Nagar. I would like to know more details about the plots.",
    offers: ["Special opening price", "Free patta", "Free documentation"],
    landmarks: [
      "8 KM from JJ College",
      "3.5 KM from Inamkulathur",
      "7 KM from Viralimalai",
    ],
  },
];

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  mobile: string;
}

export const teamMembers: TeamMember[] = [
  { id: "EMP-001", name: "Ashok. A", designation: "Marketing Manager", mobile: "9363131514" },
  { id: "EMP-002", name: "Hema", designation: "Marketing Executive", mobile: "9095094896" },
  { id: "EMP-003", name: "P.Ambiga", designation: "Marketing Executive", mobile: "7010309238" },
  { id: "EMP-004", name: "F. Akthar", designation: "Tele Caller", mobile: "9791450167" },
  { id: "EMP-005", name: "S. Nathiya Selvam", designation: "Marketing Executive", mobile: "8190916276" },
  { id: "EMP-006", name: "B. Shyamala", designation: "Marketing Manager", mobile: "8838382436" },
  { id: "EMP-007", name: "Lavanya", designation: "Tele Caller", mobile: "6379461121" },
  { id: "EMP-008", name: "Subash", designation: "Marketing Executive", mobile: "7358541909" },
  { id: "EMP-009", name: "R. Shifana", designation: "Tele Caller", mobile: "9363195680" },
  { id: "EMP-010", name: "X. Jeswin", designation: "Digital Marketing Manager", mobile: "9600560696" },
  { id: "EMP-011", name: "Leena Renu", designation: "Admin", mobile: "6381895472" },
  { id: "EMP-012", name: "Amala", designation: "Operator", mobile: "6381905169" },
];
