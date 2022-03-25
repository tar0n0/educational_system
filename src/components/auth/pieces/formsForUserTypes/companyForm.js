import React, {useState} from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import {makeStyles} from '@material-ui/core/styles';
import {
    Container,
    Grid,
    Typography
} from '@material-ui/core';
import Header from "../../../headerActions";
import "../../pieces/style.css";
import TextfieldWrapperWrapper from "../../../sharedComponents/textField";
import Checkbox from "../../../sharedComponents/checkbox";
import Button from "../../../sharedComponents/button";
import Select from "../../../sharedComponents/select";
import Footer from "../../../sharedComponents/footer/footer";
import UploadInput from "../../../sharedComponents/uploadedFile";
import {FORM_COMPANY_REGISTRATION_VALIDATOR} from "../../../../utils/validations";
import { INITIAL_COMPANY_REGISTRATION_STATE } from "../../../../constants/initialFormState.constants";

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(8),
    },
}));

const CompanyForm = ({isAllContent = true}) => {
    const [file, setFile] = useState();
    const classes = useStyles();
    console.log(file, "52");
    const handleSubmit = (params) => {}

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    {isAllContent && <Header/>}
                </Grid>
                <Grid item xs={12}>
                    <Container maxWidth="md">
                        <div className={classes.formWrapper}>
                            <Formik
                                initialValues={{
                                    ...INITIAL_COMPANY_REGISTRATION_STATE
                                }}
                                validationSchema={FORM_COMPANY_REGISTRATION_VALIDATOR}
                                onSubmit={values => {
                                    console.log(values);
                                }}
                            >
                                <Form>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography>
                                                {isAllContent &&
                                                    <span className='typography-text'>Create Account</span>}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Select
                                                name="country"
                                                label="Country"
                                                options={[]}
                                            />
                                            <Checkbox
                                                name="isCountry"
                                                label="Private Country"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Select
                                                name="city"
                                                label="City"
                                                options={[]}
                                            />
                                            <Checkbox
                                                name="isCity"
                                                label="Private City"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextfieldWrapperWrapper
                                                name="name"
                                                label="Name"
                                            />
                                            <Checkbox
                                                name="isName"
                                                label="Private Name"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextfieldWrapperWrapper
                                                name="link"
                                                label="Link"
                                            />
                                            <Checkbox
                                                name="isLink"
                                                label="Private Link"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography>
                                                <span className='typography-text'>  Uploaded Files</span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <UploadInput
                                                className={"pdfInput"}
                                                accept={
                                                    "application/pdf,application/vnd.ms-excel"
                                                }
                                                setFile={setFile}
                                            />
                                            <Checkbox
                                                name="isCV"
                                                label="Private CV"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <UploadInput
                                                className={"imageInput"}
                                                accept={"image/*"}
                                                setFile={setFile}
                                            />
                                            <Checkbox
                                                name="isImage"
                                                label="Private Image"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            {isAllContent && <TextfieldWrapperWrapper
                                                name="login"
                                                label="Login"
                                            />
                                            }
                                        </Grid>
                                        <Grid item xs={6}>
                                            {isAllContent ? (<>
                                                <TextfieldWrapperWrapper
                                                    name="password"
                                                    label="Password"
                                                />
                                            </>) : (<>
                                                <TextfieldWrapperWrapper
                                                    name="password"
                                                    label="New Password"
                                                />
                                            </>)}
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextfieldWrapperWrapper
                                                name="confirmPassword"
                                                label="Confirm Password"
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
            {isAllContent && <Footer/>}
        </>
    );
};

export default CompanyForm;
