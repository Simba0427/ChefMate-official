from flask import Flask, request, redirect, url_for, flash, render_template_string
import os
import requests

app = Flask(__name__)

app.secret_key = 'secret-key'

EDAMAM_API_ID = os.getenv('EDAMAM_API_ID', 'be749641')
EDAMAM_API_KEY = os.getenv('EDAMAM_API_KEY', '621e05b8958678dae648cfb93f0bd8b4')

HTML_TEMPLATE = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChefMate</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #f0f0f0;
        }
        .header {
            width: 100%;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 10px 20px;
            box-sizing: border-box;
            position: sticky;
            top: 0;
            z-index: 1000;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            color: #333;
        }
        .search-form {
            max-width: 600px;
            width: 100%;
            margin: 10px 0;
            padding: 10px;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border-radius: 20px;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
        }
        .search-form input[type="text"] {
            flex: 1;
            padding: 8px;
            border: none;
            outline: none;
            font-size: 16px;
        }
        .search-form button {
            padding: 8px 20px;
            margin-left: 10px;
            border: none;
            background-color: #4CAF50;
            color: white;
            font-size: 16px;
            cursor: pointer;
            border-radius: 20px;
            outline: none;
        }
        .search-form button:hover {
            background-color: #45a049;
        }
        .recipe-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 20px;
            padding: 0 20px;
        }
        .recipe {
            margin: 10px;
            padding: 10px;
            border: 1px solid #ccc;
            width: 200px;
            cursor: pointer;
            position: relative;
        }
        .recipe img {
            width: 100%;
            height: auto;
            display: block;
            margin-bottom: 10px;
        }
        .recipe-details-container {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            padding: 20px;
            box-sizing: border-box;
            max-width: 80%;
            max-height: 80%;
            overflow-y: auto;
        }
        .recipe.active .recipe-details-container {
            display: block;
        }
        .recipe-details {
            text-align: center;
        }
        .close-button {
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>ChefMate</h1>
        <form class="search-form" action="{{ url_for('search_recipes') }}" method="post">
            <input type="text" name="recipe_name" placeholder="Enter recipe name">
            <button type="submit">Search</button>
        </form>
    </div>
    <div class="recipe-container">
        {% for result in results %}
        <div class="recipe" onclick="toggleRecipeDetails(this)">
            <img src="{{ result['recipe']['image'] }}" alt="Recipe Thumbnail">
            <div class="recipe-details-container">
                <span class="close-button" onclick="toggleRecipeDetails(this.parentElement.parentElement)">
                    &times; Close
                </span>
                <img src="{{ result['recipe']['image'] }}" alt="Recipe Image">
                <div class="recipe-details">
                    <h3>{{ result['recipe']['label'] }}</h3>
                    <p><a href="{{ result['recipe']['url'] }}" target="_blank">{{ result['recipe']['source'] }}</a></p>
                </div>
                <p>Ingredients:</p>
                <ul>
                    {% for ingredient in result['recipe']['ingredients'] %}
                    <li>{{ ingredient['text'] }}</li>
                    {% endfor %}
                </ul>
            </div>
        </div>
        {% endfor %}
    </div>

    <script>
        function toggleRecipeDetails(recipe) {
            recipe.classList.toggle('active');
        }
    </script>
</body>
</html>
'''

@app.route('/')
def index():
    return render_template_string(HTML_TEMPLATE, results=[])

@app.route('/search', methods=['POST'])
def search_recipes():
    recipe_name = request.form.get('recipe_name')
    if not recipe_name:
        flash('Please enter a recipe name.', 'error')
        return redirect(url_for('index'))

    results = get_recipes(recipe_name)
    if results:
        return render_template_string(HTML_TEMPLATE, results=results)
    else:
        flash(f"No recipes found for '{recipe_name}'.", 'error')
        return redirect(url_for('index'))

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
