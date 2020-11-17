import * as React from "react";

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
  }>({
    admin: false,
    adminPassword: 221099,
  });

  const values = React.useMemo(
    () => ({
      state,
      setState,
    }),
    [state],
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
