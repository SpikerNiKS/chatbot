# AI Chatbot

A web-based AI chatbot application built with FastAPI, featuring model selection and real-time chat functionality powered by OpenRouter API.

## Description

This project is a simple AI chatbot that allows users to interact with various AI models through a web interface. It uses FastAPI for the backend, serves a static frontend, and integrates with OpenRouter to access multiple AI models. The application also includes ChromaDB for vector storage and embeddings for potential future features like document retrieval.

## Features

- **Model Selection**: Choose from multiple AI models including Owl Alpha, CoBuddy, and Nemotron 3 Nano Omni.
- **Real-time Chat**: Send messages and receive responses instantly via the web interface.
- **Responsive UI**: Clean, modern interface with sidebar for model selection and chat area.
- **API Integration**: Uses OpenRouter API for accessing AI models.
- **Vector Database**: Includes ChromaDB setup for embeddings and document storage.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd chatbot
   ```

2. Create a virtual environment:
   ```
   python -m venv .venv
   .venv\Scripts\activate  # On Windows
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

   Note: The `requirements.txt` includes `chromadb`, but if using embeddings, you may need to add `sentence-transformers`:
   ```
   pip install sentence-transformers
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory and add your OpenRouter API key:
   ```
   OPENROUTER_API_KEY=your_api_key_here
   ```

## Setup

1. Ensure you have a valid OpenRouter API key.

   ```

## Usage

1. Start the server:
   ```
   uvicorn app.main:app --reload
   ```

2. Open your browser and navigate to `http://127.0.0.1:8000`.

3. Select a model from the sidebar dropdown.

4. Type your message in the input field and click "Send" to chat with the AI.

## API Endpoints

- `GET /`: Serves the main chat interface.
- `POST /chat`: Accepts a JSON payload with `message` and `model`, returns AI response.

Example request:
```json
{
  "message": "Hello, how are you?",
  "model": "openrouter/owl-alpha"
}
```

## Project Structure

```
chatbot/
├── README.md
├── requirements.txt
├── app/
│   ├── config.py          # Configuration and API keys
│   ├── main.py            # FastAPI app entry point
│   ├── routes/
│   │   └── chat.py        # Chat API routes
│   ├── schemas/
│   │   └── chat.py        # Pydantic models
│   ├── services/
│   │   ├── embeddings.py  # Embedding creation service
│   │   └── openrouter.py  # OpenRouter API service
│   ├── static/
│   │   ├── css/
│   │   │   └── style.css # Stylesheet
│   │   └── js/
│   │       └── chat.js    # Frontend JavaScript
│   ├── templates/
│   │   └── index.html     # Main HTML template
│   └── utils/
│       └── helpers.py     # Utility functions
```

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test thoroughly.
5. Submit a pull request.

## License

This project is licensed under the MIT License.