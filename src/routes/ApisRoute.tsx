import AgoraDataTable from "../components/AgoraDataTable";
import { Space } from "antd";
import { ApiListContextProvider } from "../containers/ApiListContext";

const ApiListRoute = () => {
  return (
    <ApiListContextProvider>
      <div style={{ padding: "30px" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Space>
            <h1>Api List</h1>
          </Space>
          <AgoraDataTable scroll={{ x: 1500, y: 400 }} rowKey="Link" key="1" />
        </Space>
      </div>
    </ApiListContextProvider>
  );
};

export default ApiListRoute;
