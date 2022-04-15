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
    let jsonPayload = decodeURIComponent(atob(base64)?.split('')?.map((c) => {
        return '%' + ('00' + c?.charCodeAt(0)?.toString(16))?.slice(-2);
    })?.join(''));
    return JSON.parse(jsonPayload);
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
