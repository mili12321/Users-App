import React from "react";
import "./MultiSelect.scss";
import arrowIcon from "../../../../../assets/icons/arrow.svg";

interface Nationality {
  value: string;
  label: string;
}

const nationalitiesOptions: Nationality[] = [
  { value: "", label: "Clear Filter" },
  { value: "AU", label: "Australia (AU)" },
  { value: "BR", label: "Brazil (BR)" },
  { value: "CA", label: "Canada (CA)" },
  { value: "CH", label: "Switzerland (CH)" },
  { value: "DE", label: "Germany (DE)" },
  { value: "DK", label: "Denmark (DK)" },
  { value: "ES", label: "Spain (ES)" },
  { value: "FI", label: "Finland (FI)" },
  { value: "FR", label: "France (FR)" },
  { value: "GB", label: "United Kingdom (GB)" },
  { value: "IE", label: "Ireland (IE)" },
  { value: "IN", label: "India (IN)" },
  { value: "IR", label: "Iran (IR)" },
  { value: "MX", label: "Mexico (MX)" },
  { value: "NL", label: "Netherlands (NL)" },
  { value: "NO", label: "Norway (NO)" },
  { value: "NZ", label: "New Zealand (NZ)" },
  { value: "RS", label: "Serbia (RS)" },
  { value: "TR", label: "Turkey (TR)" },
  { value: "UA", label: "Ukraine (UA)" },
  { value: "US", label: "United States (US)" },
];

const getNatString = (selectedNationalities: Nationality[]) => {
  const values = selectedNationalities.map((nat) => nat.value);
  const natString = values.join(",");
  return natString;
};

interface MultiSelectProps {
  selectedNationalities: Nationality[];
  onChange: (selectedOptions: Nationality[]) => void;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  selectedNationalities,
  onChange,
}) => {
  const handleCheckboxChange = (value: string) => {
    const isSelected = selectedNationalities.some((nat) => nat.value === value);
    if (isSelected) {
      onChange(selectedNationalities.filter((nat) => nat.value !== value));
    } else {
      value === ""
        ? onChange([nationalitiesOptions.find((nat) => nat.value === value)!])
        : onChange([
            ...selectedNationalities.filter((nat) => nat.value !== ""),
            nationalitiesOptions.find((nat) => nat.value === value)!,
          ]);
    }
  };

  return (
    <div className="multi-select-dropdown">
      <div className="dropdown-title-wrapper">
        <div className="title-wrapper">
          <span>
            <span> Nationality: </span>
            {selectedNationalities?.[0]?.value === "" ||
            selectedNationalities.length === 0
              ? "All"
              : getNatString(selectedNationalities)}
          </span>
        </div>

        <img className="down" src={arrowIcon} alt="arrow-down" srcSet="" />

        <img className="up" src={arrowIcon} alt="arrow-down" srcSet="" />
      </div>

      <ul>
        {nationalitiesOptions.map((nationality, idx) => {
          const isSelected = selectedNationalities.some(
            (nat) => nat.value === nationality.value
          );
          return (
            <li key={idx}>
              {nationality.value === "" ? (
                <label
                  key={nationality.value}
                  className={`checkbox-label ${
                    isSelected || selectedNationalities.length === 0
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => {
                    handleCheckboxChange(nationality.value);
                  }}
                >
                  {nationality.label}
                </label>
              ) : (
                <label
                  key={nationality.value}
                  className={`checkbox-label ${isSelected ? "selected" : ""}`}
                >
                  <input
                    type="checkbox"
                    value={nationality.value}
                    checked={isSelected}
                    onChange={() => handleCheckboxChange(nationality.value)}
                  />

                  {nationality.label}
                </label>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MultiSelect;
