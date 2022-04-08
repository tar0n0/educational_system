// You can only write app specific functions in this module
import { USER_TYPE } from '../constants/ui.constants';
import DataService from '../services/dataService';


export const getData = (type = '') => {
    const { UNIVERSITY, COMPANY } = USER_TYPE || {};
    switch (type) {
        case UNIVERSITY:
            return [...DataService.universityCountries.getValue()];
        case COMPANY:
            return [...DataService.companyCountries.getValue()];
        default:
            return [];
    }
};


export const buildCountriesData = (val) => {
    const { data } = val;
    const currentData = [...data.map(el => ({
        name: el.countryName,
        id: el.countryId,
    }))];
    return currentData;
};

export const getNameById = (countries, countryId) => {
    return countries.find(el => el.id === countryId);
};

export const buildCitiesData = (val) => {
    const { data } = val;
    const currentData = [...data.map(el => ({
        name: el.cityName,
        id: el.cityId,
    }))];
    return currentData;
};

export const buildData = (val, isCompany = false) => {
    const { data } = val;
    const currentData = [...data.map(el => ({
        name: isCompany ? el.companyName : el.universityName,
        id: isCompany ? el.companyId : el.universityId,
    }))];
    return currentData;
};
