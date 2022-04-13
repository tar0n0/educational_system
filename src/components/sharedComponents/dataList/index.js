import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import SimpleCard from '../../simplCard';

const useStyles = makeStyles(theme => ({
    pageTitle: {
        display: "block",
        margin: "16px 0px 32px 0px",
        width: "100%",
        justifyContent: "center",
        // textAlign: "center",
        color: "#194d94",
        fontFamily: "sans-serif",
        fontWeight: "normal",
        fontStyle: "italic",
        fontSize: "55px",
        marginTop: "20px",
        textAlign: "center",
    },
    cardsLayout: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gridGap: "30px",
        maxWidth: "900px",
        margin: "0 auto 20px"
    },
    cardsLayoutItem: {
        position: "relative"
    }
}));

const DataList = ({ data = [], title = '' }) => {
    const classes = useStyles();
    const [currentData, setCurrentData] = useState();
    useEffect(() => {
        setCurrentData(() => data?.map(el => {
            return {
                title: el?.fileName,
                url: `http://www.taceesmplatform.com/File/DownloadFile?filename=${el?.fileName.trim()}&usrId=${el?.userId}`
            };
        }));
    }, []);
    return (
        <>
            <main>
                <section className={classes.pageTitle}>
                    <Typography variant="h4">{'Search Data'}</Typography>
                </section>
                <section className={classes.cardsLayout}>
                    {currentData?.map((card, index) => (
                        <SimpleCard key={index} title={card?.title} url={card?.url} btnName='Download' classes={classes}/>
                    ))}
                </section>
            </main>
        </>
    );
};

export default DataList;
