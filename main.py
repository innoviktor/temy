from flask import Flask, send_from_directory, send_file
import os

app = Flask(__name__, static_folder='.')

@app.route('/')
def index():
    return send_file('index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    # Check if it's a direct file request
    if os.path.isfile(filename):
        return send_file(filename)
    
    # Check if it's an HTML file without extension
    html_filename = filename + '.html'
    if os.path.isfile(html_filename):
        return send_file(html_filename)
    
    # Serve from subdirectories (css, js, images, etc.)
    try:
        directory = os.path.dirname(filename)
        file = os.path.basename(filename)
        if directory and os.path.isdir(directory):
            return send_from_directory(directory, file)
        else:
            return send_file(filename)
    except:
        return "File not found", 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)