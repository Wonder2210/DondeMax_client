import * as React from "react";
import Cookies from "js-cookie";
export const AppContext = React.createContext(null);

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
  }>(() => {
    const admin = Cookies.get("admin") ?? false;
    const adminPassword = Cookies.get("adminPassword") ?? 221099;

    return {
      admin,
      adminPassword,
    };
  });

  React.useEffect(() => {
    Cookies.set("admin", state.admin, { expires: 1 });
    Cookies.set("adminPassword", state.adminPassword, { expires: 1 });
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
