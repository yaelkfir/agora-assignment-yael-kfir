import { createContext, useContext } from "react";
import { getApiListFilters } from "../utils/filters";
import { getEntryColumns } from "../utils/columns";

import { getApiEntries } from "../utils/api";
import { ApiListContextType, FilterType, QueryType } from "../utils/models";

export const ApiListContext = createContext<ApiListContextType>({});

export function ApiListContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const abortController: { current: AbortController | null } = {
    current: null,
  };

  const defaultQuery: QueryType = {
    pagination: {
      current: 1,
      pageSize: 20,
    },
    filters: {},
  };

  const handelAbort = () => {
    if (abortController.current) {
      abortController.current.abort();
    }
    abortController.current = new AbortController();
  };

  const getData = async (query: FilterType) => {
    handelAbort();
    const data = await getApiEntries(query);
    return data.entries;
  };

  const tableContext = {
    defaultQuery: defaultQuery,
    columns: getEntryColumns(),
    filters: getApiListFilters(),
    getData: getData,
  };

  return (
    <ApiListContext.Provider value={tableContext}>
      {children}
    </ApiListContext.Provider>
  );
}

export function useTableContext() {
  return useContext(ApiListContext);
}
