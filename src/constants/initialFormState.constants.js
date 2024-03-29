export const INITIAL_LOGIN_FORM_STATE = {
    password: '',
    UserName: '',
};

export const INITIAL_EXTENDED_SEARCH_STATE = {
    universityId: '',
    companyId: '',
    cityId: '',
    countryId: '',
    name: '',
    surName: '',
    fileName: '',
    fileType: '',
};

export const removeExtraPropsForCompanyForm = ['universityId', 'isUniversity', 'confirmPassword'];
export const removeExtraPropsForUniversityForm = ['companyId', 'isCompany', 'confirmPassword'];

export const INITIAL_USER_REGISTRATION_STATE = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    cityId: '',
    file: '',
    image: '',
    countryId: '',
    password: '',
    link: '',
    isLink: false,
    confirmPassword: '',
    universityId: '',
    companyId: '',
    isUniversity: false,
    isCompany: false,
    isName: false,
    isSurname: false,
    isEmail: false,
    isPhoneNumber: false,
    isCountry: false,
    isCity: false,
    isCV: false,
    isImage: false,
};


export const INITIAL_UNIVERSITY_REGISTRATION_STATE = {
    name: '',
    link: '',
    country: '',
    city: '',
    cv: '',
    image: '',
    login: '',
    password: '',
    confirmPassword: '',
    isName: false,
    isLink: false,
    isCountry: false,
    isCity: false,
    isCV: false,
    isImage: false,
};


export const INITIAL_COMPANY_REGISTRATION_STATE = {
    name: '',
    email: '',
    link: '',
    country: '',
    city: '',
    cv: '',
    image: '',
    login: '',
    password: '',
    confirmPassword: '',
    isName: false,
    isEmail: false,
    isLink: false,
    isCountry: false,
    isCity: false,
    isCV: false,
    isImage: false,
};
