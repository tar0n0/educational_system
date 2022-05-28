// You can only write reusable functions in this module
export const createGuid = () => {
    const unique = (l) => Math.random().toString(16).slice(2, l);

    return unique(10) + '-' + unique(6) + '-' + unique(6) + '-' + unique(6) + '-' + unique(14);
};

export const removeKeyFromObject = (obj, ...keys) => {
    return Object.keys(obj).reduce((acc, curr) => {
        return {
            ...acc,
            ...(keys.includes(curr) ? {} : { [curr]: obj[curr] }),
        };
    }, {});
};

export const parseJwt = (token) => {
    let base64Url = token && token?.split('.')[1];
    let base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = token && decodeURIComponent(atob(base64)?.split('')?.map((c) => {
        return '%' + ('00' + c?.charCodeAt(0)?.toString(16))?.slice(-2);
    })?.join(''));
    return token ? JSON.parse(jsonPayload) : null;
};

export const downloadFile = (url, fileName = 'data.pdf') => {
    const hiddenElement = document.createElement('a');
    hiddenElement.href = url;
    hiddenElement.target = '_blank';
    hiddenElement.download = fileName;
    hiddenElement.click();
};

export const reandomGeneratorEmail = () => {
    let chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let string = '';
    for(let ii=0; ii<15; ii++){
        string += chars[Math.floor(Math.random() * chars.length)];
    }

    return `${string}@gmail.com`;
};

export const deepEqual = (obj_1, obj_2) => {
    if (obj_1 === obj_2) return true;

    if (
        typeof obj_1 !== 'object' ||
        typeof obj_2 !== 'object' ||
        obj_1 == null ||
        obj_2 == null
    ) {
        return false;
    }

    const keysObj_1 = Object.keys(obj_1);
    const keysObj_2 = Object.keys(obj_2);

    if (keysObj_1.length !== keysObj_2.length) {
        return false;
    }

    let result = true;

    keysObj_1.forEach((key) => {
        if (!keysObj_2.includes(key)) {
            result = false;
        }

        if (
            typeof obj_1[key] === 'function' ||
            typeof obj_2[key] === 'function'
        ) {
            if (obj_1[key].toString() !== obj_2[key].toString()) {
                result = false;
            }
        }

        if (!deepEqual(obj_1[key], obj_2[key])) {
            result = false;
        }
    });

    return result;
};

export const byObjectPropertySortingFunction = (propertyName) => (a, b) => a[propertyName]?.toLowerCase() < b[propertyName]?.toLowerCase()
    ? -1 : a[propertyName]?.toLowerCase() > b[propertyName]?.toLowerCase() ? 1 : 0;

export const existValueInArray = (array = [], key, value) => {
    if (!array) return;

    for (let i of array) {
        if (i[key] && value && i[key] === value) return i;
    }
};
