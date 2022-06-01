import React from 'react';
import DataService from '../../../../services/dataService';

const ExtraComponent = () => {
    const data = !DataService.getAnnouncement.getValue()?.content ? DataService.getCourses.getValue() : DataService.getAnnouncement.getValue();

    if (data?.content) {
        return (
            <>
                <div className="posts">
                    <h2 className="title-announcement">{data?.title}</h2>
                    {data?.content}
                    {/*<a href="#" className="style-6">Read More</a>*/}
                    <br /><br /><br />
                    <p>Author:: {data?.authorName} {data?.authorSurName}</p>
                </div>
            </>
        );
    }
};

export default ExtraComponent;
