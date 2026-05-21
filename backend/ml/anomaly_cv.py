import torch
import torch.nn as nn
from typing import Dict

class CrowdAutoencoder(nn.Module):
    """
    Autoencoder for detecting abnormal crowd behavior sequences.
    """
    def __init__(self, input_dim=512, latent_dim=64):
        super().__init__()
        self.encoder = nn.Sequential(
            nn.Linear(input_dim, 256),
            nn.ReLU(),
            nn.Linear(256, latent_dim)
        )
        self.decoder = nn.Sequential(
            nn.Linear(latent_dim, 256),
            nn.ReLU(),
            nn.Linear(256, input_dim)
        )

    def forward(self, x):
        z = self.encoder(x)
        x_hat = self.decoder(z)
        return x_hat

def process_video_feed(camera_id: str, frame_data: bytes = None) -> Dict:
    """
    Simulates YOLOv8 + ByteTrack + Autoencoder pipeline.
    """
    import random
    
    # In a real setup, we would run:
    # results = yolo_model(frame)
    # tracks = tracker.update(results)
    # features = extract_features(tracks)
    # loss = autoencoder(features)
    
    anomaly_score = random.uniform(0.0, 0.3)
    events = []
    
    # Simulate a sudden crowd dispersal / anomaly event at a specific time/camera
    if camera_id == "cam_central_1":
        anomaly_score = random.uniform(0.7, 0.95)
        events.append("Sudden crowd dispersal detected")
        events.append("Running against crowd flow")
        
    return {
        "camera_id": camera_id,
        "cv_anomaly_score": round(anomaly_score, 2),
        "detected_events": events,
        "person_count": random.randint(10, 150)
    }
