import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Load the pre-trained model
try:
    with open('house_price_prediction_model.pkl', 'rb') as model_file:
        model = pickle.load(model_file)
except Exception as e:
    print(f"Error loading the model: {e}")
    model = None

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model is not loaded properly'}), 500

    data = request.get_json()
    
    try:
        # Extract features from the request data
        sallesDeBain = int(data['sallesDeBain'])
        surface = int(data['surface'])
        chambres = int(data['chambres'])
        salons = int(data['salons'])
        secteur = data['secteur']
        
        # Create a DataFrame for prediction
        features = pd.DataFrame([[sallesDeBain, surface, chambres, salons, secteur]],
                                columns=['SalleDeBain', 'surface', 'chambres', 'salons', 'Secteur'])
        
        # Predict the price using the model
        predicted_price = model.predict(features)[0]
        
        return jsonify({'predictedPrice': predicted_price})
    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({'error': 'Error during prediction'}), 500

if __name__ == '__main__':
    app.run(debug=True)
