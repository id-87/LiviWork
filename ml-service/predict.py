import joblib
import pandas as pd
from fastapi import FastAPI
app=FastAPI()

model=joblib.load('fatigue_model.pkl')
encoders=joblib.load('encoders.pkl')

@app.get("/")
def  root():
    return "Running fast api"

@app.post('/predict')
def predict_fatigue(inputData:dict):
    df = pd.DataFrame([inputData])

    df["role"]=encoders['role'].transform(df['role'])
    df['meeting_type']=encoders['meeting_type'].transform(df['meeting_type'])

    prediction=model.predict(df)[0]
    prob=model.predict_proba(df)[0]

    fatigue_level=encoders['fatigue_level'].inverse_transform([prediction])[0]

    confidence=max(prob)
    return{
        "fatigueLevel":fatigue_level,
        "confidence":round(float(confidence),2)
    }

# if __name__ == "__main__":
#     sample_input = {
#         "meetings_per_day": 5,
#         "total_minutes": 260,
#         "break_minutes": 20,
#         "role": "developer",
#         "meeting_type": "online"
#     }

#     result = predict_fatigue(sample_input)
#     print(result)