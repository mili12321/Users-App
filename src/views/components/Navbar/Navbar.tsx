import { useState, useEffect } from "react";
import "./Navbar.scss";
import MultiSelect from "./components/MultiSelect/MultiSelect";
import { createPortal } from "react-dom";

type Props = {
  url: string;
  setUrl: (url: string) => void;
};

interface Nationality {
  value: string;
  label: string;
}

const getNatString = (selectedNationalities: Nationality[]) => {
  const values = selectedNationalities.map((nat) => nat.value);
  values.sort((a, b) => a.localeCompare(b));
  const natString = values.join(",");
  return natString;
};

export const Navbar = ({ url, setUrl }: Props) => {
  const [selectedNationalities, setSelectedNationalities] = useState<
    Nationality[]
  >([]);
  const [shouldEnableFilterBtn, setshouldEnableFilterBtn] = useState(false);
  const [prevParamsString, setPrevParamsString] = useState("");

  const filterByNationalities = () => {
    setshouldEnableFilterBtn(false);
    const natStringParam = getNatString(selectedNationalities);
    setPrevParamsString(natStringParam);
    const apiUrl = new URL(url);
    if (
      selectedNationalities.length === 0 ||
      selectedNationalities?.[0]?.value === ""
    ) {
      apiUrl.searchParams.delete("nat");
    } else if (apiUrl.searchParams.has("nat")) {
      apiUrl.searchParams.set("nat", natStringParam);
    } else {
      apiUrl.searchParams.append("nat", natStringParam);
    }

    const newUrl: string = apiUrl.toString();

    setUrl(newUrl);
  };

  const handleMultiSelectChange = (selectedOptions: Nationality[]) => {
    setSelectedNationalities(selectedOptions);
  };

  useEffect(() => {
    const newStringParam = getNatString(selectedNationalities);

    if (prevParamsString !== newStringParam) {
      setshouldEnableFilterBtn(true);
    } else {
      setshouldEnableFilterBtn(false);
    }
  }, [prevParamsString, selectedNationalities]);

  return (
    <div className="navbar">
      <div className="logo">User App</div>

      {createPortal(
        <div className="filter-wrapper">
          <MultiSelect
            selectedNationalities={selectedNationalities}
            onChange={handleMultiSelectChange}
          />
          <div
            className={`filter-nationality-button ${
              shouldEnableFilterBtn ? "active" : ""
            }`}
            onClick={filterByNationalities}
          >
            Filter
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
