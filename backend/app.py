from flask import Flask, request, jsonify
import os
import requests  # type: ignore
from dotenv import load_dotenv # type: ignore
from flask_cors import CORS # type: ignore
import base64
from PIL import Image
import io

load_dotenv() 
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

app.secret_key = 'secret-key'

EDAMAM_API_ID = os.getenv('EDAMAM_API_ID')
EDAMAM_API_KEY = os.getenv('EDAMAM_API_KEY')


@app.route('/search', methods=['POST'])
def search_recipes():
        data = request.get_json()  # Get JSON data from the request
        ingredient = data.get('recipe_name')  # Assume recipe_name is the ingredient name
        if not ingredient:
            return jsonify({'error': 'Please enter an ingredient name.'}), 400

        results = get_recipes(ingredient)
        if results:
            return jsonify({'results': results})
        else:
            return jsonify({'error': f"No recipes found for '{ingredient}'."}), 404

def get_recipes(query):
    url = f"https://api.edamam.com/search?q={query}&app_id={EDAMAM_API_ID}&app_key={EDAMAM_API_KEY}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return data.get('hits', [])
    except requests.exceptions.RequestException as e:
        print(f"Failed to fetch recipes for '{query}': {e}")
        return []


if __name__ == '__main__':
    app.run(debug=True)
