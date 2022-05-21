import { string } from 'yup';
import * as Yup from 'yup';

const validate = (schema, value) => {
    try {
        schema.validateSync(value);
    } catch (err) {
        return err.message;
    }
};

export const usernameValidator = (value) => {
    const schema = string()
        .required('Username is not allowed to be empty.')
        .min(3, 'Your username must contain at least 3 characters')
        .max(100, 'Your username must be under 100 character')
        .matches(/^[A-Za-z][A-Za-z0-9_.]{3,100}$/img, 'Username must start with an uppercase or lowercase character and can contain numbers, underscore and dot');

    return validate(schema, value);
};

export const passwordValidator = (value) => {
    const schema = string()
        .required('Password is not allowed to be empty.')
        .min(10, 'Your password must contain at least 10 characters')
        .max(50, 'Your username must be under 50 character')
        .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/, 'Password must contain at least two uppercase character, two number and two symbol, two lowercase character');

    return validate(schema, value);
};

// export const emailValidation = (value) => {
//     const schema = string()
//         .required('Email is not allowed to be empty.')
//         .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email must be valid email');
//
//     return validate(schema, value);
// };

// export const loginValidation = (value) => {
//     const schema = string()
//         .required('Login is not allowed to be empty.')
//         .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Login must be valid login');
//
//     return validate(schema, value);
// };

export const firstNameValidator = (value) => {
    const schema = string()
        .required('Username is not allowed to be empty.')
        .min(3, 'Your username must contain at least 3 characters')
        .max(100, 'Your username must be under 100 character')
        .matches(/^[A-Za-z][A-Za-z0-9_.]{3,100}$/img, 'Username must start with an uppercase or lowercase character and can contain numbers, underscore and dot');

    return validate(schema, value);
};

export const surnameValidator = (value) => {
    const schema = string()
        .required('Username is not allowed to be empty.')
        .min(3, 'Your username must contain at least 3 characters')
        .max(100, 'Your username must be under 100 character')
        .matches(/^[A-Za-z][A-Za-z0-9_.]{3,100}$/img, 'Username must start with an uppercase or lowercase character and can contain numbers, underscore and dot');

    return validate(schema, value);
};

export const phoneValidator = (value) => {
    const schema = string()
        .required('Phone is not allowed to be empty.')
        // (123) 456-7890
        // (123)456-7890
        // 123-456-7890
        // 123.456.7890
        // 1234567890
        // +31636363634
        // 075-63546725
        .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, 'Phone number must be valid phone');

    return validate(schema, value);
};

export const LOGIN_VALIDATION = Yup.object().shape({
    login: Yup.string()
        .email('Invalid email.')
        .required('Email is not allowed to be empty.')
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email must be valid email'),
    password: Yup.string()
        .required('Password is not allowed to be empty.')
        .min(10, 'Your password must contain at least 10 characters')
        .max(50, 'Your username must be under 50 character')
        .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/, 'Password must contain at least two uppercase character,'),
    role: Yup.string()
        .required('Role is not allowed to be empty.')
});

export const EXTENDED_SEARCH_VALIDATION = Yup.object().shape({
    universityId: Yup.string()
        .required('UniversityId is not allowed to be empty.'),
    companyId: Yup.string()
        .required('CompanyId is not allowed to be empty.'),
    cityId: Yup.string()
        .required('CityId is not allowed to be empty.'),
    countryId: Yup.string()
        .required('CountryId is not allowed to be empty.'),
    name: Yup.string()
        .required('Name is not allowed to be empty.'),
    surName: Yup.string()
        .required('SurName is not allowed to be empty.'),
    fileName: Yup.string()
        .required('FileName is not allowed to be empty.'),
    fileType: Yup.string()
        .required('FileType is not allowed to be empty.'),
});

