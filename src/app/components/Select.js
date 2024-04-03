import React from "react";

// Assuming these are the correct imports for your UI library
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectDropdown({ options, formik, name }) {
  return (
    <>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a value" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                onclick={() => formik.setFieldValue(name, option.value)}
              >
                <SelectLabel>{option.label}</SelectLabel>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {formik.errors[name] && formik.touched[name] && (
        <div className="text-red-500 text-sm">{formik.errors[name]}</div>
      )}
    </>
  );
}

export default SelectDropdown;
