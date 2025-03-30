import React, { useRef, useState } from 'react'
import './Qrcode.css'
const App = () => {
    const [img, setimg] = useState("")
    const [loading, setloading] = useState(false)
    const [qrdata, setqrdata] = useState("")
    const [qrsize, setqrsize] = useState()
    const [errorsec, seterrorsec] = useState("");
    const [success, setsuccess] = useState("")
    const changed = useRef("")
    function onclicking() {
        if (!qrdata) {
            seterrorsec("Please provide data for the QR code !");
            let input = document.getElementById("dataInput")
            input.style.border = "solid red 2px"
            changed.current.placeholder = "Data Required!"
            setimg("")
            return;
        } else if (!qrsize) {
            seterrorsec("Please provide the size for the QR code !");
            let input = document.getElementById("sizeInput")
            input.style.border = "solid red 2px"
            setimg("")
            changed.current.placeholder = "Size required!"
            return;
        }
        seterrorsec("");
        setloading(true)
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`
            setsuccess("Take you QR CODE")
            let input = document.getElementById("dataInput")
            input.style.border = "solid rgb(58, 174, 0) 2px"
            let Sizeinput = document.getElementById("sizeInput")
            Sizeinput.style.border = "solid  rgb(58, 174, 0) 2px"
            setimg(url)
            console.log("running");
            
        } catch (error) {
            console.log('error QR', error);

        } finally {
            setloading(false)
        }
    }
    function clear() {
        setimg("")
        setqrdata("")
        setqrsize("")
        setsuccess("")
        changed.current.placeholder = ""
        seterrorsec("")
        let input = document.getElementById("dataInput")
        input.style.border = "solid rgb(58, 174, 0) 2px"
        let Sizeinput = document.getElementById("sizeInput")
        Sizeinput.style.border = "solid  rgb(58, 174, 0) 2px"
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
                    {errorsec && <p className="error">{errorsec}</p>}
                    {success && <h1>Take Your QR CODE</h1>}
                    {loading && <p>Please Wait....</p>}
                    {img && <img src={img} className='Qrimage' />}
                    <div>
                        <label htmlFor="dataInput" className='input-lable'>Data for Qr code</label>
                        <input type="text" ref={changed} value={qrdata} id='dataInput' onChange={(event) => setqrdata(event.target.value)} />
                        <label htmlFor="sizeInput" className='input-lable'>Img Size(e.g.,150)</label>
                        <input type="number" value={qrsize} ref={changed} id='sizeInput' onChange={(event) => setqrsize(event.target.value)} />
                        <button className='generate-button' onClick={onclicking}>Generate QR Code</button>
                        <button className='download-button' onClick={download}>Download QR Code</button>
                        <button style={{ color: "black" }} onClick={clear}>Reset</button>
                        <p style={{ textAlign: "right" }}>@By Vignesivam</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App