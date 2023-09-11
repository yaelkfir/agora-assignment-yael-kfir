import { FILTERS } from "./filters";
import { ApiEntry, FilterType } from "./models";

const baseUrl = "https://api.publicapis.org";

const searcParams = (url: string, query: FilterType) => {
  const filters = Object.entries(query).reduce((acc, [dataIndex, entry]) => {
    const apiKey = FILTERS[dataIndex].apiKey;
    return { ...acc, [apiKey || dataIndex]: entry };
  }, {});
  const params = new URLSearchParams({ ...filters }).toString();
  return params.length ? `${url}?${params}` : url;
};

export const getApiEntries = async (
  query: FilterType
): Promise<{ count: number; entries: ApiEntry[] }> => {
  const url = searcParams(baseUrl + "/entries", query);
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const getCategory = async (): Promise<{
  count: number;
  categories: string[];
}> => {
  const res = await fetch(baseUrl + "/categories");
  const data = await res.json();
  return data;
};
