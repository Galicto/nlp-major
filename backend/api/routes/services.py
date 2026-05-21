from fastapi import APIRouter
import random

router = APIRouter()

@router.get("/kpi")
async def get_services_kpi():
    """Returns Multi-Agent RL optimization KPIs for city services."""
    return {
        "status": "success",
        "data": {
            "waste_collection": {
                "active_agents": 45,
                "efficiency_gain_percent": random.randint(15, 25),
                "bins_optimized": 1200
            },
            "energy_grid": {
                "demand_forecast_mw": random.randint(300, 500),
                "load_balanced": True,
                "anomaly_detected": False
            },
            "water_pressure": {
                "network_health": "Optimal",
                "pressure_variance": round(random.uniform(0.1, 0.5), 2)
            }
        }
    }
