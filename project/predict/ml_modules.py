import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# Load data from CSV file
data = pd.read_csv('C:/Users/Ravikumar/Desktop/New folder 2/project/predict/ev1.csv')  # Replace 'path_to_ev1.csv' with the actual path

X = data[['battery_percentage']]
y = data['distance']

# Train the linear regression model
model = LinearRegression()
model.fit(X, y)

# Save the trained model to a file
joblib.dump(model, 'linear_regression_model.pkl')