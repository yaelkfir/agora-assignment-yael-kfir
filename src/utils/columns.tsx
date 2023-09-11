import { Tag } from "antd";
import { CheckOutlined, MinusOutlined } from "@ant-design/icons";
import { ApiEntry } from "./models";
import { DataIndexs } from "./dataIndex";
import { ColumnType } from "antd/es/table";

const renderApi = (api: string, item: ApiEntry) => (
  <a href={item.Link} target="blank">
    {api}
  </a>
);
const renderHttps = (HTTPS: boolean) => {
  const value = HTTPS ? "HTTPS" : "HTTP";
  const color = HTTPS ? "green" : "lime";
  return (
    <Tag key={value} color={color}>
      {value}
    </Tag>
  );
};
const renderCors = (cors: "yes" | "no") => (
  <span>
    {cors === "yes" ? (
      <CheckOutlined color={"green"} />
    ) : (
      <MinusOutlined color="gray" />
    )}
  </span>
);

export const COLUMNS: { [key: string]: ColumnType<ApiEntry> } = {
  [DataIndexs.API]: {
    title: "Name",
    width: 200,
    ellipsis: true,
    render: renderApi,
  },
  [DataIndexs.Description]: {
    title: "Description",
    ellipsis: true,
  },
  [DataIndexs.Auth]: {
    title: "Auth",
    width: 100,
    ellipsis: true,
  },
  [DataIndexs.HTTPS]: {
    title: "Protocol",
    render: renderHttps,
    width: 150,
    ellipsis: true,
  },
  [DataIndexs.Cors]: {
    title: "Cors",
    width: 100,
    ellipsis: true,
    render: renderCors,
  },
  [DataIndexs.Category]: {
    title: "Category",
    width: 100,
    ellipsis: true,
  },
};

export const apiListTableColumns: string[] = [
  DataIndexs.API,
  DataIndexs.Category,
  DataIndexs.HTTPS,
  DataIndexs.Auth,
  DataIndexs.Cors,
  DataIndexs.Description,
];

export const getEntryColumns = () => {
  return apiListTableColumns.map((dataIndex) => {
    if (!COLUMNS[dataIndex]) {
      throw new Error("no column found");
    }
    return { ...COLUMNS[dataIndex], dataIndex };
  });
};
