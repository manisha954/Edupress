/** @format */

import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import { v4 as uuidv4 } from "uuid";

interface DynamicInputFieldsProps {
  onTextArrayChange: (textArray: string[]) => void; // Callback function prop
  resetField?: boolean;
  values?: string[];
}

const DynamicInputFields: React.FC<DynamicInputFieldsProps> = ({
  onTextArrayChange,
  resetField,
  values,
}) => {
  const [isLoaded, setIsLoaded] = useState(false); // Track initial load

  const [inputFields, setInputFields] = useState<
    { id: string; value: string }[]
  >([{ id: uuidv4(), value: "" }]);

  const handleInputChange = (id: string, value: string) => {
    setInputFields((prevState) =>
      prevState.map((field: any) =>
        field.id === id ? { ...field, value } : field
      )
    );
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(), value: "" }]);
  };

  const handleRemoveField = (id: string) => {
    setInputFields((prevState) =>
      prevState.filter((field: any) => field.id !== id)
    );
  };
  useEffect(() => {
    if (!isLoaded && values && values.length > 0) {
      setInputFields(
        values.map((value) => {
          return { id: uuidv4(), value };
        })
      );
      setIsLoaded(true); // Set as loaded after initial set
    }
  }, [values, isLoaded]);
  console.log("first", values);
  useEffect(() => {
    if (onTextArrayChange) {
      const textArray = inputFields.map((field: any) => field.value);
      console.log("text", textArray);
      onTextArrayChange(textArray);
    }
  }, [inputFields]);

  useEffect(() => {
    if (resetField) {
      setInputFields([{ id: uuidv4(), value: "" }]);
    }
  }, [resetField]);

  return (
    <div className="space-y-2 w-full">
      {inputFields.map(({ id, value }, index) => (
        <div key={id} className="space-y-2 w-full flex items-center">
          <div className="w-full">
            <TextInput
              type="text"
              classNames="text-sm"
              values={value}
              required={true}
              clearOnSuccess={resetField}
              onChange={(value) => handleInputChange(id, value)}
              placeholder=""
            />
          </div>
          <button
            type="button"
            onClick={() => handleRemoveField(id)}
            className="ml-2 inline-flex items-center gap-x-1 rounded-full border border-dashed border-gray-200 bg-white px-2 py-1.5 text-xs font-medium text-gray-800 hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            Remove
          </button>
        </div>
      ))}
      <p className="mt-3 text-end">
        <button
          type="button"
          onClick={handleAddFields}
          className="inline-flex items-center gap-x-1 rounded-full border border-dashed border-gray-200 bg-white px-2 py-1.5 text-xs font-medium text-gray-800 hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
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
            strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Add
        </button>
      </p>
    </div>
  );
};

export default DynamicInputFields;
