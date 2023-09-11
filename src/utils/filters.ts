import { DataIndexs } from "./dataIndex";
import { FilterProps, OptionType } from "./models";
import { getCategory } from "./api";

const httpsOptions = [
  { label: "All", value: undefined },
  {
    label: "HTTPS",
    value: "true",
  },
  {
    label: "HTTP",
    value: "false",
  },
];

const getHttpsOptions = async (): Promise<OptionType<string | undefined>[]> =>
  new Promise((resolve) => resolve(httpsOptions));

const getCategoryOptions = async (): Promise<OptionType<string>[]> => {
  const data = await getCategory();
  return data.categories.map((cat: string) => ({ label: cat, value: cat }));
};

export const FILTERS: { [key: string]: FilterProps } = {
  [DataIndexs.Category]: {
    type: "SelectAutoComplete",
    getOptions: getCategoryOptions,
    placeholder: "Search by Category",
  },
  [DataIndexs.HTTPS]: {
    type: "RadioGroup",
    getOptions: getHttpsOptions,
  },
  [DataIndexs.API]: {
    type: "text",
    placeholder: "search by name",
    apiKey: "title",
  },
};

export const apiListFilters = [
  DataIndexs.API,
  DataIndexs.Category,
  DataIndexs.HTTPS,
];

export const getApiListFilters = () => {
  return apiListFilters.map((filterIndex) => {
    if (!FILTERS[filterIndex]) {
      throw new Error("no filter found");
    }
    return { ...FILTERS[filterIndex], dataIndex: filterIndex };
  });
};
