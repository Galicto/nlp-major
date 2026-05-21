import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert "UrbanMind" in response.json()["message"]

def test_crowd_heatmap_endpoint():
    response = client.get("/api/v1/crowd/heatmap?time=08:15&zone=zone_central")
    assert response.status_code == 200
    assert response.json()["status"] == "success"
    assert "data" in response.json()

def test_transport_demand_endpoint():
    response = client.get("/api/v1/transport/demand?route=route_7&horizon=1")
    assert response.status_code == 200
    assert response.json()["status"] == "success"
    
def test_services_kpi():
    response = client.get("/api/v1/services/kpi")
    assert response.status_code == 200
    assert "waste_collection" in response.json()["data"]
