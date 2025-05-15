**Problem statement:** Our task is to develop a model that predicts the optimal price for a product based on various factors. This prediction would enable us to make an informed decision when pricing a product, leading to maximized sales and customer satisfaction.

**solution:** The machine learning model used in the provided code is Gradient Boosted Decision Trees,uses gradient boosting, where trees are built sequentially, and each tree focuses on reducing the residual errors of the ensemble.The model optimizes a loss function (in this case, squared error) using gradient descent to determine how to adjust predictions.

```
.
├── frontend/                # React Native frontend application
│   ├── .expo/              # Expo-specific project files
│   ├── assets/             # Static assets (images, fonts, etc.)
│   ├── components/         # Reusable UI components
│   ├── node_modules/       # Node.js packages (auto-generated)
│   ├── .gitignore          # Git ignore rules
│   ├── App.js              # Main app entry point
│   ├── app.json            # Expo configuration
│   ├── eas.json            # EAS (Expo Application Services) config
│   ├── index.js            # React Native entry point
│   ├── package.json        # Project metadata and dependencies
│   └── package-lock.json   # Exact dependency tree
│
├── ml-api/                 # Backend ML API
│   ├── app.py              # Python API code (Flask/FastAPI)
│   ├── label_encoders.pkl  # Encoders for categorical variables
│   ├── original_values.pkl # Original labels for decoding predictions
│   ├── requirements.txt    # Python dependencies
│   ├── xgb_model.json      # XGBoost model in JSON format
│   └── xgb_model.pkl       # Pickled XGBoost model
│
├── model/                  # Data and notebooks for modeling
│   ├── retail_price.csv    # Dataset
│   └── Untitled-1.ipynb    # Jupyter notebook (EDA/modeling)
│
├── notebook/               # Additional notebooks
│   └── Untitled-1.ipynb    # Notebook for analysis or testing
│
└── Readme.md               # Project documentation
```


## setup

Backend

```
cd ml-api
pip install -r requirements.txt
```

Frontend

```
cd frontend
npm install
npx expo start
```

## Tools and Libraries

- **Python Libraries**: Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, SciPy
- **Environment**: Jupyter Notebook for interactive analysis
- **Backend**:Flask for api render for deploying api
- **Frontend**: React Ntive , Expo

[apk](https://drive.google.com/file/d/1Nqf54N3cTvI-l_NViBIcijKMBjb95sDA/view?usp=sharing)
[video](https://drive.google.com/file/d/1n8FLBiEcxhX9jbVYPlBzEv-655M1ZvC0/view?usp=sharing)


