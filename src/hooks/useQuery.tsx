import { useState, useReducer } from "react";
import { debounce } from "lodash";
import {
  ActionType,
  FilterAction,
  FilterType,
  QueryType,
} from "../utils/models";

const filterReducer = (
  filters: FilterType,
  action: FilterAction
): FilterType => {
  const { type, payload } = { ...action };
  const { dataIndex, value } = { ...payload };

  let nextValue = value;
  switch (type) {
    case "SelectAutoComplete":
      nextValue = value[0];
      break;
    case "RadioGroup":
      nextValue = value[0].target.value;
      break;
    default:
      nextValue = value[0].target.value;
  }
  const clear = !(nextValue || "").length;
  const next: { [key: string]: any } = { ...filters, [dataIndex]: nextValue };
  if (clear) {
    delete next[dataIndex];
  }
  return next;
};

export const useQuery = (query: QueryType) => {
  const [filters, dispatchFilter] = useReducer(filterReducer, query.filters);
  const [pagination, setPagination] = useState(query.pagination);

  const onQueryChange = ({ type, payload }: ActionType<FilterAction | any>) => {
    if (type === "filters") {
      setPagination({ ...pagination, current: 1 });
      dispatchFilter({ ...payload });
    }
    if (type === "pagination") {
      setPagination(payload[0]);
    }
  };
  return {
    filters,
    pagination,
    onQueryChange: debounce(onQueryChange, 200),
  };
};
