import { ColumnProps } from "antd/es/table";
import { Resizable, ResizeCallbackData } from "react-resizable";
import { ReactElement } from "react";

const ResizableColumnTitle = ({
  column,
  onResize,
}: {
  column: ColumnProps<any>;
  onResize: (e: any, data: ResizeCallbackData) => void;
}) => {
  if (!column.width) {
    return <span>{column.title as ReactElement}</span>;
  }
  return (
    <Resizable
      width={column.width as number}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        ></span>
      }
      onResize={onResize}
    >
      <span style={{ display: "block" }}>{column.title as any}</span>
    </Resizable>
  );
};

export default ResizableColumnTitle;
