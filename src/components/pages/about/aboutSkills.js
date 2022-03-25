import React from 'react';

const AboutJS = () => (
    <>
        <div className="mb-4 mb-sm-0 pr-sm-3 col-sm-6">
            <div className="media">
                <i className="fab fa-js-square icon-18 mr-3"></i>
                <div className="media-body">
                    <h4 className="m-0">Javascript</h4>
                    <p className="m-0">
                        Quasea minus animi sequi sit nostrum? Lorem ipsum dolor sit amet
                        consectetur adipisicing elit.
                    </p>
                </div>
            </div>
        </div>
    </>
);

const AboutReact = () => (
    <>
        <div className="mb-4 mb-sm-0 pl-sm-3 col-sm-6 ">
            <div className="media">
                <i className="fab fa-react icon-18 mr-3"></i>
                <div className="media-body">
                    <h4 className="m-0">React</h4>
                    <p className="m-0">
                        Ducimus facere vitae sapiente ab sit. Lorem ipsum dolor sit amet
                        consectetur adipisicing elit.
                    </p>
                </div>
            </div>
        </div>
    </>
);

const AboutRedux = () => (
    <>
        <div className="mb-4 mb-sm-0 pr-sm-3 col-sm-6">
            <div className="media">
                <i className="fas fa-desktop icon-18 mr-2"></i>
                <div className="media-body">
                    <h4 className="m-0">Redux</h4>
                    <p className="m-0">
                        Eaque voluptatibus dolores. Quod. Lorem dolor sit amet consectetur.
                        Minus, asperiores.
                    </p>
                </div>
            </div>
        </div>
    </>
);

const AboutFormik = () => (
    <>
        <div className="mb-0 pl-sm-3 col-sm-6">
            <div className="media">
                <i className="fab fa-canadian-maple-leaf mr-3"></i>
                <div className="media-body">
                    <h4 className="m-0">Formik</h4>
                    <p className="m-0">
                        Numquam saepe deserunt obcaecati? Doloribus. Lorem ipsum dolor sit
                        amet adipisicing elit.
                    </p>
                </div>
            </div>
        </div>
    </>
);


const AboutSkils = () => {
    return (
        <>
            <div className="about__skills">
                <div className="row no-gutters mb-0 mb-sm-4">
                    <AboutJS/>
                    <AboutReact/>
                </div>

                <div className="row no-gutters mb-0 mb-sm-4">
                    <AboutRedux/>
                    <AboutFormik/>
                </div>
            </div>
        </>
    );
};

export default AboutSkils;
