export const setStorageItem = (key = '', value = {}) => {
    const dataByKey = getStorageItem(key);
    const mergedData = { ...dataByKey, ...value };
    localStorage.setItem(key, JSON.stringify(mergedData));
};

export const getStorageItem = (key = '') => {
    const dataByKey = localStorage.getItem(key);
    return JSON.parse(dataByKey);
};

export const removeStorageItem = (key = '') => {
    switch (true) {
        case !!key && key.includes('.'): {
            const paths = key.split('.');
            const dataByKey = getStorageItem(paths[0]);
            delete dataByKey[paths[1]];
            getStorageItem(paths[0], dataByKey);
            break;
        }
        case !!key: {
            localStorage.removeItem(key);
            break;
        }
        default:
            localStorage.clear();
            break;
    }
};

