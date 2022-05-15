import React, { useState, useEffect } from 'react';
import classes from './upload.module.css';

const UploadInput = (props) => {
    const { fieldName, className, accept, allowView = true, setFile } = props;
    const [fileMessage, setFileMessage] = useState({});
    const [logoUrl, setLogoUrl] = useState('');
    const inputFileRef = React.useRef(null);

    const handleChangeImage = async (event) => {
        const target = event.target;
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            target.value = '';
        }
    };

    useEffect(() => {
        if (inputFileRef.current) {
            inputFileRef.current.addEventListener('change', handleChangeImage);
        }

    }, []);

    return (
        <div>
            <label className="file label-11">
                <input type="file" name="file"
                    className={className ? classes[className] : classes.customFileInput}
                    aria-label={''}
                    ref={inputFileRef}
                    accept={accept ? accept : 'image/x-png,image/gif,image/jpeg,image/svg'}
                />
            </label>
        </div>

    );
};

export default UploadInput;
