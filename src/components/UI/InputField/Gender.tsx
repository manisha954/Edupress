/** @format */

import React, { useEffect, useState, ChangeEvent } from "react";

interface GenderSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const GenderSelect: React.FC<GenderSelectProps> = ({
  value,
  onChange,
  className,
}) => {
  const [selectedGender, setSelectedGender] = useState("");

  useEffect(() => {
    if (value) {
      setSelectedGender(value);
    }
  }, [value]);

  const handleGenderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedGender(selectedValue);
    onChange(selectedValue);
  };

  return (
    <div>
      <label
        htmlFor="gender"
        className={`block text-xs  text-gray-900 dark:text-white ${
          className || ""
        }`}
      >
        Gender
      </label>
      <select
        id="gender"
        name="gender"
        className={`text-xs w-full border bg-gray-50 p-2 border-gray-300 text-gray-900 rounded-lg ${
          className || ""
        }`}
        value={selectedGender}
        onChange={handleGenderChange}
      >
        <option value="">Choose Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
};

export default GenderSelect;
