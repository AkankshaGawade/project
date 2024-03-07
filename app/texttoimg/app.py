from flask import Flask, render_template, request, jsonify
import replicate
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Setting up Replicate API token
os.environ['REPLICATE_API_TOKEN'] = 'r8_TkdELkGcPKMkq3aEUzA9WGKh2VBSTyj3kTKry'

# Add CORS support
# @app.after_request
# def after_request(response):
#     response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000/texttoimg')  # Replace with your frontend origin
#     response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
#     response.headers.add('Access-Control-Allow-Methods', 'POST')
#     return response

@app.route('/')
def index():
    return render_template('TextToImage.js')

@app.route('/generate_gif', methods=['POST'])
def generate_gif():
    user_input = request.json.get('user_input')
    print(user_input)
    try:
        output = replicate.run(
            "lucataco/hotshot-xl:78b3a6257e16e4b241245d65c8b2b81ea2e1ff7ed4c55306b511509ddbfd327a",
            input={
                "mp4": False,
                "seed": 6226,
                "steps": 30,
                "width": 672,
                "height": 384,
                "prompt": user_input,
                "scheduler": "EulerAncestralDiscreteScheduler",
                "negative_prompt": "blurry"
            }
        )
       
        print(output) 
        gif_url = output
        return jsonify({'gif_url': gif_url})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
