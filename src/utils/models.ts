import { SelectProps } from "antd";
import { InputProps } from "antd/es/input";
import { RadioGroupProps } from "antd/es/radio";
import { DefaultOptionType } from "antd/es/select";
import { ColumnType } from "antd/es/table";

type getOptions = { getOptions?: () => Promise<DefaultOptionType[]> };
type apiKey = { apiKey?: string };
export type FilterProps = InputProps &
  RadioGroupProps &
  SelectProps &
  getOptions &
  apiKey;

export type PaginationType = { current: number; pageSize: number };
export type FilterType = { [key: string]: any };
export type QueryType = { filters: FilterType; pagination: PaginationType };

export type ActionType<T> = { type: string; payload: T };
export type FilterAction = ActionType<{ dataIndex: string; value: any }>;
export type FilterChange = (action: ActionType<FilterAction>) => void;
export type FilterListProps = {
  onChange: FilterChange;
  value: any;
  filter: FilterType;
};

export type OptionType<T> = { label: string; value: T };

export interface ApiEntry {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: boolean;
  Cors: "yes" | "no";
  Category: string;
  Link: string;
}

export type ApiListContextType = {
    getData?: (query: FilterType) => Promise<any[]>;
    defaultQuery?: QueryType;
    columns?: ColumnType<ApiEntry>[];
    filters?: FilterType[];
  };
  
