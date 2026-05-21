from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import crowd, transport, anomaly, services, llm_agent
from api.websocket import router as websocket_router

app = FastAPI(title="UrbanMind API", description="Smart City Behavior Intelligence", version="1.0.0")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(crowd.router, prefix="/api/v1/crowd", tags=["Crowd"])
app.include_router(transport.router, prefix="/api/v1/transport", tags=["Transport"])
app.include_router(anomaly.router, prefix="/api/v1/anomaly", tags=["Anomaly"])
app.include_router(services.router, prefix="/api/v1/services", tags=["Services"])
app.include_router(llm_agent.router, prefix="/api/v1/llm", tags=["LLM Agent"])
app.include_router(websocket_router, tags=["WebSocket"])

@app.get("/")
async def root():
    return {"message": "Welcome to UrbanMind API. Go to /docs for Swagger UI."}
