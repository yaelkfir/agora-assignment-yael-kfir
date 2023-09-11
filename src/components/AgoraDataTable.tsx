import React, { useState, useEffect } from "react";
import { Table, TableProps } from "antd";
import { useResizableColumns } from "../hooks/useResizeableColumns";
import { Space } from "antd";
import { useQuery } from "../hooks/useQuery";
import { useTableContext } from "../containers/ApiListContext";
import { ActionType, FilterAction, QueryType } from "../utils/models";
import FilterList from "./FilterList";

const AgoraDataTable = ({ rowKey, scroll }: TableProps<any>) => {
  const tableContext = useTableContext();
  const { columns } = useResizableColumns(tableContext.columns || []);
  const { filters, pagination, onQueryChange } = useQuery(
    tableContext.defaultQuery as QueryType
  );

  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const getData = async () => {
      if (!filters || !tableContext.getData) {
        return;
      }
      setLoading(true);
      const data = (await tableContext.getData(filters)) as any;
      setDataSource(data);
      setLoading(false);
    };
    getData();
    return () => {
      abortController.abort();
    };
  }, [tableContext, filters]);

  const onChange = (...props: any[]) => {
    onQueryChange({ type: "pagination", payload: props });
  };

  const onFilterChange = (action: ActionType<FilterAction>) => {
    return onQueryChange(action);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Space>
        {tableContext?.filters?.map((filter) => {
          return (
            <FilterList
              filter={filter}
              onChange={onFilterChange}
              value={filters[filter.dataIndex]}
              key={filter.dataIndex}
            ></FilterList>
          );
        })}
      </Space>
      <Table
        bordered
        virtual
        scroll={scroll}
        rowKey={rowKey as string}
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        loading={loading}
        onChange={onChange}
      />
    </Space>
  );
};

export default AgoraDataTable;
