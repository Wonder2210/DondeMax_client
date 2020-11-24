import * as React from "react";
import Cookies from "js-cookie";
export const AppContext = React.createContext(null);

type ProductsCart = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
};

export function useAppContext() {
  const context = React.useContext(AppContext);

  if (!context) {
    console.error("Error deploying App Context!!!");
  }

  return context;
}

export const AppProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<{
    admin: boolean;
    adminPassword: number;
    productsCart?: [ProductsCart];
  }>(() => {
    const admin = Boolean(Cookies.get("admin")) ?? false;
    const adminPassword = Number(Cookies.get("adminPassword")) ?? 221099;
    const productsCart = Cookies.getJSON("productsCart") ?? [];

    return {
      admin,
      adminPassword,
      productsCart,
    };
  });

  React.useEffect(() => {
    const stateJ = JSON.stringify(state.productsCart);
    console.log(stateJ);
    Cookies.set("admin", String(state.admin), { expires: 1 });
    Cookies.set("adminPassword", String(state.adminPassword), { expires: 1 });
    Cookies.set("productsCart", stateJ, { expires: 1 });
  }, [state]);

  const values = React.useMemo(
    () => ({
      state,
      setState,
    }),
    [state],
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
