import cardImage from "../assets/image/cardImage.jpg";
import riderPic from "../assets/image/riderPic.svg";
import documentOne from "../assets/image/documentOne.svg";
import green from "../assets/image/green.jpeg";
import orange from "../assets/image/orange.jpeg";
import blue from "../assets/image/blue.jpeg";
import documentTwo from "../assets/image/documentTwo.svg";
import WidgetsIcon from "@mui/icons-material/Widgets";

export const innerNav = [
  {
    id: 32,
    icon: WidgetsIcon,
    value: "dashboard",
    color: "#BBAC69",
    borderColor: "#BBAC69",
    initials: "GE",
    name: "General Administration",
    route: "/dashboard",
    navItems: [
      {
        id: 16,
        name: "Dashboard",
        value: "dashboard",
        route: "/dashboard/overview",
      },
      {
        id: 17,
        name: "All Users",
        value: "dashboard",
        route: "/dashboard/users",
      },
      {
        id: 18,
        name: "Transactions",
        value: "dashboard",
        route: "/dashboard/transactions",
      },
      {
        id: 19,
        name: "Proposals",
        value: "dashboard",
        route: "/dashboard/proposals",
      },
      {
        id: 20,
        name: "Withdrawal",
        value: "dashboard",
        route: "/dashboard/withdrawal",
      },

      {
        id: 21,
        name: "Media",
        value: "dashboard",
        route: "/dashboard/media",
      },

      {
        id: 22,
        name: "Audit Trail",
        value: "dashboard",
        route: "/dashboard/audit",
      },
    ],
  },
  {
    id: 33,
    icon: WidgetsIcon,
    value: "flip",
    color: "#49D3BA",
    borderColor: "#49D3BA",
    initials: "FP",
    name: "Flip",
    route: "/flip",
    navItems: [
      {
        id: 23,
        name: "Merchants",
        value: "flip",
        route: "/flip/merchants",
      },
      {
        id: 24,
        name: "Orders",
        value: "flip",
        route: "/flip/orders",
      },
      {
        id: 25,
        name: "Consumers",
        value: "flip",
        route: "/flip/consumers",
      },

      {
        id: 26,
        name: "Products",
        value: "flip",
        route: "/flip/products",
      },
      {
        id: 27,
        name: "Services",
        value: "flip",
        route: "/flip/services",
      },
      {
        id: 28,
        name: "Job Posting",
        value: "flip",
        route: "/flip/jobs",
      },
    ],
  },
  {
    id: 34,
    icon: WidgetsIcon,
    value: "cue",
    color: "#0195FF",
    borderColor: "#0195FF",
    initials: "CU",
    name: "Cue",
    route: "/cue",
    navItems: [
      {
        id: 29,
        name: "Trips",
        value: "cue",
        route: "/cue/trips",
      },

      {
        id: 30,
        name: "Drivers",
        value: "cue",
        route: "/cue/drivers",
      },
      {
        id: 31,
        name: "Riders",
        value: "cue",
        route: "/cue/riders",
      },
      {
        id: 31,
        name: "SOS Alerts",
        value: "cue",
        route: "/cue/SOS",
      },
    ],
  },

  // {
  //   id: 4,
  //   icon: WidgetsIcon,
  //   value: "fourth",
  //   color: "rgba(17, 22, 59, .8)",
  //   borderColor: "rgba(17, 22, 59, .4)",
  //   initials: "PI",
  //   name: "Payment Interface",
  //   route: "/payment",
  // },
];
export const outerNav = [
  {
    id: 1,
    name: "Dashboard",
    value: "dashboard",
    route: "/dashboard/overview",
  },
  {
    id: 2,
    name: "All Users",
    value: "dashboard",
    route: "/dashboard/users",
  },
  {
    id: 3,
    name: "Transactions",
    value: "dashboard",
    route: "/dashboard/transactions",
  },
  {
    id: 4,
    name: "Proposals",
    value: "dashboard",
    route: "/dashboard/proposals",
  },
  {
    id: 5,
    name: "Withdrawal",
    value: "dashboard",
    route: "/dashboard/withdrawal",
  },

  {
    id: 6,
    name: "Media",
    value: "dashboard",
    route: "/dashboard/media",
  },

  {
    id: 7,
    name: "Audit Trail",
    value: "dashboard",
    route: "/dashboard/audit",
  },
  {
    id: 8,
    name: "Merchants",
    value: "flip",
    route: "/flip/merchants",
  },
  {
    id: 9,
    name: "Orders",
    value: "flip",
    route: "/flip/orders",
  },
  {
    id: 19,
    name: "Consumers",
    value: "flip",
    route: "/flip/consumers",
  },

  {
    id: 10,
    name: "Products",
    value: "flip",
    route: "/flip/products",
  },
  {
    id: 11,
    name: "Services",
    value: "flip",
    route: "/flip/services",
  },
  {
    id: 12,
    name: "Job Posting",
    value: "flip",
    route: "/flip/jobs",
  },

  {
    id: 13,
    name: "Drivers",
    value: "cue",
    route: "/cue/drivers",
  },
  {
    id: 14,
    name: "Trips",
    value: "cue",
    route: "/cue/trips",
  },
  {
    id: 15,
    name: "Riders",
    value: "cue",
    route: "/cue/riders",
  },
  {
    id: 16,
    name: "SOS Alert",
    value: "cue",
    route: "/cue/SOS",
  },

  // {
  //   id: 87,
  //   name: "Audit Trail",
  //   value: "cue",
  //   route: "/cue/audit",
  // },
];

