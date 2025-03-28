import React, { useState } from 'react'
import './Qrcode.css'
const App = () => {
    const [img, setimg] = useState("")
    const [loading, setloading] = useState(false)
    const [qrdata, setqrdata] = useState("")
    const [qrsize, setqrsize] = useState()
    const [errorsec, seterrorsec] = useState("");
    const [success,setsuccess]=useState("")

    function onclicking() {
        if (!qrdata) {
            seterrorsec("Please provide data for the QR code !");
            return;
        } else if (!qrsize) {
            seterrorsec("Please provide the size for the QR code !");
            return;
        }
        seterrorsec("");
        setloading(true)
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`
            setsuccess("Take you QR CODE")
            setimg(url)
        } catch (error) {
            console.log('error QR', error);

        } finally {
            setloading(false)
        }
    }

    function download() {
        if (!qrdata || !qrsize) { 
            // Validation to ensure QR code data and size exist
            seterrorsec("Please generate the QR Code before downloading!");
            return;
        }
    
        if (!img) {
            seterrorsec("No QR Code to download! Please generate one first.");
            return;
        }
    
        seterrorsec(""); // Clear any error if validation passes
    
        fetch(img)
            .then((response) => response.blob())
            .then((blob) => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "QR.PNG";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.log("Error in downloading QR Code", error);
            });
    }
    
    return (
        <>
            <div className="main-container">
                <div className='app-container'>
                    <h1>QR code Generater</h1>
                    {loading && <p>Please Wait....</p>}
                    {errorsec && <p className="error">{errorsec}</p>}
                   {success && <h1>Take Your QR CODE</h1>}
                    {img && <img src={img} className='Qrimage' />}
                    <div>
                        <label htmlFor="dataInput" className='input-lable'>Data for Qr code</label>
                        <input type="text" value={qrdata} id='dataInput' onChange={(event) => setqrdata(event.target.value)} />
                        <label htmlFor="sizeInput" className='input-lable'>Img Size(e.g.,150)</label>
                        <input type="text" value={qrsize} id='sizeInput' onChange={(event) => setqrsize(event.target.value)} />
                        <button className='generate-button' disabled={loading} onClick={onclicking}>Generate QR Code</button>
                        <button className='download-button' onClick={download}>Download QR Code</button>
                        <p style={{textAlign:"right"}}>@By Vignesivam</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App