"use client";
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { State, City } from 'country-state-city';

interface CitySelectProps {
  value?: CitySelectValue;
  onChange: (value: CitySelectValue | null) => void;
  countryCode?: string;
}

export type CitySelectValue = {
  value: string;
  latlng: number[];
  label: string;
};

const CitySelect: React.FC<CitySelectProps> = ({ countryCode = 'SA', value, onChange }) => {
  // Specify the type for options state
  const [options, setOptions] = useState<Array<CitySelectValue>>([]);

  useEffect(() => {
    const states = State.getStatesOfCountry(countryCode);
    const cityOptions = states.flatMap(state => {
      const cities = City.getCitiesOfState(countryCode, state.isoCode);
      return cities.map(city => ({
        value: city.name,
        label: `${state.name}, ${city.name}`, // Format: State, City
        latlng: [parseFloat(city.latitude ?? '0'), parseFloat(city.longitude ?? '0')] // Handle null/undefined values
      }));
    });
    setOptions(cityOptions);
  }, [countryCode]);

  const handleChange = (option: any) => {
    const newValue: CitySelectValue | null = option
      ? { value: option.value, label: option.label, latlng: option.latlng }
      : null;
    onChange(newValue);
  };

  return (
    <div>
      <Select
        options={options}
        placeholder="Select City"
        isClearable
        value={options.find(option => option.label === value?.label)}
        onChange={(value) => handleChange(value as CitySelectValue)}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        formatOptionLabel={(option: any) => (
          <div>{option.label}</div>
        )}
        // ... other props
      />
    </div>
  );
};

export default CitySelect;
