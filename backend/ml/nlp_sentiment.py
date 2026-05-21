from transformers import pipeline

def get_sentiment_pipeline():
    """
    Loads pre-trained DistilBERT for sentiment/classification.
    In production, this would use a fine-tuned model on Indian social media.
    """
    # For demo, returning a mock pipeline to save memory/time
    class MockPipeline:
        def __call__(self, texts, candidate_labels=None):
            import random
            results = []
            for t in texts:
                score = random.uniform(0, 1)
                label = random.choice(candidate_labels) if candidate_labels else "negative"
                if "panic" in t.lower() or "accident" in t.lower():
                    score = random.uniform(0.8, 1.0)
                    label = "accident" if "accident" in t.lower() else "crime/panic"
                results.append({
                    "sequence": t,
                    "labels": [label, "normal"],
                    "scores": [score, 1 - score]
                })
            return results
    return MockPipeline()

def analyze_social_stream(tweets: list) -> dict:
    classifier = get_sentiment_pipeline()
    categories = ["accident", "crime", "traffic", "festival", "protest", "normal"]
    
    results = classifier(tweets, candidate_labels=categories)
    
    panic_score = 0
    alerts = []
    
    for r in results:
        top_label = r["labels"][0]
        top_score = r["scores"][0]
        
        if top_label in ["accident", "crime", "protest"] and top_score > 0.7:
            panic_score = max(panic_score, top_score)
            alerts.append({"text": r["sequence"], "type": top_label, "confidence": top_score})
            
    return {
        "nlp_sentiment_score": panic_score, # 0 to 1
        "social_alerts": alerts
    }
