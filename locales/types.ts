/* eslint-disable camelcase */
/* eslint-disable no-undef */
interface locales {
  index: {
    subHeader: string;
    actionButton: string;
    contactUs: string;
    product1: string;
    product2: string;
    product3: string;
    product4: string;
  };
  navbar: {
    home: string;
    aboutUs: string;
    shop: string;
  };
  shop: {
    title: string;
    type1: string;
    type2: string;
    type3: string;
    type4: string;
  };
  aboutUs: {
    mision: string;
    misionInfo: string;
    vision: string;
    visionInfo: string;
    contactUs: string;
    contactUsInfo: string;
    visitUs: string;
    whoAmi: string;
  };
  productsInfo: {
    ratings: string;
    ratingsInfo: string;
    available: string;
    notAvailable: string;
    quantity: string;
    addToCart: string;
    delivery: string;
    moreProducts: string;
    deliveryInfo: string;
    addedSuccesfully: (qty: number, name: string) => string;
  };
  checkout: {
    logIn: string;
    info: string;
  };
  cart: {
    items: string;
    total: string;
    buy: string;
    price: string;
    uniteds: string;
  };
  login: {
    noAccount: string;
    signUpHere: string;
    badData: string;
  };
  register: {
    haveAccount: string;
    loginHere: string;
    badData: string;
  };
  forms: {
    orderClient: {
      deliveryDate: string;
      payMethod: string;
      note: string;
    };
    loginClient: {
      logIn: string;
      email: string;
      password: string;
      submit: string;
    };
    signUpClient: {
      signUp: string;
      name: string;
      phone: string;
      last_name: string;
      email: string;
      password: string;
    };
    addPhone: {
      add: string;
      phone: string;
    };
  };
}

export default locales;
