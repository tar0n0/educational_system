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
