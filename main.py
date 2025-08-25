#!/usr/bin/env python3
"""
Flask app for HQTechTalk static website
"""
from flask import Flask, render_template, send_from_directory, abort
import os

# Create Flask app
app = Flask(__name__, 
            static_folder='.', 
            template_folder='.')

@app.route('/')
def index():
    """Serve the homepage"""
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Serve static files and HTML pages"""
    try:
        # Check if it's an HTML file without extension
        if '.' not in filename:
            html_filename = f"{filename}.html"
            if os.path.exists(html_filename):
                return send_from_directory('.', html_filename)
        
        # Serve the file as requested
        if os.path.exists(filename):
            return send_from_directory('.', filename)
            
        # If file doesn't exist, return 404
        abort(404)
        
    except Exception as e:
        print(f"Error serving {filename}: {e}")
        abort(404)

@app.route('/css/<path:filename>')
def serve_css(filename):
    """Serve CSS files"""
    return send_from_directory('css', filename)

@app.route('/js/<path:filename>')
def serve_js(filename):
    """Serve JavaScript files"""
    return send_from_directory('js', filename)

@app.route('/assets/<path:filename>')
def serve_assets(filename):
    """Serve asset files"""
    return send_from_directory('assets', filename)

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return "Page not found", 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return "Internal server error", 500

if __name__ == '__main__':
    # Development server
    app.run(host='0.0.0.0', port=5000, debug=True)