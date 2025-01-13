/** @format */

import React, { ReactNode, memo, useState } from "react";

interface SelectOptionProps {
  items: string[];
  values?: string;
  classNames?: string;
  icon?: React.ReactNode;
  clearOnSuccess?: boolean;
  label?: string;
  onSelectOption: (value: string) => void;
}

const SelectOption: React.FC<SelectOptionProps> = ({
  items,
  label,
  classNames,
  clearOnSuccess,
  values,
  icon,
  onSelectOption,
}) => {
  // Validation to ensure items is an array of strings
  if (
    !Array.isArray(items) ||
    items.some((item: any) => typeof item !== "string")
  ) {
    throw new Error(
      "SelectOption component expects an array of strings as items."
    );
  }

  const [selectedValue, setSelectedValue] = useState<string>(items[0]);

  return (
    <div>
      {label && (
        <label
          htmlFor={label}
          className={`block  font-medium text-gray-900 dark:text-white ${
            classNames ? classNames : ""
          }`}
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {icon}

        <select
          className={`bg-gray-50 border border-gray-300 ${
            icon ? "pl-10" : ""
          } text-gray-900 text-sm rounded-lg focus:ring-blue-500 ${classNames} focus:border-blue-500 block w-full px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          value={selectedValue || values}
          onChange={(e) => {
            const newValue = e.target.value;
            if (newValue !== "") {
              setSelectedValue(newValue);
              onSelectOption(newValue);
            }
          }}
        >
          <option value={""}> Select Option</option>
          {items.map((item: any) => (
            <option key={item} value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default memo(SelectOption);

//inplementation

// const data = [
//     { classid: "123", className: "12" },
//     { classid: "1223", className: "12555" },
//     { classid: "12223", className: "1234" },
//   ];
//   const items = data.map((item) => item.className);
// const items = ["Option 1", "Option 2", "Option 3"];
// const [selectedValue, setSelectedValue] = useState<string>(items[0]);

{
  /* <SelectOption
items={items}
icon={
  <FaStore
    size={"16"}
    color="grey"
    className="pointer-events-none absolute ml-4 "
  />
}
onSelectOption={(value) => setSelectedValue(value)}
/> */
}
