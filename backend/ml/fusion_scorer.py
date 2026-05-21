def calculate_city_alert_score(crowd_anomaly: float, cv_score: float, nlp_score: float) -> dict:
    """
    Late-fusion ensemble combining ST-GCN anomaly, YOLO CV score, and DistilBERT sentiment.
    """
    # Weights for each modality
    w_crowd = 0.3
    w_cv = 0.4
    w_nlp = 0.3
    
    # Calculate weighted sum
    unified_score = (crowd_anomaly * w_crowd) + (cv_score * w_cv) + (nlp_score * w_nlp)
    
    # Scale to 0-100
    alert_score = int(unified_score * 100)
    
    # Determine severity
    if alert_score < 40:
        severity = "green"
    elif alert_score < 75:
        severity = "amber"
    else:
        severity = "red"
        
    return {
        "alert_score": alert_score,
        "severity": severity,
        "contributions": {
            "crowd": round(crowd_anomaly * w_crowd * 100, 1),
            "cv": round(cv_score * w_cv * 100, 1),
            "nlp": round(nlp_score * w_nlp * 100, 1)
        }
    }
