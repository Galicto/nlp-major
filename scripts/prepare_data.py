import os
import sys

def prepare_datasets():
    print("Preparing UrbanMind datasets...")
    
    os.makedirs('data', exist_ok=True)
    
    print("1. Downloading GeoLife GPS Trajectories... (Mocked)")
    print("2. Downloading UCI Bike Sharing Dataset... (Mocked)")
    print("3. Fetching OpenStreetMap data for city graph... (Mocked)")
    
    # We trigger the synthetic generator so we have something to work with locally
    print("Generating synthetic local data for demo...")
    sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))
    try:
        from utils.data_generator import generate_synthetic_city_data
        generate_synthetic_city_data()
    except Exception as e:
        print("Could not generate synthetic data:", e)
        
    print("Data preparation complete.")

if __name__ == "__main__":
    prepare_datasets()
