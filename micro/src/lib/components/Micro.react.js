import MicRecorder from "mic-recorder-to-mp3"
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faDownload, faStop, faCompactDisc} from '@fortawesome/free-solid-svg-icons'

const Micro = (props) => {
    const {id, fileUrl, setProps} = props;

    const [audioUrl, setAudioUrl] = useState('');
    const [fileLoc, setFileLoc] = useState('');
    const recorder = useRef(null) //Recorder
    const audioPlayer = useRef(null) //Ref for the HTML Audio Tag
    const [blobURL, setBlobUrl] = useState(null)
    const [audioFile, setAudioFile] = useState(null)
    const [isRecording, setIsRecording] = useState(null)

    useEffect(() => {
        //Declares the recorder object and stores it inside of ref
        recorder.current = new MicRecorder({ bitRate: 128 })
      }, [])
    
    const startRecording = () => {
    // Check if recording isn't blocked by browser
    recorder.current.start().then(() => {
        setIsRecording(true)
    })
    }
    
      const stopRecording = () => {
        recorder.current
          .stop()
          .getMp3()
          .then(([buffer, blob]) => {
            const file = new File(buffer, "audio.mp3", {
              type: blob.type,
              lastModified: Date.now(),
            })
            const newBlobUrl = URL.createObjectURL(blob)
            setBlobUrl(newBlobUrl)
            setIsRecording(false)
            setAudioFile(file)
            // console.log(file)

            const url = URL.createObjectURL(blob);
            setAudioUrl(url);
                            
            // Upload the audio file to the server in case you want to do something with it later
            // not needed unless the audio file should be processed further, e.g. transcription
            // REQUIRES THE APP TO HAVE THE SERVER ROUTE 'upload_audio' DEFINED
            const formData = new FormData();
            formData.append('audioFile', blob, 'recording.mp3');
        
            try {
                const response = axios.post('/upload_audio', formData, {});
                return response

            } catch (error) {
                console.error('Error uploading the file:', error);
                console.log("Did you forget to define the @server.route in your dash app?")
            }   
    
          })
          .then((response) => {
            setFileLoc(response.data.fileLoc)
            console.log("file successfully uploaded to server!")
          })
          .catch((e) => console.log(e))

    }

    return (
        <div id={id} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', flex: 1 }}>
                <div className="AudioButtons" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    <button disabled={isRecording} onClick={startRecording}>
                        Record <FontAwesomeIcon icon={faCompactDisc} />
                    </button>
                    <button disabled={!isRecording} onClick={stopRecording}>
                        Stop <FontAwesomeIcon icon={faStop} />
                    </button>
                    {audioUrl ? (
                        <a download href={blobURL}>
                            <button>Download <FontAwesomeIcon icon={faDownload} /></button>
                        </a>
                    ) : null}
                </div>
    
                {audioFile ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <audio ref={audioPlayer} src={blobURL} controls='controls' />
                    </div>
                ) : null}
            </div>
    
            {fileLoc ? setProps({ fileUrl: fileLoc }) : null}
        </div>
    );
    

    // return (
    //     <div id={id}>

    //             <div>
    //                 <div className="AudioButtons">
    //                     <button disabled={isRecording} onClick={startRecording}>
    //                         Record <FontAwesomeIcon icon={faCompactDisc} />
    //                     </button>
    //                     <button disabled={!isRecording} onClick={stopRecording}>
    //                         Stop <FontAwesomeIcon icon={faStop} />
    //                     </button>
    //                     {audioUrl ? (
    //                         <a download href={blobURL}>
    //                             <button>Download <FontAwesomeIcon icon={faDownload} /></button>
    //                         </a>
    //                     ) : null}
    //                 </div>

    //                 {audioFile ? (
    //                     <div>
    //                         <audio ref={audioPlayer} src={blobURL} controls='controls' />
    //                     </div>
    //                 ) : null}
    //             </div>

    //             {fileLoc? setProps({ fileUrl: fileLoc }) : null }

    //     </div>
    // );
}

Micro.defaultProps = {};

Micro.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * The URL for the temp audio file if you saved it to the server.
     */
    fileUrl: PropTypes.string,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func
};

export default Micro;