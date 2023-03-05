import './QrGenerator.module.css'
// import CaseContainer from '../components/UI/caseContainer/CaseContainer';
import { useDispatch } from 'react-redux';
import { changeLoaderStatus } from "../../../../redux/loaderSlice"
import React, { useEffect, useRef, useState } from "react";

import QrCode from './QrCode'


const QrGenerator = (props) => {

    const dispatch = useDispatch()
    const [url, setUrl] = useState('null');
    const [fileExt, setFileExt] = useState("png");
    const ref = useRef(null);

    useEffect(() => {
        dispatch(changeLoaderStatus(false))
        QrCode.append(ref.current);
    }, []);

    useEffect(() => {
        QrCode.update({
            data: url
        });
    }, [url]);

    const onUrlChange = (event) => {
        event.preventDefault();
        setUrl(event.target.value);
    };

    const onExtensionChange = (event) => {
        setFileExt(event.target.value);
    };

    const onDownloadClick = () => {
        QrCode.download({
            extension: fileExt
        });
    };

    return (
        <div className="QrCodeGenerator">
            <div className={'inputWrapper'}>
                <input value={url} onChange={onUrlChange} className={'inputBox'} />
                <select onChange={onExtensionChange} value={fileExt}>
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                    <option value="webp">WEBP</option>
                </select>
                <button onClick={onDownloadClick}>Download</button>
            </div>
            <div className='QrCode' ref={ref} />
        </div>
    );
}

export default QrGenerator;