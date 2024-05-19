import micro
from dash import Dash, callback, html, Input, Output, State

import flask
from flask import request
from pathlib import Path
import os
from werkzeug.datastructures import FileStorage


app = Dash(__name__)
server = app.server

app.suppress_callback_exceptions=True

# Define a route for POST requests to '/upload_audio' if you want to send the file somewhere for processing.
# Note that this is not required if all you want to do is download the audio locally.
@server.route('/upload_audio', methods=['POST'])
def handle_upload():
    # print("file upload triggered!")
    if 'audioFile' not in request.files:
        return flask.jsonify({'error': 'No file part'}), 400
    
    file = request.files['audioFile']

    if file.filename == '':
        return flask.jsonify({'error': 'No selected file'}), 400
    if file:

        # Assume 'file' is your FileStorage object from the POST-ed file
        directory = '\\tmpfiles'
        os.listdir(directory)
        filename = file.filename
        file_path = os.path.join(directory, filename)

        # Check if the directory exists and create it if not
        if not os.path.exists(directory):
            os.makedirs(directory)

        # Check if file exists and remove it to ensure overwrite -- app was originally not overwriting the existing file
        if os.path.exists(file_path):
            os.remove(file_path)

        file.save(file_path)
        # print("returning saved file_path")

        return flask.jsonify({'message': 'File uploaded successfully', "fileLoc": file_path}), 200


app.layout = html.Div([
    micro.Micro(
        id='audioInput',
    ),
    html.Div(id='output'),
])


@callback(Output('output', 'children'), Input('audioInput', 'fileUrl'))
def display_output(value):

    if value is not None:

        return html.Div([
            html.P("You have saved the file at {}; use this fileUrl as the input to other functions.".format(value)),
        ])

if __name__ == '__main__':
    app.run_server(debug=True)
