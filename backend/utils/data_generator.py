from faker import Faker
import json
import random
import os

fake = Faker('en_IN')

def generate_synthetic_city_data(num_records=1000):
    """
    Generates synthetic but realistic Indian city data for demo purposes.
    Simulates GPS traces, transport demand, and social media.
    """
    data = []
    zones = ["zone_central", "zone_north", "zone_south", "zone_east", "zone_west"]
    
    for _ in range(num_records):
        record = {
            "timestamp": fake.date_time_between(start_date='-1w', end_date='now').isoformat(),
            "lat": float(fake.latitude()),
            "lng": float(fake.longitude()),
            "zone": random.choice(zones),
            "transport_mode": random.choice(["bus", "metro", "walking", "bike"]),
            "social_post": fake.text(max_nb_chars=140) if random.random() > 0.8 else None
        }
        data.append(record)
        
    os.makedirs('data', exist_ok=True)
    with open('data/synthetic_city_data.json', 'w') as f:
        json.dump(data, f)
        
    print(f"Generated {num_records} synthetic records.")

if __name__ == "__main__":
    generate_synthetic_city_data()
