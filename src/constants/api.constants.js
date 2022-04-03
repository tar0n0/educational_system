export const LOGIN = 'LOGIN'; //POST
export const REGISTRATION = 'REGISTRATION'; //POST
export const CONFIRMED_UNIVERSITY_USER = 'CONFIRMED_UNIVERSITY_USER'; // POST
export const CONFIRMED_COMPANY_USER = 'CONFIRMED_COMPANY_USER'; // POST
export const DELETE_USER = 'DELETE_USER'; // POST
export const UPLOAD_FILE = 'UPLOAD_FILE'; // POST

export const UNIVERSITY_COUNTRIES = 'UNIVERSITY_COUNTRIES'; // GET
export const UNIVERSITY_CITIES = 'UNIVERSITY_CITIES'; // GET
export const COMPANY_COUNTRIES = 'COMPANY_COUNTRIES'; //GET
export const COMPANY_CITIES = 'COMPANY_CITIES'; // GET
export const COMPANY_NAME = 'COMPANY_NAME'; // GET
export const UNIVERSITY_NAME = 'UNIVERSITY_NAME'; // GET
export const COMPANY_CONFIRM_PROFILES = 'COMPANY_CONFIRM_PROFILES'; // GET
export const UNIVERSITY_CONFIRM_PROFILES = 'UNIVERSITY_CONFIRM_PROFILES'; // GET
export const USER_INFO = 'USER_INFO';

export const ENDPOINT_URLS = {
    [LOGIN]: '/authentication/login',
    [REGISTRATION]: '/authentication/register',
    [UNIVERSITY_COUNTRIES]: '/university/getcountries',
    [COMPANY_COUNTRIES]: '/company/getcountries',
    [COMPANY_CITIES]: (countryName) => `/company/getcities?country=${countryName}`,
    [UNIVERSITY_CITIES]: (countryName) => `/university/getcities?country=${countryName}`,
    [COMPANY_NAME]: (countryName, cityName) => `/company/getnames?country=${countryName}&city=${cityName}`,
    [UNIVERSITY_NAME]: (countryName, cityName) => `/university/getnames?country=${countryName}&city=${cityName}`,
    [COMPANY_CONFIRM_PROFILES]: '/company/getnoneconfirmedemails',
    [UNIVERSITY_CONFIRM_PROFILES]: '/university/getnoneconfirmedemails',
    [CONFIRMED_UNIVERSITY_USER]: '/University/UpdateConfirmedEmails',
    [CONFIRMED_COMPANY_USER]: '/company/updateconfirmedemails',
    [DELETE_USER]: '/company/deletenoneconfirmedemails',
    [UPLOAD_FILE]: '/fileupload/upload',
    [USER_INFO]: '/Profile/GetUserInformations',
};
