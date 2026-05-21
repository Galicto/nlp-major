import torch
import torch.nn as nn

class TFTModel(nn.Module):
    """
    Simplified Temporal Fusion Transformer architecture for demo.
    Real implementation would use pytorch-forecasting TFT.
    """
    def __init__(self, num_features, hidden_size, num_horizons):
        super().__init__()
        self.lstm = nn.LSTM(num_features, hidden_size, batch_first=True)
        self.attention = nn.MultiheadAttention(hidden_size, num_heads=4, batch_first=True)
        self.fc = nn.Linear(hidden_size, num_horizons)
        
    def forward(self, x):
        # x: [batch, seq, features]
        lstm_out, _ = self.lstm(x)
        attn_out, _ = self.attention(lstm_out, lstm_out, lstm_out)
        return self.fc(attn_out[:, -1, :])

def predict_transport_demand(route_id: str, horizon_hours: int) -> dict:
    """
    Simulate TFT prediction.
    """
    import random
    base_demand = random.randint(100, 500)
    
    if horizon_hours == 1:
        demand = base_demand * 1.5
    else:
        demand = base_demand * 0.8
        
    return {
        "route_id": route_id,
        "horizon_hours": horizon_hours,
        "predicted_demand": int(demand),
        "saturation_time_mins": random.randint(10, 120),
        "recommended_fleet": int(demand / 50) + 1
    }
