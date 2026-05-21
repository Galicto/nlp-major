import pytest
from backend.ml.crowd_stgcn import predict_crowd_density

def test_predict_crowd_density():
    res = predict_crowd_density("zone_central", "08:15")
    assert "zone_id" in res
    assert "predicted_density" in res
    assert "anomaly_flag" in res
    
    # Check if anomaly triggers for Central Station at 08:15
    assert res["anomaly_flag"] == 1
