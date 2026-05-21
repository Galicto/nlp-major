import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

def process_query(query: str, location: dict = None) -> str:
    api_key = os.getenv("GEMINI_API_KEY")
    
    if not api_key or api_key == "your_gemini_api_key":
        return "ERROR: GEMINI_API_KEY not set in .env file."
        
    try:
        # Using the official Google GenAI SDK directly
        client = genai.Client(api_key=api_key)
        
        # System instructions to ensure it acts as a helpful, highly capable assistant
        system_instruction = (
            "You are UrbanMind, a highly intelligent and capable AI assistant. "
            "You can answer any general knowledge question exactly like a standard Gemini model. "
            "You provide clear, direct, and professional answers. "
        )
        
        if location:
            system_instruction += f"\nContext: The user is currently physically located at GPS coordinates Lat: {location.get('lat')}, Lng: {location.get('lng')}."
            
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=query,
            config=genai.types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.7,
            )
        )
        
        return response.text
    except Exception as e:
        return f"Error connecting to Gemini API: {str(e)}"
