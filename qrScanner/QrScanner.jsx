import classes from './QrScanner.module.css'
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeLoaderStatus } from '../../../../redux/loaderSlice';
import QrReader from 'react-qr-reader';
import Border from '../../border/Border';


const QrScanner = (props) => {
    const ref = useRef(null);

    const closeCam = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true,
        });
        stream.getTracks().forEach(function (track) {
            track.stop();
            track.enabled = false;
        });
        ref.current.stopCamera()
    };

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(changeLoaderStatus(false))
    }, [])

    // ! изменить на redux
    const [result, setResult] = useState('No result');

    const handleError = (err) => {
        console.error(err)
    }

    const handleScan = (result) => {
        if (result) {
            setResult(result)
        }
    }


    return (
        <div className={classes.cameraWrapper} onClick={closeCam}>
            <QrReader
                ref={ref}
                delay={100}
                className={classes.camera}
                onError={handleError}
                onScan={handleScan}
            />
            <div className={classes.cameraContainer}>
                <div className={classes.cameraContainer__border}>
                    <Border top={true} left={true} />
                    <Border top={true} right={true} />
                </div>
                <div className={classes.cameraContainer__border}>
                    <Border bottom={true} left={true} />
                    <Border bottom={true} right={true} />
                </div>
            </div>
            <div className={classes.scannerResult}>{result}</div>
        </div>
    );
}

export default QrScanner;