import React, { useEffect, useState } from "react";
import { Select, Radio, Input } from "antd";
import {
  ActionType,
  FilterAction,
  FilterListProps,
  OptionType,
} from "../utils/models";

const FilterList = ({ onChange, value, filter }: FilterListProps) => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (!filter.getOptions) {
      return;
    }
    const fetchData = async () => {
      const data = await filter.getOptions();
      setOptions(data);
    };
    fetchData();
  }, [filter]);

  const mapChange = (...props: any[]) => {
    const filterActionPayload: FilterAction = {
      type: filter.type,
      payload: { dataIndex: filter.dataIndex as string, value: { ...props } },
    };

    const action: ActionType<FilterAction> = {
      type: "filters",
      payload: filterActionPayload,
    };

    return onChange(action);
  };

  const filterSort = (optionA: OptionType<any>, optionB: OptionType<any>) =>
    (optionA?.label ?? "")
      .toLowerCase()
      .localeCompare((optionB?.label ?? "").toLowerCase());

  const filterOption = (input: any, option: any) =>
    (option?.label ?? "").includes(input);

  switch (filter.type) {
    case "SelectAutoComplete":
      return (
        <Select
          showSearch
          style={{ width: 200 }}
          allowClear={true}
          placeholder={filter.placeholder}
          optionFilterProp="children"
          filterOption={filterOption}
          filterSort={filterSort}
          options={options}
          onChange={mapChange}
        />
      );
    case "RadioGroup":
      return (
        <Radio.Group
          options={options}
          onChange={mapChange}
          value={value}
          optionType="button"
        />
      );
    default:
      return (
        <Input
          allowClear
          type={filter.type}
          placeholder={filter.placeholder}
          onChange={mapChange}
        />
      );
  }
};

export default FilterList;
