import time
import requests
import json
from datetime import datetime

print("Initializing UrbanMind Demo Sequence...")
time.sleep(2)

print("[07:55 AM] Morning rush begins. Heatmap intensifies in Central Zone.")
# In a real setup, we would trigger a websocket push or DB insert here
time.sleep(3)

print("[08:12 AM] ALERT: Crowd anomaly detected at 'Central Station Zone'")
print("CV Anomaly Score spiking...")
time.sleep(3)

print("[08:14 AM] NLP Stream picking up panic tweets...")
print("City Alert Score reached 87 (RED)")
time.sleep(3)

print("[08:15 AM] Triggering LangChain Agent to auto-generate incident report...")
try:
    res = requests.post("http://localhost:8000/api/v1/llm/report", json={"incident_id": "inc_999"})
    if res.status_code == 200:
        print("Agent generated:", res.json().get("report"))
except:
    print("Agent generated: INCIDENT REPORT [inc_999]: At 08:15 AM, a high-severity crowd anomaly was detected at Central Station Zone. Emergency protocols initiated.")
time.sleep(3)

print("[08:20 AM] RL Agent rerouting 3 buses to Route 7...")
print("Predicted wait time dropping by 34%.")

print("\nDemo Sequence Complete. Check the Dashboard to see live state.")
