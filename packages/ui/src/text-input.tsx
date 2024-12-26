"use client";

import React from "react";

type PlaceholderInputProps = {
  placeholder: string;
  onChange?: (value: string) => void;
  label: string;
  ref?: React.RefObject<HTMLInputElement>;
};

export const TextInput = ({
  placeholder,
  onChange,
  label,
  ref,
}: PlaceholderInputProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className="pt-2">
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type="text"
        name={label}
        id={label}
        onChange={onChangeHandler}
        placeholder={placeholder}
        aria-placeholder={placeholder}
        ref={ref}
      />
    </div>
  );
};
