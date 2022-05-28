import React from 'react';
import DataService from '../../../../services/dataService';

const ExtraComponent = () => {
    const data = DataService.getAnnouncement.getValue();
    if(data?.content) {
        return (
            <>
                <div className="posts">
                    <h2 className="title-announcement">{data?.title}</h2>
                    {data?.content}
                    {/*<a href="#" className="style-6">Read More</a>*/}
                </div>
            </>
        );
    }
};

export default ExtraComponent;
