import torch
import torch.nn as nn
import torch.nn.functional as F
from torch_geometric.nn import GCNConv

class STGCN(nn.Module):
    """
    Spatial-Temporal Graph Convolutional Network for predicting crowd density.
    """
    def __init__(self, in_channels: int, hidden_channels: int, out_channels: int, num_nodes: int):
        super(STGCN, self).__init__()
        self.gcn1 = GCNConv(in_channels, hidden_channels)
        self.gcn2 = GCNConv(hidden_channels, hidden_channels)
        
        # LSTM for temporal dimension
        self.lstm = nn.LSTM(input_size=hidden_channels, hidden_size=hidden_channels, batch_first=True)
        self.fc = nn.Linear(hidden_channels, out_channels)
        
        self.num_nodes = num_nodes
        
    def forward(self, x, edge_index):
        """
        x: [batch_size, seq_len, num_nodes, in_channels]
        edge_index: Graph connectivity
        """
        batch_size, seq_len, num_nodes, in_channels = x.shape
        
        # Apply GCN to each time step
        gcn_outputs = []
        for t in range(seq_len):
            xt = x[:, t, :, :].reshape(-1, in_channels) # [batch_size * num_nodes, in_channels]
            h = F.relu(self.gcn1(xt, edge_index))
            h = F.relu(self.gcn2(h, edge_index))
            gcn_outputs.append(h.view(batch_size, num_nodes, -1))
            
        # Stack temporal outputs
        # [batch_size, seq_len, num_nodes, hidden_channels]
        stacked = torch.stack(gcn_outputs, dim=1)
        
        # Permute for LSTM: [batch_size * num_nodes, seq_len, hidden_channels]
        lstm_in = stacked.permute(0, 2, 1, 3).reshape(batch_size * num_nodes, seq_len, -1)
        
        lstm_out, _ = self.lstm(lstm_in)
        
        # Take the last time step output
        last_out = lstm_out[:, -1, :] # [batch_size * num_nodes, hidden_channels]
        
        pred = self.fc(last_out).view(batch_size, num_nodes, -1)
        return pred

def predict_crowd_density(zone_id: str, time_str: str) -> dict:
    """
    Simulates model inference for the demo.
    """
    # In a real scenario, this would load weights and run model(data)
    import random
    base_density = random.uniform(0.1, 0.5)
    
    # Simulate rush hour
    if "08:" in time_str or "18:" in time_str:
        base_density += 0.4
        
    # Introduce an anomaly if zone is "Central Station Zone" during rush hour
    anomaly = 0
    if zone_id == "zone_central" and "08:12" <= time_str <= "08:30":
        base_density = min(1.0, base_density + 0.3)
        anomaly = 1
        
    return {
        "zone_id": zone_id,
        "predicted_density": round(base_density, 2),
        "anomaly_flag": anomaly,
        "confidence_interval": [max(0, base_density - 0.1), min(1.0, base_density + 0.1)]
    }