export const USER_REGISTRATION_VALIDATION = Yup.object().shape({
    name: Yup.string()
        .required('Username is not allowed to be empty.')
        // .min(3, 'Your username must contain at least 3 characters')
        .max(100, 'Your username must be under 100 character'),
    // .matches(/^[A-Za-z][A-Za-z0-9_.]{3,100}$/img, 'Username must start with an uppercase or lowercase character and can contain numbers, underscore and dot'),
    surname: Yup.string()
        .required('Username is not allowed to be empty.')
        // .min(3, 'Your username must contain at least 3 characters')
        .max(100, 'Your username must be under 100 character'),
    // .matches(/^[A-Za-z][A-Za-z0-9_.]{1,100}$/img, 'Username must start with an uppercase or lowercase character' +
    //     ' and can contain numbers, underscore and dot'),
    email: Yup.string()
        .email('Invalid email.')
        .required('Email is not allowed to be empty.')
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email must be valid email'),
    login: Yup.string()
        .email('Invalid email.')
        .required('Email is not allowed to be empty.')
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email must be valid email'),
    password: Yup.string()
        .required('Password is not allowed to be empty.')
        .min(10, 'Your password must contain at least 10 characters')
        .max(50, 'Your password must be under 50 character')
        .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/, 'Password must contain at least two uppercase character,' +
            ' two number and two symbol, two lowerca`se character'),
    newPassword: Yup.string()
        .required('New Password is not allowed to be empty.')
        .min(10, 'Your new password must contain at least 10 characters')
        .max(50, 'Your new password must be under 50 character')
        .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/, 'New password must contain at least two uppercase character,' +
            ' two number and two symbol, two lowercase character'),
    oldPassword: Yup.string()
        .required('New Password is not allowed to be empty.')
        .min(10, 'Your new password must contain at least 10 characters')
        .max(50, 'Your new password must be under 50 character')
        .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/, 'New password must contain at least two uppercase character,' +
            ' two number and two symbol, two lowercase character'),
    phone: Yup.string()
        // .required('Phone is not allowed to be empty.')
        // (123) 456-7890
        // (123)456-7890
        // 123-456-7890
        // 123.456.7890
        // 1234567890
        // +31636363634
        // 075-63546725
        .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, 'Phone number must be valid phone'),
    city: Yup.string()
        .required('Required'),
    image: Yup.string()
        .required('Required'),
    file: Yup.string()
        .required('Required'),
    country: Yup.string()
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const FORM_UNIVERSITY_REGISTRATION_VALIDATOR = Yup.object().shape({
    name: Yup.string()
        .required('Username is not allowed to be empty.')
        .min(3, 'Your username must contain at least 3 characters')
        .max(100, 'Your username must be under 100 character')
        .matches(/^[A-Za-z][A-Za-z0-9_.]{2,100}$/img, 'Username must start with an uppercase or lowercase character and can contain numbers, underscore and dot'),
    surname: Yup.string()
        .required('Username is not allowed to be empty.')
        .min(3, 'Your username must contain at least 3 characters')
        .max(100, 'Your username must be under 100 character')
        .matches(/^[A-Za-z][A-Za-z0-9_.]{2,100}$/img, 'Username must start with an uppercase or lowercase character and can contain numbers, underscore and dot'),
    city: Yup.string()
        .required('Required'),
    state: Yup.string()
        .required('Required'),
    country: Yup.string()
        .required('Required'),
    login: Yup.string()
        .email('Invalid email.')
        .required('Email is not allowed to be empty.')
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email must be valid email'),
    password: Yup.string()
        .required('Password is not allowed to be empty.')
        .min(10, 'Your password must contain at least 10 characters')
        .max(50, 'Your username must be under 50 character')
        .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/, 'Password must contain at least two uppercase character,' +
            ' two number and two symbol, two lowercase character'),
    confirmPassword: Yup.string()
        .required('Confirm Password is not allowed to be empty.'),
    image: Yup.string()
        .required('Required'),
    file: Yup.string()
        .required('Required'),
    link: Yup.string()
        .required('Required')
        .matches(/^(ftp|http|https):\/\/[^ "]+$/, 'Invalid url address.')
});

export const FORM_COMPANY_REGISTRATION_VALIDATOR = Yup.object().shape({
    name: Yup.string()
        .required('Company name is not allowed to be empty.')
        .min(3, 'Your username must contain at least 3 characters')
        .max(100, 'Your username must be under 100 character')
        .matches(/^[A-Za-z][A-Za-z0-9_.]{3,100}$/img, 'Username must start with an uppercase or lowercase character and can contain numbers, underscore and dot'),
    email: Yup.string()
        .email('Invalid email.')
        .required('Email is not allowed to be empty.')
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email must be valid email'),
    city: Yup.string()
        .required('Required'),
    state: Yup.string()
        .required('Required'),
    country: Yup.string()
        .required('Required'),
    login: Yup.string()
        .email('Invalid login.')
        .required('Login is not allowed to be empty.')
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email must be valid email'),
    password: Yup.string()
        .required('Password is not allowed to be empty.')
        .min(10, 'Your password must contain at least 10 characters')
        .max(50, 'Your username must be under 50 character')
        .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/, 'Password must contain at least two uppercase character,' +
            ' two number and two symbol, two lowercase character'),
    confirmPassword: Yup.string()
        .required('Confirm Password is not allowed to be empty.'),
    image: Yup.string()
        .required('Required'),
    file: Yup.string()
        .required('Required'),
    link: Yup.string()
        .required('Required')
        .matches(/^(ftp|http|https):\/\/[^ "]+$/, 'Invalid url address.')
});
