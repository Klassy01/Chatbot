import React, { useState, ChangeEvent, FormEvent } from 'react';

const ChatBot: React.FC = () => {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!text) {
      alert('Please provide text input');
      return;
    }

    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('http://localhost:8000/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.response || data.error);
    } catch (err) {
      setResponse(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText('');
    setResponse('');
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-card">
        <h1 className="chatbot-title">LLaMA 3 Chatbot</h1>
        
        <form onSubmit={handleSubmit} className="chatbot-form">
          <div className="input-group">
            <label htmlFor="text" className="input-label">
              Text Input
            </label>
            <textarea
              id="text"
              value={text}
              onChange={handleTextChange}
              placeholder="Type your message here..."
              className="text-input"
              rows={4}
              disabled={loading}
            />
          </div>

          <div className="button-group">
            <button
              type="submit"
              disabled={loading || !text}
              className={`submit-button ${loading || !text ? 'disabled' : ''}`}
            >
              {loading ? 'Processing...' : 'Send'}
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className="clear-button"
            >
              Clear
            </button>
          </div>
        </form>

        {response && (
          <div className="response-container">
            <h2 className="response-title">Response:</h2>
            <div className="response-content">
              {response}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .chatbot-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f8f9fa;
          padding: 20px;
        }
        
        .chatbot-card {
          width: 100%;
          max-width: 600px;
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 24px;
          margin: 0 auto;
        }
        
        .chatbot-title {
          text-align: center;
          font-size: 28px;
          font-weight: bold;
          color: #2d3748;
          margin-bottom: 24px;
        }
        
        .chatbot-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .input-group {
          display: flex;
          flex-direction: column;
        }
        
        .input-label {
          font-size: 14px;
          font-weight: 500;
          color: #4a5568;
          margin-bottom: 8px;
        }
        
        .text-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 16px;
          resize: vertical;
          min-height: 120px;
          transition: border-color 0.2s;
        }
        
        .text-input:focus {
          outline: none;
          border-color: #4299e1;
          box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
        }
        
        .text-input:disabled {
          background-color: #edf2f7;
          cursor: not-allowed;
        }
        
        .button-group {
          display: flex;
          gap: 12px;
          padding-top: 8px;
        }
        
        .submit-button, .clear-button {
          flex: 1;
          padding: 12px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.2s;
          border: none;
        }
        
        .submit-button {
          background-color: #4299e1;
          color: white;
        }
        
        .submit-button:hover:not(:disabled) {
          background-color: #3182ce;
        }
        
        .submit-button.disabled {
          background-color: #bee3f8;
          cursor: not-allowed;
        }
        
        .clear-button {
          background-color: #e53e3e;
          color: white;
        }
        
        .clear-button:hover:not(:disabled) {
          background-color: #c53030;
        }
        
        .clear-button:disabled {
          background-color: #fed7d7;
          cursor: not-allowed;
        }
        
        .response-container {
          margin-top: 24px;
          padding: 16px;
          background-color: #f7fafc;
          border-radius: 8px;
        }
        
        .response-title {
          font-size: 18px;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 8px;
        }
        
        .response-content {
          white-space: pre-wrap;
          font-family: monospace;
          color: #4a5568;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
};

export default ChatBot;