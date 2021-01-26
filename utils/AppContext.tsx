import * as React from "react";
import Cookies from "js-cookie";

export const AppContext = React.createContext(null);

type ProductsCart = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  total: number;
};

export function useAppContext() {
  const context = React.useContext(AppContext);

  if (!context) {
    // eslint-disable-next-line no-console
    console.error("Error deploying App Context!!!");
  }

  return context;
}

export const AppProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<{
    admin: boolean;
    adminPassword: number;
    productsCart?: Array<ProductsCart>;
    total: number;
  }>(() => {
    const admin = Cookies.get("admin") === "true" ?? false;
    const adminPassword = 221099;
    const productsCart = Cookies.getJSON("productsCart") ?? [];

    return {
      admin,
      adminPassword,
      productsCart,
      total: 0,
    };
  });
  React.useEffect(() => {
    if (state.productsCart.length) {
      setState({ ...state, total: state.productsCart.reduce((prev, current) => prev + current.total, 0) });
      console.log("updated");
    }
  }, [state.productsCart]);

  const addToCart = (product: ProductsCart) => {
    const itemIndex = state.productsCart.findIndex((i) => i.id === product.id);

    if (itemIndex >= 0) {
      const items = [...state.productsCart];
      items[itemIndex].quantity += product.quantity;
      items[itemIndex].total += product.total;

      setState({ ...state, productsCart: items });
      return;
    }
    setState({ ...state, productsCart: [...state.productsCart, product] });
  };

  const removeFromCart = (id: number) => {
    setState({ ...state, productsCart: state.productsCart.filter((i) => i.id !== id) });
  };
  React.useEffect(() => {
    const stateJ = JSON.stringify(state.productsCart);
    // eslint-disable-next-line no-console
    console.log(stateJ);
    Cookies.set("admin", String(state.admin), { expires: 1 });
    Cookies.set("adminPassword", String(state.adminPassword), { expires: 1 });
    Cookies.set("productsCart", stateJ, { expires: 1 });
  }, [state]);

  const values = React.useMemo(
    () => ({
      state,
      setState,
      addToCart,
      removeFromCart,
    }),
    [state],
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