export const bottomNav = [
  {
    id: 1,
    name: "SETTINGS",
  },
  {
    id: 2,
    name: "LOGOUT",
  },
];
export const tableLoad = [
  { region: "Anom", amount: 19 },
  { region: "Megha", amount: 19 },
  { region: "Subham", amount: 25 },
  { region: "Anom", amount: 19 },
  { region: "Megha", amount: 19 },
  { region: "Subham", amount: 25 },
];
export const supportingDocument = [
  {
    id: "1",
    img: documentOne,
    name: "Operating License",
    uploaded: "Uploaded May 2, 2022",
  },
  {
    id: "2",
    img: documentTwo,
    name: "Premise License",
    uploaded: "Uploaded April 17, 2022",
  },
];
export const ridersFeedback = [
  {
    id: "1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo lobortis cras nulla.dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet ",
    name: "Sanusi Danladi",
    email: "Sansus@gmail.com",
  },
  {
    id: "2",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo lobortis cras nulla.dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet ",
    name: "Sanusi Danladi",
    email: "Sansus@gmail.com",
  },
];
export const tripHistory = [
  {
    id: "1",
    distance: "80 km",
    pickupLocation: "22 Akintaye Avenue Lekki",
    dropLocation: "48 Shoguyi Crescent, Victoria Island",
    rider: {
      name: "Ogbonje Marcus",
      email: "ogbonjemarc@gmail.com",
      status: "In transit",
      profile: riderPic,
    },
  },
  {
    id: "2",
    distance: "80 km",
    pickupLocation: "22 Akintaye Avenue Lekki",
    dropLocation: "48 Shoguyi Crescent, Victoria Island",
    rider: {
      name: "Ogbonje Marcus",
      email: "ogbonjemarc@gmail.com",
      status: "Completed",
      profile: riderPic,
    },
  },
];
export const trackRide = [
  {
    name: "Booking Confirmed",
    address: "25B Jakande Street, Ojota, Lagos",
    duration: "25min",
    distance: "10km",
    time: "03:10pm",
  },
  {
    name: "Trip Started",
    address: "25B Jakande Street, Ojota, Lagos",

    time: "03:14pm",
  },
  {
    name: "Trip Cancelled",
    address: "25B Jakande Street, Ojota, Lagos",

    time: "03:15pm",
  },
  {
    name: "Trip Completed",
    address: "25B Jakande Street, Ojota, Lagos",

    time: "03:55pm",
  },
];
export const driver = [
  {
    id: "1873663",
    dateJoined: "2022-09-012T13:53:50.494Z",
    driverName: "Thomas Eze",
    emailAddress: "thomas@gmail.com",
    accountStatus: "Unverified",
    tripStatus: "Inactive",
    gender: "Male",
  },
  {
    id: "187363",
    dateJoined: "2022-09-012T13:53:50.494Z",
    driverName: "Thomas Eze",
    emailAddress: "thomas@gmail.com",
    accountStatus: "Unverified",
    tripStatus: "Inactive",
    gender: "Male",
  },
  {
    id: "187366",
    dateJoined: "2022-09-012T13:53:50.494Z",
    driverName: "Thomas Eze",
    emailAddress: "thomas@gmail.com",
    accountStatus: "Unverified",
    tripStatus: "Inactive",
    gender: "Male",
  },
];
export const request = [
  {
    withdrawalId: "1873663",
    merchant: "Thomas Eze",
    purpose: "Unverified",
    amountRequested: "30000",
  },
  {
    withdrawalId: "1366377",
    merchant: "Bimbo Ade",
    purpose: "Unverified",
    amountRequested: "26000",
  },
  {
    withdrawalId: "7893663",
    merchant: "Hassan Abdullahi",
    purpose: "Unverified",
    amountRequested: "4000",
  },
];
export const delivery = [
  { id: 0, name: null },
  { id: 1, name: "Yes" },
  { id: 2, name: "No" },
];
export const role = [
  { id: 1, name: "" },
  { id: 2, name: "consumer" },
  { id: 3, name: "merchant" },
  { id: 4, name: "rider" },
  { id: 5, name: "driver" },
];
export const productLevel = [
  { id: 1, name: "" },
  { id: 2, name: "Beginner" },
  { id: 3, name: "Intermediate" },
  { id: 4, name: "expert" },
];
export const bool = [
  { id: 0, name: "Yes" },
  { id: 1, name: "No" },
];
export const negotiable = [
  { id: 1, name: "Yes" },
  { id: 0, name: "No" },
];
export const gender = [
  { id: 1, name: "" },
  { id: 2, name: "Female" },
  { id: 3, name: "Male" },
];

export const category = [
  { id: 1, name: "" },
  { id: 2, name: "electronics" },
  { id: 3, name: "Car Dealership" },
  { id: 4, name: "Beauty Products" },
];
export const merchantType = [
  { id: 1, name: "" },
  { id: 2, name: "business" },
  { id: 3, name: "personal" },
];
export const applicationType = [
  { id: 1, name: "" },
  { id: 2, name: "flip" },
  { id: 3, name: "cue" },
];
