import React from "react";
import Select from "react-select";

const options = [
  { value: "family", label: "family" },
  { value: "friends", label: "friends" },
  { value: "co-workers", label: "co-workers" },
  { value: "", label: "general" },
];

const CustomSelect = ({ onChange, className, value }) => {
  return (
    <>
      <Select
        value={value}
        options={options}
        onChange={onChange}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "#55b298b3",
          },
        })}
        className={className}
      />
    </>
  );
};

export default CustomSelect;
