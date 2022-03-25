import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Grid,
    Typography
} from '@material-ui/core';
import Checkbox from '../../sharedComponents/checkbox';
import Button from '../../sharedComponents/button';
import UploadInput from '../../sharedComponents/uploadedFile';
import TextfieldWrapperWrapper from '../../sharedComponents/textField';

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(8),
    },
}));

const INITIAL_FORM_STATE = {
    fileName: '',
    fileType: '',
    keyword: '',
    file: '',
    isFile: '',
};

const FORM_VALIDATION = Yup.object().shape({
    fileName: Yup.string()
        .required('Username is not allowed to be empty.'),
    fileType: Yup.string()
        .required('Username is not allowed to be empty.'),
    keyword: Yup.string()
        .required('Username is not allowed to be empty.')
});

const Materials = () => {
    const [file, setFile] = useState();
    const classes = useStyles();

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Container maxWidth="md">
                        <div className={classes.formWrapper}>

                            <Formik
                                initialValues={{
                                    ...INITIAL_FORM_STATE
                                }}
                                validationSchema={FORM_VALIDATION}
                                onSubmit={values => {
                                    console.log(values);
                                }}
                            >
                                <Form>

                                    <Grid container spacing={2}>

                                        <Grid item xs={12}>
                                            <TextfieldWrapperWrapper
                                                name="fileName"
                                                label="File Name *"
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextfieldWrapperWrapper
                                                name="fileType"
                                                label="File Type *"
                                            />

                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextfieldWrapperWrapper
                                                name="keyword"
                                                label="Keyword *"
                                            />

                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography>
                                                <span className="typography-text">  Uploaded Files</span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <UploadInput
                                                className={'pdfInput'}
                                                accept={
                                                    'application/pdf,application/vnd.ms-excel'
                                                }
                                                setFile={setFile}
                                            />
                                            <Checkbox
                                                name="isFile"
                                                label="Private File"
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Button>
                                                Submit Form
                                            </Button>
                                        </Grid>


                                    </Grid>

                                </Form>
                            </Formik>

                        </div>
                    </Container>
                </Grid>
            </Grid>
        </>
    );
};

export default Materials;
