from fastapi import APIRouter
from ml.anomaly_cv import process_video_feed
from ml.nlp_sentiment import analyze_social_stream
from ml.fusion_scorer import calculate_city_alert_score

router = APIRouter()

@router.get("/alerts")
async def get_alerts(severity: str = "all", limit: int = 10):
    """Returns aggregated anomaly alerts based on late-fusion ensemble."""
    # Mocking data flow for the endpoint
    cv_res = process_video_feed("cam_central_1")
    nlp_res = analyze_social_stream(["Panic at central station!", "Normal traffic today."])
    
    fusion = calculate_city_alert_score(
        crowd_anomaly=0.8, # Mocking a high anomaly from ST-GCN
        cv_score=cv_res["cv_anomaly_score"],
        nlp_score=nlp_res["nlp_sentiment_score"]
    )
    
    alerts = []
    if fusion["severity"] == severity or severity == "all":
        alerts.append({
            "id": "inc_999",
            "score": fusion["alert_score"],
            "severity": fusion["severity"],
            "details": cv_res["detected_events"] + [a["text"] for a in nlp_res["social_alerts"]]
        })
        
    return {"status": "success", "alerts": alerts[:limit]}
