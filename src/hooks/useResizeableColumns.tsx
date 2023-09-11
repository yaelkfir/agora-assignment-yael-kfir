import { useState } from "react";
import ResizableColumnTitle from "../components/ResizableColumnTitle";
import { ColumnType } from "antd/es/table";
import { ResizeCallbackData } from "react-resizable";
import { ApiEntry } from "../utils/models";

export function useResizableColumns(cols: ColumnType<ApiEntry>[]) {
  const [columns, setColumns] = useState(cols);
  const handleResize = (index: number) => {
    return (e: any, { size }: ResizeCallbackData) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };

      setColumns(nextColumns);
    };
  };

  const mapColumn = (col: ColumnType<ApiEntry>, i: number) => {
    const title = () => (
      <ResizableColumnTitle column={col} onResize={handleResize(i)} />
    );
    return {
      ...col,
      title,
      onHeaderCell: (column: ColumnType<ApiEntry>) => ({
        width: column.width,
      }),
    };
  };
  return {
    columns: columns.map((col: ColumnType<ApiEntry>, i: number) =>
      mapColumn(col, i)
    ),
  };
}
