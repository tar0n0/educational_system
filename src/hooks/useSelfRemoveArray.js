import React, { useState, useRef, useEffect } from 'react';

const useSelfRemoveArray = (deletionDelay, visibilityDelay) => {
    const [array, updateArray] = useState([]);
    const timers = useRef([]);

    useEffect(() => {
        timers.current.forEach(clearTimeout);
        timers.current = [];
    }, []);

    const deleteItem = (id) => {
        updateArray(arr => arr.filter(val => val.id !== id));
    };

    const hideItem = (id) => {
        updateArray(arr => {
            const index = arr.findIndex(val => val.id === id);
            if (index !== -1) {
                return [
                    ...arr.slice(0, index),
                    { ...arr[index], isVisible: false },
                    ...arr.slice(index + 1)
                ];
            }
            return arr;
        });
    };

    const addItem = (item) => {
        const id = Date.now();
        updateArray(val => [
            ...val,
            {
                id,
                ...item,
                ...(visibilityDelay ? { isVisible: true } : {})
            }
        ]);

        if (visibilityDelay) {
            timers.current.push(setTimeout(() => {
                hideItem(id);
            }, visibilityDelay));
        }

        if (deletionDelay) {
            timers.current.push(setTimeout(() => {
                deleteItem(id);
            }, deletionDelay));
        }
    };

    return [array, addItem, deleteItem, hideItem];
};

export default useSelfRemoveArray;
