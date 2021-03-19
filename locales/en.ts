import LocalesType from "./types";

const language: LocalesType = {
  index: {
    subHeader: `Desserts, pastries, cakes and sweet snacks of the highest quality , in the way you need`,
    actionButton: `Our products`,
    contactUs: "Contact us through:",
    product1: "Cakes",
    product2: "Cold pastries",
    product3: "Cookies",
    product4: "Sweet snacks",
  },
  navbar: {
    aboutUs: "About Us",
    home: "Home",
    shop: "Shop",
  },
  shop: {
    title: "Shop",
    type1: "All",
    type2: "Cakes",
    type3: "Pieces of Cake",
    type4: "Cookies",
  },
  aboutUs: {
    misionInfo: "Give to our customers the best attention , and the best products for an affordable price",
    mision: "Mission",
    vision: "Vision",
    visionInfo: "Reach as most customers as possible and bring themm a high quality service",
    contactUs: "Contact Us",
    contactUsInfo: "lol",
    whoAmi: " who are we?",
    visitUs: "Visit us",
  },
  productsInfo: {
    ratings: "ratings",
    ratingsInfo: " of our customers has rate this product",
    available: "Available",
    notAvailable: "Unavailable",
    quantity: "Quantity",
    addToCart: "Add To Cart",
    delivery: "delivery",
    moreProducts: "Products you may like:",
    deliveryInfo: `All our products are made the same day of the delivery therefore your
     orders have to be made with the required
     anticipation and could be delivered in our
      installations or from 8am to 7pm or could be delivered to your
       place`,
    addedSuccesfully: (qty, name) =>
      `You have added <strong>${qty}</strong> uniteds of ${name} to the cart succesfully`,
  },
  checkout: {
    info: "Order Info",
    logIn: "Log In",
  },
  cart: {
    buy: "Make Order",
    items: "Items",
    price: "Price",
    total: "Total",
    uniteds: "Uniteds",
  },
  login: {
    badData: "The email or the password you submit is incorrect",
    noAccount: "Don't have an account?",
    signUpHere: "Sign Up",
  },
  register: {
    badData: "The email is already registered , try with a different email",
    haveAccount: "ALready have an account?",
    loginHere: "Login here",
  },
  forms: {
    orderClient: {
      payMethod: "Pay method",
      deliveryDate: "Delivery Date",
      note: "Note",
    },
    loginClient: {
      logIn: "Log In",
      email: "Email",
      password: "Password",
      submit: "Log In",
    },
    signUpClient: {
      email: "Email",
      last_name: "Last Name",
      name: "Name",
      phone: "Phone",
      password: "Password",
      signUp: "Sign Up",
    },
    addPhone: {
      add: "Add Phone Number",
      phone: "Phone",
    },
  },
};

export default language;
