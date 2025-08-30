import os
from flask import Flask, render_template, send_from_directory

app = Flask(__name__, 
            static_folder='.',
            static_url_path='/static')

# Configure secret key for sessions
app.secret_key = os.environ.get("SESSION_SECRET", "production-secret-key-change-me")

# Production configuration
app.config['ENV'] = 'production'
app.config['DEBUG'] = False

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    # Serve HTML files directly
    if filename.endswith('.html'):
        return send_from_directory('.', filename)
    
    # Serve other static files (CSS, JS, images, etc.)
    if '/' in filename:
        directory = filename.rsplit('/', 1)[0]
        file = filename.rsplit('/', 1)[1]
        return send_from_directory(directory, file)
    
    return send_from_directory('.', filename)

# Handle common static file routes
@app.route('/css/<path:filename>')
def serve_css(filename):
    return send_from_directory('css', filename)

@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory('js', filename)

@app.route('/images/<path:filename>')
def serve_images(filename):
    return send_from_directory('images', filename)

@app.route('/assets/<path:filename>')
def serve_assets(filename):
    return send_from_directory('assets', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)