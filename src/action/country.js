import { ADD_COUNTRY, REMOVE_COUNTRY, ADD_COUNTRYS } from "./action-types";

export const addCountrys = (country) => ({
  type: ADD_COUNTRYS,
  payload: country,
});

export const addCountry = (country) => ({
  type: ADD_COUNTRY,
  payload: country,
});

export const removeCountry = (countryId) => ({
  type: REMOVE_COUNTRY,
  payload: countryId,
});
