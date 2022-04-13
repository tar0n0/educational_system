import React, { createContext, useState } from 'react';

export const userIdContext = createContext();

const UserIdProvider = (props) => {
    const [userIds, setUserIds] = useState('');

    return (
        <userIdContext.Provider
            value={[userIds, setUserIds]}
        >
            {props.children}
        </userIdContext.Provider>
    );
};

export default UserIdProvider;
