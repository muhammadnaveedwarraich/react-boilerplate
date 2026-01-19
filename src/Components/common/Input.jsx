import React, { useState } from "react";
import Select from "react-select";
import { ShowPasswordSvg, UploadSvg, CalendarSvg } from "../assets/svgs";

function Input(
  {
    type = "text",
    placeholder = "",
    value,
    onChange,
    name,
    className = "",
    error = "",
    checked,
    label = "",
    labelClassName = "",
    required = false,
    isMulti = false,
    options = [],
    accept,
    disable = false,
  },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const isCheckbox = type === "checkbox";
  const isRadio = type === "radio";
  const isSwitch = type === "switch";
  const isSelect = type === "select";
  const isFile = type === "file";
  const isDate = type === "date";
  const isTime = type === "time";
  const inputType = isPassword && showPassword ? "text" : type;

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: disable ? "#1a1b23" : "#21222d",
      borderColor: error ? "#ef4444" : "#6b7280",
      borderWidth: "1px",
      borderRadius: "6px",
      minHeight: "50px", // Increased height
      fontSize: "16px", // Increased font size
      boxShadow: "none",
      opacity: disable ? 0.6 : 1,
      cursor: disable ? "not-allowed" : "default",
      "&:hover": {
        borderColor: error ? "#ef4444" : "#6b7280",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0 16px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: disable ? "#6b7280" : "#9ca3af",
      fontSize: "16px", // Increased font size
    }),
    singleValue: (provided) => ({
      ...provided,
      color: disable ? "#6b7280" : "#ffffff",
      fontSize: "16px", // Increased font size
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: disable ? "#6b7280" : "#cbb246",
      borderRadius: "4px",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#ffffff",
      fontSize: "14px", // Slightly increased
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#ffffff",
      "&:hover": {
        backgroundColor: disable ? "#6b7280" : "#cbb246",
        color: "#ffffff",
        cursor: disable ? "not-allowed" : "pointer",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#374151",
      border: "1px solid #6b7280",
      borderRadius: "6px",
      marginTop: "4px",
      zIndex: 50,
    }),
    menuList: (provided) => ({
      ...provided,
      padding: "0",
      maxHeight: "160px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "none",
      color: "#ffffff",
      fontSize: "16px", // Increased font size
      padding: "10px 16px", // Increased padding
      cursor: "pointer",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#9ca3af",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "#9ca3af",
    }),
    input: (provided) => ({
      ...provided,
      fontSize: "16px", // Increased font size for input text
      color: disable ? "#6b7280" : "#ffffff",
    }),
  };

  const renderInput = () => {
    if (type === "textarea") {
      return (
        <textarea
          ref={ref}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disable}
          className={`w-full px-4 py-3 border rounded-md resize-none focus:outline-none text-lg placeholder:text-lg ${
            error ? "border-red-500" : "border-gray-300"
          } ${
            disable ? "opacity-60 cursor-not-allowed bg-gray-800" : ""
          } ${className}`}
          rows={4}
        />
      );
    }

    if (isCheckbox) {
      return (
        <div className="flex items-center space-x-2">
          <input
            ref={ref}
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
            disabled={disable}
            className={`h-5 w-5 rounded-sm border-gray-300 text-primary focus:outline-none checked:bg-primary accent-white ${
              disable ? "opacity-60 cursor-not-allowed" : ""
            } ${className}`}
          />
          <span className={`text-lg text-white ${disable ? "opacity-60" : ""}`}>
            {placeholder}
          </span>
        </div>
      );
    }

    if (isRadio) {
      return (
        <div className={"flex flex-wrap gap-4 " + className}>
          {options?.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-center px-6 py-3 rounded-md border cursor-pointer text-white text-lg ${
                value === opt.value
                  ? "border-primary text-primary bg-primary/20"
                  : "border-white/50"
              } ${disable ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              <input
                ref={ref}
                type="radio"
                name={name}
                value={opt.value}
                checked={value === opt.value}
                onChange={onChange}
                disabled={disable}
                className="hidden"
              />
              <span className="flex items-center gap-2">
                <span
                  className={`h-5 w-5 rounded-full border ${
                    value === opt.value
                      ? "border-primary bg-primary"
                      : "border-white"
                  } inline-block`}
                ></span>
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      );
    }

    if (isSwitch) {
      return (
        <div className="relative inline-block w-12 h-6">
          <input
            ref={ref}
            id={`switch-${name}`}
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
            disabled={disable}
            className={`peer appearance-none w-12 h-6 bg-gray border border-primary rounded-full checked:bg-primary cursor-pointer transition-colors duration-300 ${
              disable ? "opacity-60 cursor-not-allowed" : ""
            } ${className}`}
          />
          <label
            htmlFor={`switch-${name}`}
            className={`absolute top-0 left-0 w-6 h-6 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer ${
              disable ? "opacity-60 cursor-not-allowed" : ""
            }`}
          />
        </div>
      );
    }

    if (isSelect) {
      const [menuIsOpen, setMenuIsOpen] = useState(undefined); // control menu state

      const handleSelectChange = (selectedOption) => {
        if (disable) return;

        onChange(selectedOption || (isMulti ? [] : null));

        // Auto-close dropdown when all options are selected
        if (isMulti) {
          const selectedValues = Array.isArray(selectedOption)
            ? selectedOption.map((v) => v.value)
            : [];

          const allSelected = selectedValues.length === options.length;

          if (allSelected) {
            setMenuIsOpen(false);
          }
        } else {
          setMenuIsOpen(false); // close on single select
        }
      };

      const getSelectedValue = () => {
        if (isMulti) {
          if (Array.isArray(value)) {
            if (
              value.length > 0 &&
              typeof value[0] === "object" &&
              value[0].hasOwnProperty("label")
            ) {
              return value;
            } else {
              return options.filter((opt) => value.includes(opt.value));
            }
          }
          return [];
        } else {
          if (
            value &&
            typeof value === "object" &&
            value.hasOwnProperty("label")
          ) {
            return value;
          } else {
            return options.find((opt) => opt.value === value) || null;
          }
        }
      };

      return (
        <div className={`w-full text-start ${className}`}>
          <Select
            ref={ref}
            name={name}
            options={options}
            value={getSelectedValue()}
            onChange={handleSelectChange}
            isMulti={isMulti}
            placeholder={placeholder}
            styles={selectStyles}
            isSearchable
            isClearable
            closeMenuOnSelect={!isMulti}
            hideSelectedOptions
            classNamePrefix="react-select"
            menuIsOpen={menuIsOpen}
            onMenuOpen={() => !disable && setMenuIsOpen(true)}
            onMenuClose={() => setMenuIsOpen(undefined)}
            blurInputOnSelect={!isMulti}
            backspaceRemovesValue={true}
            isDisabled={disable}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.target.blur();
              }
            }}
            filterOption={(option, inputValue) => {
              if (!inputValue) return true;
              return option.label
                .toLowerCase()
                .includes(inputValue.toLowerCase());
            }}
            noOptionsMessage={() => "No options found"}
          />
        </div>
      );
    }

    if (isDate) {
      return (
        <div className="relative w-full">
          <input
            ref={ref}
            type="date"
            name={name}
            value={value}
            onChange={onChange}
            disabled={disable}
            className={`w-full px-4 py-3 pr-12 text-white border rounded-md focus:outline-none text-lg placeholder:text-lg ${
              error ? "border-red-500" : "border-gray-300"
            } ${
              disable ? "opacity-60 cursor-not-allowed bg-gray-800" : ""
            } ${className}`}
          />
          <span
            className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none ${
              disable ? "opacity-60" : ""
            }`}
          >
            <CalendarSvg />
          </span>
        </div>
      );
    }

    if (isTime) {
      return (
        <input
          ref={ref}
          type="time"
          name={name}
          value={value}
          onChange={onChange}
          disabled={disable}
          className={`w-full px-4 py-3 text-white border rounded-md focus:outline-none text-lg placeholder:text-lg time-input-white ${
            error ? "border-red-500" : "border-gray-300"
          } ${
            disable ? "opacity-60 cursor-not-allowed bg-gray-800" : ""
          } ${className}`}
        />
      );
    }

    if (isFile) {
      const fileName = value?.[0]?.name || "";
      return (
        <div className="space-y-2">
          <label
            className={`border-2 border-dashed border-yellow-400 rounded-md flex items-center justify-center w-full h-20 text-yellow-400 cursor-pointer hover:bg-yellow-500/10 transition-colors ${
              disable
                ? "opacity-60 cursor-not-allowed hover:bg-transparent"
                : ""
            }`}
          >
            <div className="flex gap-2 items-center">
              <UploadSvg className="mb-1" />
              <span className="truncate max-w-xs text-lg">
                {fileName || placeholder || "Upload your File"}
              </span>
            </div>
            <input
              ref={ref}
              type="file"
              name={name}
              accept={accept}
              onChange={onChange}
              disabled={disable}
              className="hidden"
            />
          </label>
        </div>
      );
    }

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disable}
          className={`w-full px-4 py-1 text-white border rounded-md focus:outline-none placeholder:text-lg ${
            error ? "border-red-500" : "border-gray-300"
          } ${
            disable ? "opacity-60 cursor-not-allowed bg-gray-800" : ""
          } ${className}`}
          style={{ fontSize: "20px" }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => !disable && setShowPassword((prev) => !prev)}
            disabled={disable}
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${
              disable ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            <ShowPasswordSvg
              visible={showPassword}
              className="cursor-pointer text-white"
            />
          </button>
        )}
      </div>
    );
  };

  return (
    <div>
      {label && type !== "switch" && (
        <label
          htmlFor={name}
          className={`block mb-2 text-lg font-medium text-white ${
            disable ? "opacity-60" : ""
          } ${labelClassName}`}
        >
          {label} {required && <span className="text-red-500 text-xl">*</span>}
        </label>
      )}

      <div
        className={`${
          type === "switch" ? "flex items-center gap-2" : ""
        } ${className}`}
      >
        {type === "switch" && label && (
          <label
            htmlFor={`switch-${name}`}
            className={`text-lg text-white font-medium ${
              disable ? "opacity-60" : ""
            } ${labelClassName}`}
          >
            {label}
          </label>
        )}
        {renderInput()}
      </div>

      {error && <p className="text-lg text-start text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default React.forwardRef(Input);
