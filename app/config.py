from dotenv import load_dotenv
import os
load_dotenv()

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
MONGODB_URL = os.getenv("MONGODB_URL")

AVAILABLE_MODELS = [
    {
        "name": "Owl Alpha",
        "value": "openrouter/owl-alpha"
    },
    {
        "name": "CoBuddy",
        "value": "baidu/cobuddy:free"
    },
    {
        "name": "Providers for Nemotron 3 Nano Omni (free)",
        "value": "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free"
    }

    # Add more models as needed
]