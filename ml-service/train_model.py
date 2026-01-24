import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import joblib



df=pd.read_csv('fatigue_analyser.csv')

encoders = {}
categorical_cols = ["role", "meeting_type", "fatigue_level"]

for col in categorical_cols:
    encoder = LabelEncoder()
    df[col] = encoder.fit_transform(df[col])
    encoders[col] = encoder


x=df.drop('fatigue_level',axis=1)
y=df['fatigue_level']


x_train,x_test,y_train,y_test=train_test_split(x,y,test_size=0.2,random_state=42)

model=RandomForestClassifier()
model.fit(x_train,y_train)
accuracy_score=model.score(x_test,y_test)
print(accuracy_score)

joblib.dump(model,"fatigue_model.pkl")
joblib.dump(encoders,"encoders.pkl")

print("Model and encoders saved successfully")

