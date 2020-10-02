import * as React from "react";
import Pagination from "./Pagination";

export const Paginationtest = () => {
  const [state, setState] = React.useState<{ page: number; pageItems: number }>({
    page: 1,
    pageItems: 12,
  });
  const next = () => setState((last) => ({ ...last, page: last.page + 1 }));
  const last = () => setState((last) => ({ ...last, page: last.page - 1 }));
  const onClick = (e: number) => setState((last) => ({ ...last, page: e }));
  return (
    <Pagination
      numberItems={34}
      pageItems={state.pageItems}
      onClick={onClick}
      page={state.page}
      next={next}
      last={last}
    />
  );
};

export default {
  title: "Molecules/Pagination",
};
