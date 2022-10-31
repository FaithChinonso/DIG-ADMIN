import cardImage from "../assets/image/cardImage.jpg";
import riderPic from "../assets/image/riderPic.svg";
import documentOne from "../assets/image/documentOne.svg";
import green from "../assets/image/green.jpeg";
import orange from "../assets/image/orange.jpeg";
import blue from "../assets/image/blue.jpeg";
import documentTwo from "../assets/image/documentTwo.svg";
import WidgetsIcon from "@mui/icons-material/Widgets";

export const analytics = [
  {
    id: 1,
    name: "Total Sales",
    figure: 14233,
    description: "We have sold 14233 items",
    color: "rgba(180, 96, 133, .8)",
    colorLight: "rgba(180, 96, 133, 0.5)",
    img: orange,
  },
  {
    id: 2,
    name: "Total Reveue",
    figure: 233,
    description: "Total Revenue is 233",
    color: "rgba(82, 68, 192, 1) ",
    colorLight: "rgba(107, 93, 211, .6)",
    img: green,
  },
  {
    id: 3,
    name: "In Escrow",
    figure: 7899223,
    description: "Available to payout",
    color: "rgba(37, 82, 59, .8)",
    colorLight: "rgba(37, 82, 59, .5)",
    img: blue,
  },
  {
    id: 4,
    name: "Total Orders",
    figure: 1300,
    description: "Total orders is 1300",
    color: "rgba(225, 220, 88, 1)",
    colorLight: "rgba(225, 220, 88, .7)",
    img: green,
  },
];
export const bank = [
  {
    id: 1,
    accountName: "FirstName LastName",
    accountNumber: "0255643657",
    accountType: "Savings",
    destinationBank: "GTB",
  },
];
export const order = [
  {
    id: 1,
    order: "Milk",
    orderPrice: "#3000",
    quantity: "3",
    destinationBank: "GTB",
    dateRequested: "2022-09-014",
    merchant: 'Winny"s Supermarket',
    status: "pending",
  },
];
export const product = [
  {
    id: 1,
    productName: "Milk",
    productId: "#45677890",
    productQuantity: "20",
    productWeight: "0.4kg",
    price: "#3000",
    deliveryTag: "normal",
    status: "pending",
  },
];
export const transaction = [
  {
    id: " #78990",

    amountPaid: "#3000",
    paymentType: "Withdraw",
    patientName: "Joseph Ike",
  },
  {
    id: " #789455",

    amountPaid: "#30000",
    paymentType: "Transfer",
    patientName: "Chidi Okeke",
  },
];
export const transactions = [
  {
    id: 1,
    amount: 45,
    transactionType: "debit",
    description: "description",
    createdAt: "2022-09-014T13:53:50.494Z",
  },
  {
    id: 2,
    amount: 50000,
    transactionType: "credit",
    description: "description",
    createdAt: "2022-09-012T13:53:50.494Z",
  },
  {
    id: 3,
    amount: 500,
    transactionType: "credit",
    description: "description",
    createdAt: "2022-09-01T13:53:50.494Z",
  },
  {
    id: 4,
    amount: 1500,
    transactionType: "debit",
    description: "description",
    createdAt: "2022-09-01T13:53:40.494Z",
  },
  {
    id: 5,
    amount: 45,
    transactionType: "debit",
    description: "description",
    createdAt: "2022-09-014T13:53:50.494Z",
  },
  {
    id: 6,
    amount: 50000,
    transactionType: "credit",
    description: "description",
    createdAt: "2022-09-012T13:53:50.494Z",
  },
  {
    id: 7,
    amount: 500,
    transactionType: "credit",
    description: "description",
    createdAt: "2022-09-01T13:53:50.494Z",
  },
  {
    id: 8,
    amount: 1500,
    transactionType: "debit",
    description: "description",
    createdAt: "2022-09-01T13:53:40.494Z",
  },
];
export const tableData = [
  {
    id: 1,
    name: "Name",
    number: "08148184543",
    email: "email@email.com",
    lga: "L.G.A",
    action: "Action",
  },
  {
    id: 2,
    name: "Name",
    number: "08148184543",
    email: "email@email.com",
    lga: "L.G.A",
    action: "Action",
  },
  {
    id: 1,
    name: "Name",
    number: "08148184543",
    email: "email@email.com",
    lga: "L.G.A",
    action: "Action",
  },
  {
    id: 2,
    name: "Name",
    number: "08148184543",
    email: "email@email.com",
    lga: "L.G.A",
    action: "Action",
  },
  {
    id: 1,
    name: "Name",
    number: "08148184543",
    email: "email@email.com",
    lga: "L.G.A",
    action: "Action",
  },
  {
    id: 2,
    name: "Name",
    number: "08148184543",
    email: "email@email.com",
    lga: "L.G.A",
    action: "Action",
  },
];
export const statusData = [
  {
    id: 1,
    figure: 289,
    name: "Booked",
  },
  {
    id: 2,
    figure: 1.953,
    name: "On Progress",
  },
  {
    id: 3,
    figure: 120,
    name: "Cancelled",
  },
];
export const innerNav = [
  {
    id: 1,
    icon: WidgetsIcon,
    value: "first",
    color: "rgba(225,225,225, .8)",
    borderColor: "rgba(225,225,225, .4)",
    initials: "GE",
    name: "General Administration",
    route: "/general",
    navItems: [
      {
        id: 1,
        name: "Dashboard",
        value: "first",
        route: "/general/",
      },
      {
        id: 2,
        name: "Media & Communications",
        value: "first",
        route: "/general/media",
      },
      {
        id: 3,
        name: "Users",
        value: "first",
        route: "/general/users",
      },
      {
        id: 4,
        name: "Transactions",
        value: "first",
        route: "/general/transactions",
      },
      {
        id: 5,
        name: "Audit Trail",
        value: "first",
        route: "/general/audit",
      },
      {
        id: 6,
        name: "Settings",
        value: "first",
        route: "/general/settings",
      },
      {
        id: 7,
        name: "Budgets",
        value: "first",
        route: "/general/budgets",
      },
    ],
  },
  {
    id: 2,
    icon: WidgetsIcon,
    value: "second",
    color: "rgba(180, 96, 133, .8)",
    borderColor: "rgba(180, 96, 133, .4)",
    initials: "FP",
    name: "Flip",
    route: "/flip",
    navItems: [
      {
        id: 1,
        name: "Orders",
        value: "second",
        route: "/flip/orders",
      },

      {
        id: 2,
        name: "Products",
        value: "second",
        route: "/flip/products",
      },
      {
        id: 3,
        name: "Carts",
        value: "second",
        route: "/flip/carts",
      },
      {
        id: 4,
        name: "Merchants",
        value: "second",
        route: "/flip/merchants",
      },
      {
        id: 5,
        name: "Payment - Withdrawal",
        value: "second",
        route: "/flip/payment",
      },
      {
        id: 6,
        name: "Approvals",
        value: "second",
        route: "/flip/approval",
      },
    ],
  },
  {
    id: 3,
    icon: WidgetsIcon,
    value: "third",
    color: "rgba(37, 82, 59, .8)",
    borderColor: "rgba(37, 82, 59, .4)",
    initials: "CU",
    name: "Cue",
    route: "/cue",
    navItems: [
      {
        id: 1,
        name: "Trips",
        value: "third",
        route: "/cue/trips",
      },
      {
        id: 2,
        name: "Fleet",
        value: "third",
        route: "/cue/fleets",
      },
      {
        id: 4,
        name: "Drivers",
        value: "third",
        route: "/cue/drivers",
      },
      {
        id: 4,
        name: "Payments - Withdrawal",
        value: "third",
        route: "/cue/payment",
      },
      {
        id: 4,
        name: "Approvals",
        value: "third",
        route: "/cue/approval",
      },
    ],
  },

  {
    id: 4,
    icon: WidgetsIcon,
    value: "fourth",
    color: "rgba(17, 22, 59, .8)",
    borderColor: "rgba(17, 22, 59, .4)",
    initials: "PI",
    name: "Payment Interface",
    route: "/payment",
  },
];
export const outerNav = [
  {
    id: 1,
    name: "Dashboard",
    value: "first",
    route: "/general/",
  },

  {
    id: 4,
    name: "Media & Communications",
    value: "first",
    route: "/general/media",
  },
  {
    id: 5,
    name: "Users",
    value: "first",
    route: "/general/users",
  },
  {
    id: 6,
    name: "Transactions",
    value: "first",
    route: "/general/transactions",
  },
  {
    id: 7,
    name: "Audit Trail",
    value: "first",
    route: "/general/audit",
  },
  {
    id: 8,
    name: "Settings",
    value: "first",
    route: "/general/settings",
  },
  {
    id: 9,
    name: "Budgets",
    value: "first",
    route: "/general/budgets",
  },
  {
    id: 10,
    name: "Orders",
    value: "second",
    route: "/flip/orders",
  },

  {
    id: 11,
    name: "Products",
    value: "second",
    route: "/flip/products",
  },
  {
    id: 12,
    name: "Carts",
    value: "second",
    route: "/flip/carts",
  },
  {
    id: 13,
    name: "Merchants",
    value: "second",
    route: "/flip/merchants",
  },
  {
    id: 14,
    name: "Payment - Withdrawal",
    value: "second",
    route: "/flip/payment",
  },
  {
    id: 15,
    name: "Approvals",
    value: "second",
    route: "/flip/approval",
  },
  {
    id: 16,
    name: "Trips",
    value: "third",
    route: "/cue/trips",
  },
  {
    id: 17,
    name: "Fleet",
    value: "third",
    route: "/cue/fleets",
  },
  {
    id: 18,
    name: "Drivers",
    value: "third",
    route: "/cue/drivers",
  },
  {
    id: 19,
    name: "Payments - Withdrawal",
    value: "third",
    route: "/cue/payment",
  },
  {
    id: 20,
    name: "Approvals",
    value: "third",
    route: "/cue/approval",
  },
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
