import Colors from '../../../../values/Colors';
import QRCodeStyling from "qr-code-styling";


const QrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    margin: 0,
    image: require('../../../../assets/images/logo_blue.jpg'),
    dotsOptions: {
        type: "rounded",
        gradient: {
            type: "linear",
            rotation: 150,
            colorStops: [
                {
                    offset: 0.3,
                    color: Colors.blue2
                },
                {
                    offset: 1,
                    color: Colors.violet
                }
            ]
        }
    },
    imageOptions: {
        crossOrigin: "extra rounded",
        margin: 20,
    },
    dotsOptionsHelper: {
        colorType: {
            single: true,
            gradient: false
        },
    },
    cornersSquareOptions: {
        type: "extra-rounded",
        gradient: {
            type: "linear",
            rotation: 180,
            colorStops: [
                {
                    offset: 0.15,
                    color: Colors.blue2
                },
                {
                    offset: 1,
                    color: Colors.violet
                }
            ]
        }
    },
    imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 4
    }
});

export default QrCode