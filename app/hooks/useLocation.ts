import { State, City } from 'country-state-city';

const useSaudiStates = () => {
  // ISO Code for Saudi Arabia
  const saudiArabiaIsoCode = 'SA';

  // Get all states in Saudi Arabia
  const formattedStates = State.getStatesOfCountry(saudiArabiaIsoCode).map((state) => ({
    value: state.isoCode, // ISO Code of the state
    label: state.name,
    countryCode: state.countryCode,
    latitude: state.latitude,
    longitude: state.longitude
  }));

  const getAll = () => formattedStates;

  const getByValue = (cityName: string) => {
    const cities = City.getCitiesOfCountry('SA');
    if (!cities) {
      return null;  // Or handle this case in another appropriate way
    }
    const foundCity = cities.find(city => city.name === cityName);
    return foundCity ? {
      //@ts-ignore 
      value: foundCity.isoCode,
      label: foundCity.name,
      countryCode: foundCity.countryCode,
      latitude: foundCity.latitude,
      longitude: foundCity.longitude
    } : null;
  }

  return {
    getAll,
    getByValue
  }
};

export default useSaudiStates;
