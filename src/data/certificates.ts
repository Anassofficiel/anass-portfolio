const c1 = "/images/cert-image.png";
const c2 = "/images/cert-image-2.png";
const c3 = "/images/cert-image-3.png";
const c4 = "/images/cert-image-4.png";
const c5 = "/images/cert-image-5.png";
const c6 = "/images/cert-image-6.png";
const c7 = "/images/cert-image-7.png";
const c8 = "/images/cert-image-8.png";

export interface Certificate {
  title: string;
  issuer: string;
  instructor: string;
  year: string;
  date: string;
  hours: string;
  image: string;
  accent: string;
}

export const CERTIFICATES: Certificate[] = [
  {
    title: "The Complete HTML Course",
    issuer: "Udemy",
    instructor: "Web Coding",
    year: "2024",
    date: "9 November 2024",
    hours: "4 hours",
    image: c1,
    accent: "#E34F26",
  },
  {
    title: "CSS, Bootstrap And JavaScript And Python Stack Course",
    issuer: "Udemy",
    instructor: "Proper Dot Institute",
    year: "2025",
    date: "14 January 2025",
    hours: "7.5 hours",
    image: c2,
    accent: "#1572B6",
  },
  {
    title: "Learn Figma: UI/UX Design Masterclass From Beginner to Pro",
    issuer: "Udemy",
    instructor: "James Joab Soren, Hudson Dynamic Lab",
    year: "2025",
    date: "2 September 2025",
    hours: "4.5 hours",
    image: c3,
    accent: "#A259FF",
  },
  {
    title: "The Complete React Course",
    issuer: "Udemy",
    instructor: "Web Coding",
    year: "2024",
    date: "9 November 2024",
    hours: "4 hours",
    image: c4,
    accent: "#61DAFB",
  },
  {
    title: "The Complete Next.js Course",
    issuer: "Udemy",
    instructor: "Web Coding",
    year: "2024",
    date: "9 November 2024",
    hours: "4 hours",
    image: c5,
    accent: "#111827",
  },
  {
    title: "The Complete PostgreSQL Course",
    issuer: "Udemy",
    instructor: "Web Coding",
    year: "2024",
    date: "9 November 2024",
    hours: "4 hours",
    image: c6,
    accent: "#336791",
  },
  {
    title: "The Complete Laravel Course",
    issuer: "Udemy",
    instructor: "Web Coding",
    year: "2025",
    date: "9 November 2025",
    hours: "4 hours",
    image: c7,
    accent: "#FF2D20",
  },
  {
    title: "Learn MySQL - For Beginners",
    issuer: "Udemy",
    instructor: "YouAccel Training",
    year: "2025",
    date: "1 June 2025",
    hours: "1.5 hours",
    image: c8,
    accent: "#4479A1",
  },
];
