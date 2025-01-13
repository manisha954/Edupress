import React, { useState, useEffect } from "react";

// Define interfaces for our data structure
interface TranslationData {
  word: string;
  meaning: string;
  example: string;
}

interface WordData {
  word: string;
  meaning: string;
  example: string;
  language: string;
  [key: string]: string; // Allow for dynamic translation fields
}

interface EditableTableProps {
  columnNames: string[];
  data: WordData[];
  onDataChange: (newData: WordData[]) => void;
}

const TRANSLATION_LANGUAGES = ["korean", "nepali", "english"];

const EditableTable: React.FC<EditableTableProps> = ({
  columnNames,
  data,
  onDataChange,
}) => {
  const [editedData, setEditedData] = useState<WordData[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setEditedData(data);
  }, [data]);

  const validateCell = (
    columnName: string,
    value: string,
    rowData: WordData,
    rowIndex: number
  ): string => {
    // Check if this is a translation field
    const translationMatch = columnName.match(
      /^(korean|nepali|english)_(word|meaning|example)$/
    );

    if (translationMatch) {
      const [, language, field] = translationMatch;

      // If any field for this language is filled, all must be filled
      const hasWord = Boolean(rowData[`${language}_word`]?.trim());
      const hasMeaning = Boolean(rowData[`${language}_meaning`]?.trim());
      const hasExample = Boolean(rowData[`${language}_example`]?.trim());

      if ((hasWord || hasMeaning || hasExample) && !value.trim()) {
        return `All ${language} fields must be filled if any are filled`;
      }
    } else {
      // Validate required fields
      if (
        (columnName === "word" ||
          columnName === "meaning" ||
          columnName === "language") &&
        !value.trim()
      ) {
        return `${
          columnName.charAt(0).toUpperCase() + columnName.slice(1)
        } is required`;
      }
    }

    return "";
  };

  const handleCellChange = (
    newValue: string,
    rowIndex: number,
    columnName: string
  ) => {
    const newData = [...editedData];
    const newRow = { ...newData[rowIndex], [columnName]: newValue };

    // Validate the new value
    const error = validateCell(columnName, newValue, newRow, rowIndex);
    setErrors((prev) => ({
      ...prev,
      [`${rowIndex}-${columnName}`]: error,
    }));

    newData[rowIndex] = newRow;
    setEditedData(newData);
    onDataChange(newData);
  };

  const renderCellValue = (columnName: string, cellValue: any) => {
    if (cellValue === "" || cellValue === null || cellValue === undefined) {
      return "";
    }
    return cellValue;
  };

  const getColumnType = (columnName: string): "text" | "select" => {
    return columnName === "language" ? "select" : "text";
  };

  const renderCell = (
    rowIndex: number,
    columnName: string,
    rowData: WordData
  ) => {
    const cellValue = renderCellValue(columnName, rowData[columnName]);
    const errorKey = `${rowIndex}-${columnName}`;
    const hasError = Boolean(errors[errorKey]);

    switch (getColumnType(columnName)) {
      case "select":
        return (
          <select
            className={`border ${
              hasError ? "border-red-500" : "border-gray-300"
            } text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1.5 ${
              hasError ? "bg-red-50" : "bg-white"
            }`}
            value={cellValue}
            onChange={(e) =>
              handleCellChange(e.target.value, rowIndex, columnName)
            }
          >
            <option value="">Select Language</option>
            {TRANSLATION_LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type="text"
            className={`border ${
              hasError ? "border-red-500" : "border-gray-300"
            } text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1.5 ${
              hasError ? "bg-red-50" : "bg-white"
            }`}
            value={cellValue}
            onChange={(e) =>
              handleCellChange(e.target.value, rowIndex, columnName)
            }
          />
        );
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columnNames.map((columnName, columnIndex) => (
              <th
                key={columnIndex}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {columnName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {editedData.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              {columnNames.map((columnName, columnIndex) => (
                <td key={columnIndex} className="px-6 py-4 whitespace-nowrap">
                  <div className="relative">
                    {renderCell(rowIndex, columnName, rowData)}
                    {errors[`${rowIndex}-${columnName}`] && (
                      <div className="absolute text-xs text-red-500 mt-1">
                        {errors[`${rowIndex}-${columnName}`]}
                      </div>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
