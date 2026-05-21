from fastapi import APIRouter
from ml.transport_tft import predict_transport_demand

router = APIRouter()

@router.get("/demand")
async def get_transport_demand(route: str, horizon: int):
    """Returns TFT predicted transportation demand and RL optimizer recommendations."""
    prediction = predict_transport_demand(route_id=route, horizon_hours=horizon)
    return {"status": "success", "data": prediction}
