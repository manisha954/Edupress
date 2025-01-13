/** @format */
"use client";
import React, { memo, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SelectOptionsObject from "./SelectOptionsObject";
import TextInput from "./TextInput";
interface DerivedName {
  id: string;
  name: string;
}

interface Row {
  id: string;
  main: string;
  derived: DerivedName[];
}

interface DynamicRowMappingProps {
  onTextArrayChange?: (textArray: Row[]) => void; // Callback function prop
  selectType?: boolean;
  textType?: boolean;
  data?: any[];
  selectField?: string;
  valueField?: string;
  resetField?: boolean;
  placeholderName1?: string;
  placeholderName2?: string;
}

const DynamicRowMapping: React.FC<DynamicRowMappingProps> = ({
  selectType,
  textType,
  onTextArrayChange,
  selectField,
  valueField,
  data,
  resetField,
  placeholderName1,
  placeholderName2,
}) => {
  const [rows, setRows] = useState<Row[]>([
    { id: uuidv4(), main: "", derived: [{ id: uuidv4(), name: "" }] },
  ]);
  const [isValid, setIsValid] = useState<boolean>(false);
  const handleCategoryChange = (index: number, value: string) => {
    const newRows = [...rows];
    newRows[index].main = value;
    setRows(newRows);
  };

  const handleNameChange = (
    rowIndex: number,
    nameIndex: number,
    value: string
  ) => {
    const newRows = [...rows];
    newRows[rowIndex].derived[nameIndex].name = value;
    setRows(newRows);
  };

  const addName = (rowIndex: number) => {
    const newRows = [...rows];
    const newDerived = [
      ...newRows[rowIndex].derived,
      { id: uuidv4(), name: "" },
    ];
    newRows[rowIndex].derived = newDerived;
    setRows(newRows);
  };

  const removeName = (rowIndex: number, nameId: string) => {
    const newRows = [...rows];
    const newDerived = newRows[rowIndex].derived.filter(
      (name: any) => name.id !== nameId
    );
    newRows[rowIndex].derived = newDerived;
    setRows(newRows);
  };
  const addRow = () => {
    const newRows = [...rows];
    const newRow = {
      id: uuidv4(), // Generate a unique ID for the new row
      main: "",
      derived: [{ id: uuidv4(), name: "" }], // Generate a unique ID for the first derived name
    };
    newRows.push(newRow);
    setRows(newRows);
  };

  const removeRow = (index: string) => {
    const newRows = rows.filter((id: any) => id.id !== index);
    setRows(newRows);
  };

  // const handleSave = () => {
  //   //console.log(JSON.stringify(rows));
  //   // You can perform further actions with the rows data here
  // };

  useEffect(() => {
    if (onTextArrayChange) {
      onTextArrayChange(rows);
    }

    if (resetField) {
      setRows([{ id: "", main: "", derived: [{ id: "", name: "" }] }]);
    }
  }, [rows]);

  useEffect(() => {
    // Check if any row's main or derived names are empty
    const emptyMainOrDerived = rows.some(
      (row: any) =>
        row.main.trim() === "" ||
        row.derived.some((name: any) => name.name.trim() === "")
    );
    setIsValid(!emptyMainOrDerived);
  }, [rows]);
  return (
    <div className=" w-full">
      <div className=" mb-2 border-b pb-2 justify-end space-x-4 flex w-full">
        {/* <button
          onClick={handleSave}
          className="inline-flex items-center gap-x-1 rounded-full border  border-gray-200 bg-blue-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-blue-800 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
          Save
        </button> */}
        <button
          onClick={addRow}
          className="inline-flex items-center gap-x-1 rounded-full border border-dashed border-gray-200 bg-white px-2 py-1.5 text-xs font-medium text-gray-800 hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          <svg
            className="h-3.5 w-3.5 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>{" "}
          Add Row
        </button>
      </div>
      <div className=" w-full px-2">
        {rows.map((row: any, rowIndex: number) => (
          <div
            key={row.id}
            className="flex  w-full md:flex-row flex-col  border-b my-2 space-x-4 "
          >
            <div className="flex flex-col my-auto basis-[100%] md:basis-[50%] w-full mb-2">
              {selectType && data && selectField && valueField && (
                <SelectOptionsObject
                  data={data}
                  classNames=" text-xs"
                  clearOnSuccess={resetField}
                  selectedField={selectField}
                  onSelectOption={(value) => {
                    if (value) {
                      handleCategoryChange(rowIndex, value[valueField]);
                    }
                  }}
                />
              )}
              {textType && (
                <TextInput
                  type="text"
                  classNames=" text-xs"
                  clearOnSuccess={resetField}
                  onChange={(value) => handleCategoryChange(rowIndex, value)}
                  placeholder={
                    placeholderName1 ? placeholderName1 : "Choose current name"
                  }
                />
              )}

              <div className=" w-full flex mt-2 justify-end">
                <button
                  onClick={() => removeRow(row.id)}
                  className="ml-2 inline-flex  gap-x-1 rounded-full border border-dashed border-gray-200 bg-white px-2 py-1.5 text-xs font-medium text-gray-800 hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  Remove Row
                </button>
              </div>
            </div>
            <div className=" flex flex-col basis-[100%] md:basis-[50%] space-y-2">
              {row.derived.map((name: any, nameIndex: number) => (
                <div key={name.id} className="flex space-x-4">
                  <TextInput
                    type="text"
                    classNames=" text-xs"
                    clearOnSuccess={resetField}
                    onChange={(value) =>
                      handleNameChange(rowIndex, nameIndex, value)
                    }
                    placeholder={
                      placeholderName2
                        ? placeholderName2
                        : "Choose current name"
                    }
                  />
                  <button
                    onClick={() => removeName(rowIndex, name.id)}
                    className="ml-2 inline-flex items-center gap-x-1 rounded-full border border-dashed border-gray-200 bg-white px-2 py-1.5 text-xs font-medium text-gray-800 hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className=" flex justify-end mb-2">
                <button
                  onClick={() => addName(rowIndex)}
                  className="inline-flex items-center gap-x-1 rounded-full border border-dashed border-gray-200 bg-white px-2 py-1.5 text-xs font-medium text-gray-800 hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  <svg
                    className="h-3.5 w-3.5 flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                  Add Name
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(DynamicRowMapping);
