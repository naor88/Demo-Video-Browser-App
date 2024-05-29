import React from "react";
// import { Genre } from "../models/Genre";
import MultiSelectDropdown from "./MultiSelectDropdown";

interface Props {
  years: number[];
  setSelectedYear: (year: number | undefined) => void;
  genres: string[];
  setSelectedGenres: (genres: string[]) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchSection: React.FC<Props> = ({
  years,
  setSelectedYear,
  genres,
  setSelectedGenres,
  handleSearchChange,
}) => {
  return (
    <div className="grid grid-cols-3 text-lg gap-x-4 rounded-md shadow-sm">
      <input
        className="border-2 p-2"
        type="text"
        placeholder="Search Video..."
        onChange={handleSearchChange}
      />
      <select
        id="years"
        name="years"
        className="block border-2 rounded-md shadow-sm p-4"
        onChange={(event) => {
          event.preventDefault();
          setSelectedYear(+event.target.value || undefined);
        }}
      >
        <option key={"empty_year"} value={""}>
          Search By Year...
        </option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <MultiSelectDropdown
        options={genres}
        updateSelectedOptions={setSelectedGenres}
      />
    </div>
  );
};

export default SearchSection;
