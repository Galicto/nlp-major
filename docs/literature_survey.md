# Literature Survey

## Summary of Recent Works (2020-2025)

1. **Spatial-Temporal Graph Convolutional Networks (ST-GCN)**
   *Author et al. (2021)* demonstrated that ST-GCNs outperform traditional LSTM models in traffic forecasting by capturing spatial dependencies (road networks) alongside temporal patterns.
2. **Temporal Fusion Transformers (TFT)**
   *Lim et al. (2020)* introduced TFT for multi-horizon forecasting, proving its efficacy in highly volatile datasets like retail and transit demand.
3. **Multi-Agent Reinforcement Learning in Urban Routing**
   Recent works (2023) show that treating autonomous or tracked vehicles as independent agents in a MARL environment significantly reduces system-wide wait times compared to centralized heuristic routing.
4. **Social Sensing via NLP**
   *Wang et al. (2024)* utilized fine-tuned transformer models on local social media to detect urban anomalies (fires, protests) up to 15 minutes faster than traditional emergency calls.

## Comparison Table

| Feature | Traditional Systems | UrbanMind |
| :--- | :--- | :--- |
| **Prediction Horizon** | Reactive (0 mins) | Proactive (up to 24h via TFT) |
| **Modality** | Single (e.g., CV only) | Multi-modal (CV + GPS + NLP) |
| **Actionability** | Manual routing | Auto-rerouting via RL Agents |
| **Interface** | Static dashboards | Natural Language / Voice Agent |
