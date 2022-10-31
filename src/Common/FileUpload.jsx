import React, { useRef, useState } from 'react';
import axios from 'axios';

function FileUpload() {
    const [file, setFile] = useState('');
    const [data, getFile] = useState({ name: "", path: "" });
    const [progress, setProgress] = useState(0);

    const el = useRef();

    const handleChange = (e) => {
        setProgress(0)
        const file = e.target.files[0];
        setFile(file);
    }

    const uploadFile = () => {
        const formData = new FormData();
        formData.append('file', file);
        axios.post('http://localhost:4500/upload', formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                    ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgress(parseInt(progress));
            }
        }).then(res => {
            console.log(res);
            getFile({
                name: res.data.name,
                path: 'http://localhost:4500' + res.data.path
            })
        }).catch(err => console.log(err))}
    return (
        <div>
            <div className="file-upload">
                <input type="file" ref={el} onChange={handleChange} />
                <div className="progressBar" style={{ width: progress }}>
                    {progress}
                </div>
                <button onClick={uploadFile} className="uploadButton">
                    Upload
                </button>
            </div>
        </div>
    );
}
export default FileUpload;