export const LOGIN = 'LOGIN'; //POST
export const REGISTRATION = 'REGISTRATION'; //POST
export const CONFIRMED_UNIVERSITY_USER = 'CONFIRMED_UNIVERSITY_USER'; // POST
export const CONFIRMED_COMPANY_USER = 'CONFIRMED_COMPANY_USER'; // POST
export const DELETE_USER = 'DELETE_USER'; // POST
export const UPLOAD_FILE = 'UPLOAD_FILE'; // POST
export const EDIT_USER_INFO = 'EDIT_USER_INFO'; // POST
export const DELETE_FILE = 'DELETE_FILE'; // POST
export const EDIT_FILE_NAME = 'EDIT_FILE_NAME'; // POST
export const COMPANY_REGISTRATION = 'COMPANY_REGISTRATION'; // POST
export const UNIVERSITY_REGISTRATION = 'UNIVERSITY_REGISTRATION'; // POST

export const UNIVERSITY_COUNTRIES = 'UNIVERSITY_COUNTRIES'; // GET
export const UNIVERSITY_CITIES = 'UNIVERSITY_CITIES'; // GET
export const COMPANY_COUNTRIES = 'COMPANY_COUNTRIES'; //GET
export const COMPANY_CITIES = 'COMPANY_CITIES'; // GET
export const COMPANY_NAME = 'COMPANY_NAME'; // GET
export const UNIVERSITY_NAME = 'UNIVERSITY_NAME'; // GET
export const COMPANY_CONFIRM_PROFILES = 'COMPANY_CONFIRM_PROFILES'; // GET
export const UNIVERSITY_CONFIRM_PROFILES = 'UNIVERSITY_CONFIRM_PROFILES'; // GET
export const USER_INFO = 'USER_INFO'; // GET
export const USER_MATERIALS = 'USER_MATERIALS'; // GET
export const DOWNLOAD_FILE = 'DOWNLOAD_FILE'; // GET
export const INPUT_SEARCH = 'INPUT_SEARCH'; // GET
export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES'; // GET
export const GET_ALL_CITIES = 'GET_ALL_CITIES'; // GET
export const GET_ALL_COMPANIES = 'GET_ALL_COMPANIES'; // GET
export const GET_ALL_UNIVERSITIES = 'Profile/GetUniversityNames'; // GET
export const EXTENDED_SEARCH_PATH = 'EXTENDED_SEARCH_PATH'; // GET
export const GET_ALL_USER_PROFILE_DATA = 'GET_ALL_USER_PROFILE_DATA'; // GET
export const SAVE_LOGO = 'SAVE_LOGO'; //POST

//TODO university Form and company form with endpoints /admin
//TODO user registration with endpoint only /registration
export const ENDPOINT_URLS = {
    [LOGIN]: '/authentication/login',
    [REGISTRATION]: '/authentication/register',
    [UNIVERSITY_REGISTRATION]: '/authentication/RegisterAdmin',
    [COMPANY_REGISTRATION]: '/authentication/RegisterAdmin',
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
    [UPLOAD_FILE]: '/file/upload',
    [USER_INFO]: '/Profile/GetUserInformations',
    [EDIT_USER_INFO]: '/profile/UpdateUserInformations',
    [USER_MATERIALS]: '/File/GetUserMateriales ',
    [DELETE_FILE]: '/File/DeleteFile',
    [DOWNLOAD_FILE]: '/File/DownloadFile',
    [EDIT_FILE_NAME]: '/File/Rename',
    [INPUT_SEARCH]: '/File/GetSearchMateriales',
    [GET_ALL_COUNTRIES]: '/Profile/GetCountries',
    [GET_ALL_CITIES]: '/Profile/GetCities',
    [GET_ALL_COMPANIES]: '/Profile/GetCompanyNames',
    [GET_ALL_UNIVERSITIES]: '/Profile/GetUniversityNames',
    [EXTENDED_SEARCH_PATH]: '/File/ExtendedSearch',
    [GET_ALL_USER_PROFILE_DATA]: (userId) => `/Profile/GetUserProfile?userId=${userId}`,
    [SAVE_LOGO]: '/File/SaveImageforregister',
};
