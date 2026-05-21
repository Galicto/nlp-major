from langchain.tools import tool
import json
from datetime import datetime
from ml.crowd_stgcn import predict_crowd_density
from ml.transport_tft import predict_transport_demand

@tool
def query_crowd_prediction(zone_id: str, time_str: str) -> str:
    """Queries the ST-GCN model for crowd density predictions for a specific zone and time."""
    result = predict_crowd_density(zone_id, time_str)
    return json.dumps(result)

@tool
def query_transport_demand(route_id: str, horizon_hours: int) -> str:
    """Queries the TFT model for transportation demand predictions."""
    result = predict_transport_demand(route_id, horizon_hours)
    return json.dumps(result)

@tool
def get_active_alerts(severity_threshold: str) -> str:
    """Fetches active city alerts above a certain severity (green, amber, red)."""
    # Mocking DB fetch
    alerts = [
        {"id": "inc_001", "type": "traffic", "severity": "amber", "zone": "zone_3"},
        {"id": "inc_002", "type": "crowd_anomaly", "severity": "red", "zone": "zone_central"}
    ]
    filtered = [a for a in alerts if a["severity"] == severity_threshold or severity_threshold == "all"]
    return json.dumps(filtered)

@tool
def generate_incident_report(incident_id: str) -> str:
    """Generates a formal natural language incident report for an active alert."""
    return f"INCIDENT REPORT [{incident_id}]: At {datetime.now().strftime('%H:%M')}, a high-severity anomaly was detected. Emergency services have been notified and routing optimization is active."
