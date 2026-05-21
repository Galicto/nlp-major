from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio
import json
from datetime import datetime

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except:
                pass

manager = ConnectionManager()

@router.websocket("/ws/live-feed")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # The client could send filters, but for demo we just keep connection open
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

async def push_realtime_updates():
    """
    Background task that pushes simulated 5s updates to all connected clients.
    """
    from ml.crowd_stgcn import predict_crowd_density
    from ml.fusion_scorer import calculate_city_alert_score
    
    while True:
        await asyncio.sleep(5)
        
        # Simulate generating a frame of data for the dashboard
        now_str = datetime.now().strftime("%H:%M")
        
        # Dummy generation
        crowd_data = predict_crowd_density("zone_central", now_str)
        alert = calculate_city_alert_score(
            crowd_anomaly=crowd_data["anomaly_flag"], 
            cv_score=0.1, 
            nlp_score=0.0
        )
        
        payload = {
            "type": "update",
            "timestamp": datetime.now().isoformat(),
            "alert_score": alert["alert_score"],
            "severity": alert["severity"],
            "active_alert_count": alert["alert_score"] // 20
        }
        
        await manager.broadcast(json.dumps(payload))
