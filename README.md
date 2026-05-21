# UrbanMind — Smart City Behavior Intelligence

A comprehensive, real-time AI platform predicting and analyzing human behavior at a city scale.

## Overview
UrbanMind integrates multi-modal AI models to ingest city data (video feeds, GPS traces, social media, transit logs) and outputs actionable predictions via a polished command center dashboard.

## Features
- **Crowd Movement Prediction**: Spatial-Temporal Graph Neural Network (ST-GCN).
- **Transportation Demand Forecasting**: Temporal Fusion Transformer (TFT) with Deep Q-Network routing.
- **Unusual Behavior Detection**: YOLOv8 + Autoencoder combined with DistilBERT NLP.
- **City Services Optimization**: Multi-Agent RL for waste, energy, and water.
- **LangChain AI Agent**: Natural language queries and report generation.

## Quick Start (Demo Mode)

To go from clone to live dashboard in < 3 steps:

1. **Environment Setup**
   ```bash
   cp .env.example .env
   # Add your API keys to .env
   ```

2. **Start the Stack**
   ```bash
   docker-compose up -d --build
   ```

3. **Seed Demo Data**
   ```bash
   # Run the demo scenario script
   docker exec -it urbanmind_api python /app/scripts/demo_seed.py
   ```

Access the dashboard at `http://localhost:5173`.
API Docs are available at `http://localhost:8000/docs`.

## Data Retention Policy
All CCTV frames and personal data are processed in real-time and discarded after 15 minutes. Only anonymized, aggregated statistics are persisted for historical analysis.
