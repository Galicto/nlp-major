# Dataset & Implementation Details

## Datasets
1. **GeoLife GPS Trajectories**: Microsoft Research dataset used to simulate crowd movement. Preprocessed to map GPS points to specific city zones.
2. **UCI Bike Sharing**: Surrogate for public transit demand forecasting.
3. **Twitter RoBERTa Sentiment**: Base weights used for NLP anomaly detection.

*Note: For the live demo, synthetic data generation (`utils/data_generator.py`) is used to guarantee localized (Indian city) formatting and predictable edge-cases.*

## Preprocessing Pipeline
- Raw GPS data is mapped to OpenStreetMap nodes using `osmnx`.
- Time-series data is resampled to 15-minute intervals.
- Missing values imputed using linear interpolation.

## Code Quality & CI/CD
- **Testing**: `pytest` covers API endpoints and dummy model outputs.
- **Type Hints**: Strict Python typing enforced across the `backend/` directory.
- **Environment**: Containerized via Docker Compose. No hardcoded credentials.
