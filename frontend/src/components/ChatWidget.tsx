import { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { api } from '../services/api';
import '../styles/ChatWidget.css';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get or generate session ID
    let sessId = localStorage.getItem('folio_session_id');
    if (!sessId) {
      sessId = `folio-sess-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('folio_session_id', sessId);
    }
    setSessionId(sessId);

    // Initial chat history or welcome message
    const savedMessages = localStorage.getItem(`folio_chat_${sessId}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      const welcomeMsg: ChatMessage = {
        sender: 'bot',
        text: 'Olá! Seja muito bem-vindo à Folio, sua livraria digital inteligente. 📚\n\nSou seu assistente de IA, alimentado pelo Google Gemini. Como posso te ajudar hoje?',
        time: getCurrentTime()
      };
      setMessages([welcomeMsg]);
    }
  }, []);

  // Save chat history locally
  useEffect(() => {
    if (sessionId && messages.length > 0) {
      localStorage.setItem(`folio_chat_${sessionId}`, JSON.stringify(messages));
    }
  }, [messages, sessionId]);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text: message,
      time: getCurrentTime()
    };

    setMessages(prev => [...prev, userMsg]);
    const currentMessage = message;
    setMessage('');
    setIsTyping(true);

    try {
      const responseText = await api.sendMessage(currentMessage, sessionId);
      const botMsg: ChatMessage = {
        sender: 'bot',
        text: responseText,
        time: getCurrentTime()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      const fallbackResponse = 'Desculpe, tive um probleminha para me conectar à minha inteligência no momento. Por favor, tente enviar novamente.';
      const botMsg: ChatMessage = {
        sender: 'bot',
        text: fallbackResponse,
        time: getCurrentTime()
      };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Switches icon dynamically between Sparkles and X) */}
      <button 
        className="chat-float-trigger" 
        onClick={() => setIsOpen(!isOpen)} 
        aria-label="Falar com Assistente IA"
      >
        {isOpen ? <X size={24} /> : <Sparkles />}
      </button>

      {/* Floating Mini Chat Modal */}
      <div className={`chat-mini-modal ${isOpen ? 'open' : ''}`}>
        {/* Modal Header */}
        <div className="chat-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="chat-avatar">🤖</div>
            <div className="chat-header-status">
              <span className="chat-status-title">Folio Assistant</span>
              <span className="chat-status-subtitle">
                <span className="chat-status-dot"></span> Online • Gemini IA
              </span>
            </div>
          </div>
          <button className="btn-close" onClick={() => setIsOpen(false)} aria-label="Fechar chat">
            <X size={18} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-bubble-container ${msg.sender}`}>
              <div className="chat-bubble" style={{ whiteSpace: 'pre-line' }}>
                {msg.text}
              </div>
              <span className="chat-time">{msg.time}</span>
            </div>
          ))}
          {isTyping && (
            <div className="chat-bubble-container bot">
              <div className="chat-bubble">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Form */}
        <form 
          className="chat-input-form" 
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
        >
          <input 
            type="text" 
            placeholder="Digite sua dúvida..." 
            className="chat-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isTyping}
          />
          <button 
            type="submit" 
            className="chat-send-btn" 
            disabled={isTyping || !message.trim()}
            aria-label="Enviar mensagem"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
}
