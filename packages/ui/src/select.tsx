import React from "react";

type SelectProps = {
  options: {
    key: string;
    value: string;
  }[];
  onSelect: (value: string) => void;
};

export const Select = ({ options, onSelect }: SelectProps) => {
  const handleOnSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(e.target.value);
  };

  return (
    <select
      onChange={handleOnSelect}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    >
      {options.map((option) => (
        <option key={option.key} value={option.key}>
          {option.value}
        </option>
      ))}
    </select>
  );
};
