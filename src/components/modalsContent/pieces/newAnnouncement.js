import React, { useContext, useState } from 'react';
import { modalContext } from '../../../context/modalContext';


const NewAnnouncement = () => {
    const { setOpen } = useContext(modalContext);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    return (
        <>
            <div className="block-for-announcement">
                <p className="title-for-announcement-whr">Add new announcement</p>
                <input onChange={(e) => setTitle(e.target.value)} className="input-for-announcement" placeholder='Title...'/>
                <textarea onChange={e => setText(e.target.value)} className="textarea-for-announcement" placeholder='Pleas write your announcement'/>
            </div>
            <div className="delete-btn-group">
                <button onClick={() => setOpen(false)} className="btn-delete-1">Cancel</button>
                <button onClick={() => console.log()} className="btn-delete-2">Add</button>
            </div>
        </>
    );
};

export default NewAnnouncement;
