**Problem statement:** Our task is to develop a model that predicts the optimal price for a product based on various factors. This prediction would enable us to make an informed decision when pricing a product, leading to maximized sales and customer satisfaction.

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
## Methodology
- **Preprocessing**: Handle missing values, encode categorical variables (e.g., product categories, brands), and create features like discount percentage.
- **EDA**: Analyze sales trends, price elasticity, and correlations using Matplotlib/Seaborn.
- **Modeling**: Train regression models (e.g., Linear Regression, Random Forest, Gradient Boosting) to predict sales/revenue.
- **Optimization**: Use SciPy to maximize revenue (price × quantity) with constraints like minimum profit margins.

## Tools and Libraries
- **Python Libraries**: Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, SciPy
- **Environment**: Jupyter Notebook for interactive analysis

## Results
- **Outputs**: Optimal prices for products, revenue vs. price curves, and demand elasticity plots.
- **Applications**: Retail pricing strategy, promotion planning, and competitive analysis.