import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from flask import Flask, request, jsonify
import xgboost as xgb
import pickle
import os

app = Flask(__name__)

# Load the trained model and label encoders
try:
    model = xgb.XGBRegressor()
    model.load_model('xgb_model.json')  # Load JSON model
    label_encoders = pickle.load(open('label_encoders.pkl', 'rb'))
    original_values = pickle.load(open('original_values.pkl', 'rb'))
except FileNotFoundError:
    raise FileNotFoundError("Model or encoder files not found. Ensure 'xgb_model.json', 'label_encoders.pkl', and 'original_values.pkl' are in the working directory.")

# Define feature columns in the correct order
feature_columns = [
    'comp_1', 'product_category_name', 'comp_2', 'comp_3', 'freight_price',
    'product_weight_g', 'qty', 'product_score', 'month', 'volume'
]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()
        
        # Validate input
        if not data or len(data) != len(feature_columns):
            return jsonify({'error': 'Invalid input. Provide all 10 features: ' + ', '.join(feature_columns)}), 400
        
        # Prepare input data
        user_data = {}
        
        # Process categorical features
        categorical_columns = ['product_category_name', 'month']
        for col in categorical_columns:
            value = data.get(col)
            if value not in original_values[col]:
                return jsonify({'error': f"Invalid value for {col}. Choose from: {list(original_values[col])}"}), 400
            user_data[col] = label_encoders[col].transform([value])[0]
        
        # Process numerical features
        numerical_columns = [col for col in feature_columns if col not in categorical_columns]
        for col in numerical_columns:
            try:
                user_data[col] = float(data.get(col))
            except (TypeError, ValueError):
                return jsonify({'error': f"Invalid value for {col}. Must be a number."}), 400
        
        # Create DataFrame with explicit column order
        user_df = pd.DataFrame([user_data])[feature_columns]
        
        # Make prediction
        predicted_price = model.predict(user_df)[0]
        
        return jsonify({'predicted_price': round(float(predicted_price), 2)})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/')
def home():
    # Convert NumPy arrays in original_values to lists for JSON serialization
    serializable_values = {key: value.tolist() if isinstance(value, np.ndarray) else value for key, value in original_values.items()}
    return jsonify({
        'message': 'Retail Price Prediction API',
        'features': feature_columns,
        'categorical_values': serializable_values
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))