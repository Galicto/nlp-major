import pytest
from backend.ml.transport_tft import predict_transport_demand

def test_predict_transport_demand():
    res = predict_transport_demand("route_7", 1)
    assert "route_id" in res
    assert res["horizon_hours"] == 1
    assert "predicted_demand" in res
    assert "recommended_fleet" in res
