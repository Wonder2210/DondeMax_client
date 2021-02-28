import LocalesType from "./types";

const language: LocalesType = {
  index: {
    subHeader: `Postres , dulces , tortas y Pasapalos de la
      mas alta calidad , a la medida de sus
      necesidades`,
    actionButton: `Nuestros productos`,
    contactUs: "Contactanos a traves de",
    product1: "Tortas",
    product2: "Dulces frios",
    product3: "Galletas",
    product4: "Pasapalos dulces",
  },
  navbar: {
    aboutUs: "Acerca de nosotros",
    home: "Inicio",
    shop: "Comprar",
  },
  shop: {
    title: "Comprar",
    type1: "Todo",
    type2: "Tortas",
    type3: "Porciones de torta",
    type4: "Galletas",
  },
  aboutUs: {
    misionInfo: "Entregar a los compradores una grata atencion y productos de gran calidad a un precio accesible",
    mision: "Mision",
    vision: "Vision",
    visionInfo: "LLegar a mas clientes que puedan disfrutar de nuestros productos y la calidad del servicio",
    contactUs: "Contactanos",
    contactUsInfo: "lol",
    whoAmi: "¿Quienes somos?",
    visitUs: "Visitanos",
  },
  productsInfo: {
    ratings: "valoraciones",
    ratingsInfo: " de nuestros clientes han dado una opinion acerca de este producto",
    available: "Disponible",
    notAvailable: "No Disponible",
    quantity: "Cantidad",
    addToCart: "Agregar al carro",
    delivery: "Entregas",
    moreProducts: "Productos que te pueden interesar:",
    deliveryInfo: `Todos nuestros productos son producidos el mismo dia de su entrega por lo tanto sus pedidos se deberan 
    realizar con la debida antelacio Podran ser retirados en el horario de 8 am a 7pm en nuestro local y 
    se puede acordar el delivery con un recargo adicional (a consultar varia del lugar) de entre 10am y 5pm`,
    addedSuccesfully: (qty, name) => `Haz agregado <strong>${qty}</strong> unidades de ${name} al carrito Exitosamente`,
  },
  checkout: {
    info: "Informacion del pedido",
    logIn: "Inicia Sesion",
  },
  cart: {
    buy: "Realizar pedido",
    items: "Productos",
    price: "Precio",
    total: "Total",
    uniteds: "Unidades",
  },
  login: {
    badData: "El correo o la contraseña que usastes es incorrecta",
    noAccount: "¿No estas registrado?",
    signUpHere: "Registrate aqui",
  },
  forms: {
    orderClient: {
      payMethod: "Metodo de pago",
      deliveryDate: "Fecha de entrega",
      note: "Nota",
    },
    loginClient: {
      logIn: "Ingresa",
      email: "Email",
      password: "Contraseña",
      submit: "Ingresar",
    },
  },
};

export default language;
