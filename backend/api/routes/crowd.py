from fastapi import APIRouter
from ml.crowd_stgcn import predict_crowd_density

router = APIRouter()

@router.get("/heatmap")
async def get_crowd_heatmap(time: str, zone: str):
    """Returns the ST-GCN predicted crowd density heatmap for a given zone and time."""
    prediction = predict_crowd_density(zone_id=zone, time_str=time)
    return {"status": "success", "data": prediction}
