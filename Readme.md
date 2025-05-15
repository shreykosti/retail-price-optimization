**Problem statement:** Our task is to develop a model that predicts the optimal price for a product based on various factors. This prediction would enable us to make an informed decision when pricing a product, leading to maximized sales and customer satisfaction.

**solution:** The machine learning model used in the provided code is Gradient Boosted Decision Trees,uses gradient boosting, where trees are built sequentially, and each tree focuses on reducing the residual errors of the ensemble.The model optimizes a loss function (in this case, squared error) using gradient descent to determine how to adjust predictions.

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

## Results

- **Outputs**: Optimal prices for products, revenue vs. price curves, and demand elasticity plots.
- **Applications**: Retail pricing strategy, promotion planning, and competitive analysis.
