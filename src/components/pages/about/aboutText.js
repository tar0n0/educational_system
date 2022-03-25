import React from 'react';
import AboutSkils from './aboutSkills';

const AboutText = () => {
    return (
        <>
            <div className="col-md-8">
                <div className="about__text mb-5 mb-sm-4 mb-md-4">
                    <h3>Event Website</h3>
                    <p className="m-0">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nulla
                        rerum doloribus qui, neque placeat veniam est deserunt eum aperiam
                        quia, ab fuga sed? Commodi laboriosam nulla hic amet sint.
                    </p>
                </div>
                <AboutSkils/>
            </div>
        </>
    );
};
export default AboutText;
