/** @format */

import React, { useState, ChangeEvent, useEffect } from "react";
import { z, ZodError } from "zod";
import DOMPurify from "isomorphic-dompurify";
// Define your types using Zod

const stringType = z.coerce.string();

interface TextAreaProps {
  type?: "text";
  classNames?: string;
  label?: string;
  clearOnSuccess?: boolean;
  onChange?: (value: string) => void;
}

function TextArea({
  type = "text",
  classNames,
  clearOnSuccess,
  label,
  onChange,
}: TextAreaProps) {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    validateInput(inputValue);
  };

  const validateInput = (inputValue: string) => {
    try {
      const sanitizedValue = DOMPurify.sanitize(inputValue);
      getTypeValidator().parse(sanitizedValue);
      setError(null);

      // Call the onChange callback only when validation is successful
      if (onChange) {
        onChange(sanitizedValue);
      }
    } catch (validationError) {
      if (validationError instanceof ZodError) {
        setError(validationError.errors[0]?.message ?? "Invalid input");
      } else {
        setError("Invalid input");
      }
    }
  };

  const getTypeValidator = () => {
    switch (type) {
      case "text":

      default:
        return z.string(); // Default to string type if type is not recognized
    }
  };

  useEffect(() => {
    if (clearOnSuccess) {
      setValue("");
    }
  }, [clearOnSuccess]);

  return (
    <div>
      {label && (
        <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
          {label}
        </label>
      )}
      <textarea
        placeholder={`Enter ${type}`}
        value={value}
        rows={3}
        onChange={handleChange}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
          error ? "border-red-500" : ""
        } ${classNames || ""}`}
      />
      {error && (
        <div className="text-red-500 text-xs mt-1">{`Error: ${error}`}</div>
      )}
    </div>
  );
}

export default TextArea;
