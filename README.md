# This is a component to record audio from a device's built-in microphone within a Dash app

It wraps the Node.js package ```mic-recorder-to-mp3```.

By default, the component will render with only a "Record" and a "Stop"  button. As soon as something has been recorded, the user will also see a button to download the audio, as well as audio controls for playback (conditional rendering based on the presence or absence of an existing recording).

Because the component has built-in recording, stop, and audio controls, there are no required input properties except for the id. The relevant output prop if you want to use the resulting recording is ```fileUrl```, which is only possible to use if the file is POSTed back to the server (see note below).

A couple of important things to know about this component: 

* If all you want to do is record audio in the browser and download the recordings, you can install and use this component without defining a method to post the audio to the server. As soon as you want to do additional file processing that requires you to send the audio somewhere (e.g. sending it to a STT engine via API), you must add a server route to POST the file to the server to your app (see example usage.py file).

* The built-in JS method ```navigator.getUserMedi``` requires a secure connection (https) to work. ```localhost``` is secure by default, so if you are using this component locally, there is no extra work required here. If you are hosting your app under a publicly accessible IP, then you will need to host it with a secure connection.

