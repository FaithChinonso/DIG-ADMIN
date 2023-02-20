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
    id: 1,
    icon: WidgetsIcon,
    value: "dashboard",
    color: "rgba(225,225,225, .8)",
    borderColor: "rgba(225,225,225, .4)",
    initials: "GE",
    name: "General Administration",
    route: "/dashboard",
    navItems: [
      {
        id: 1,
        name: "Dashboard",
        value: "dashboard",
        route: "/dashboard",
      },

      {
        id: 2,
        name: "Media & Communications",
        value: "dashboard",
        route: "/dashboard/media",
      },
      {
        id: 3,
        name: "All Users",
        value: "dashboard",
        route: "/dashboard/users",
      },
      {
        id: 4,
        name: "Transactions",
        value: "dashboard",
        route: "/dashboard/transactions",
      },
      {
        id: 5,
        name: "Proposals",
        value: "dashboard",
        route: "/dashboard/proposals",
      },
      {
        id: 6,
        name: "Withdrawal",
        value: "dashboard",
        route: "/dashboard/withdrawal",
      },
      {
        id: 7,
        name: "Audit Trail",
        value: "dashboard",
        route: "/dashboard/audit",
      },
      {
        id: 8,
        name: "Settings",
        value: "dashboard",
        route: "/dashboard/settings",
      },
    ],
  },
  {
    id: 2,
    icon: WidgetsIcon,
    value: "flip",
    color: "rgba(180, 96, 133, .8)",
    borderColor: "rgba(180, 96, 133, .4)",
    initials: "FP",
    name: "Flip",
    route: "/flip",
    navItems: [
      {
        id: 1,
        name: "Consumers",
        value: "flip",
        route: "/flip/consumers",
      },
      {
        id: 2,
        name: "Orders",
        value: "flip",
        route: "/flip/orders",
      },

      {
        id: 3,
        name: "Products",
        value: "flip",
        route: "/flip/products",
      },
      {
        id: 4,
        name: "Services",
        value: "flip",
        route: "/flip/services",
      },
      {
        id: 5,
        name: "Job Posting",
        value: "flip",
        route: "/flip/jobs",
      },

      {
        id: 6,
        name: "Merchants",
        value: "flip",
        route: "/flip/merchants",
      },
    ],
  },
  {
    id: 3,
    icon: WidgetsIcon,
    value: "cue",
    color: "rgba(37, 82, 59, .8)",
    borderColor: "rgba(37, 82, 59, .4)",
    initials: "CU",
    name: "Cue",
    route: "/cue",
    navItems: [
      {
        id: 1,
        name: "Riders",
        value: "cue",
        route: "/cue/riders",
      },
      {
        id: 2,
        name: "Trips",
        value: "cue",
        route: "/cue/trips",
      },

      {
        id: 3,
        name: "Drivers",
        value: "cue",
        route: "/cue/drivers",
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
    route: "/dashboard",
  },

  {
    id: 2,
    name: "Media & Communications",
    value: "dashboard",
    route: "/dashboard/media",
  },
  {
    id: 3,
    name: "All Users",
    value: "dashboard",
    route: "/dashboard/users",
  },
  {
    id: 4,
    name: "Transactions",
    value: "dashboard",
    route: "/dashboard/transactions",
  },
  {
    id: 5,
    name: "Proposals",
    value: "dashboard",
    route: "/dashboard/proposals",
  },
  {
    id: 6,
    name: "Withdrawal",
    value: "dashboard",
    route: "/dashboard/withdrawal",
  },
  {
    id: 7,
    name: "Audit Trail",
    value: "dashboard",
    route: "/dashboard/audit",
  },
  {
    id: 8,
    name: "Settings",
    value: "dashboard",
    route: "/dashboard/settings",
  },
  {
    id: 9,
    name: "Consumers",
    value: "flip",
    route: "/flip/consumers",
  },
  {
    id: 10,
    name: "Orders",
    value: "flip",
    route: "/flip/orders",
  },

  {
    id: 11,
    name: "Products",
    value: "flip",
    route: "/flip/products",
  },
  {
    id: 12,
    name: "Services",
    value: "flip",
    route: "/flip/services",
  },
  {
    id: 14,
    name: "Job Posting",
    value: "flip",
    route: "/flip/jobs",
  },

  {
    id: 15,
    name: "Merchants",
    value: "flip",
    route: "/flip/merchants",
  },

  // {
  //   id: 27,
  //   name: "Audit Trail",
  //   value: "flip",
  //   route: "/flip/audit",
  // },
  {
    id: 9,
    name: "Riders",
    value: "cue",
    route: "/cue/riders",
  },
  {
    id: 17,
    name: "Trips",
    value: "cue",
    route: "/cue/trips",
  },

  {
    id: 19,
    name: "Drivers",
    value: "cue",
    route: "/cue/drivers",
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
