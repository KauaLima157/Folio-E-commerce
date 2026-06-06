import { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { api, getBookCoverImage } from '../services/api';
import '../styles/ChatWidget.css';
import { useAuth } from '../hook/authHook';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

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
  const [allProducts, setAllProducts] = useState<any[]>([]);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const products = await api.getProducts();
        setAllProducts(products);
      } catch (error) {
        console.error('Error fetching products in chat:', error);
      }
    };
    fetchAllProducts();
  }, []);

  const getMentionedBooks = (text: string) => {
    const mentioned: any[] = [];
    const textLower = text.toLowerCase();
    
    allProducts.forEach(prod => {
      const titleLower = prod.title.toLowerCase();
      // Check if title is mentioned (either in bold markdown or as plain text)
      if (textLower.includes(titleLower) || textLower.includes(`**${titleLower}**`)) {
        // Avoid duplicates
        if (!mentioned.some(m => m.id === prod.id)) {
          mentioned.push(prod);
        }
      }
    });
    return mentioned;
  };

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    setIsMouseDown(true);
    setStartX(e.pageX - target.offsetLeft);
    setScrollLeftState(target.scrollLeft);
    setHasDragged(false);
  };

  const handleDragLeave = () => {
    setIsMouseDown(false);
  };

  const handleDragEnd = () => {
    setIsMouseDown(false);
  };

  const handleDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const target = e.currentTarget;
    const x = e.pageX - target.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    target.scrollLeft = scrollLeftState - walk;
  };

  useEffect(() => {
    if (!user) {
      setSessionId('');
      setMessages([]);
      return;
    }

    const userKey = user.id;
    let sessId = localStorage.getItem(`folio_session_id_${userKey}`);
    if (!sessId) {
      sessId = `folio-sess-${userKey}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem(`folio_session_id_${userKey}`, sessId);
    }
    setSessionId(sessId);

    const savedMessages = localStorage.getItem(`folio_chat_${userKey}_${sessId}`);
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
  }, [user]);

  // Save chat history locally
  useEffect(() => {
    if (user && sessionId && messages.length > 0) {
      localStorage.setItem(`folio_chat_${user.id}_${sessionId}`, JSON.stringify(messages));
    }
  }, [messages, sessionId, user]);

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
      const responseText = await api.sendMessage(currentMessage, sessionId, user?.id || 'usuario-teste-1');
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
        className={`chat-float-trigger ${!user ? 'shake' : ''}`}
          onClick={() => {
            if (!user) {
              toast.error("Você precisa estar logado para usar o chatbot");
              return;
            }

            setIsOpen(!isOpen);
          }}
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

              {/* Mentioned books clickable carousel/cards */}
              {msg.sender === 'bot' && (() => {
                const books = getMentionedBooks(msg.text);
                if (books.length === 0) return null;
                const isDraggable = books.length > 2;
                return (
                  <div 
                    className={`chat-mentioned-books ${isDraggable ? 'draggable' : ''}`}
                    onMouseDown={isDraggable ? handleDragStart : undefined}
                    onMouseLeave={isDraggable ? handleDragLeave : undefined}
                    onMouseUp={isDraggable ? handleDragEnd : undefined}
                    onMouseMove={isDraggable ? handleDragMove : undefined}
                  >
                    {books.map(b => {
                      const cover = getBookCoverImage(b.title);
                      if (!cover) return null;
                      return (
                        <div 
                          key={b.id} 
                          className="chat-book-card"
                          onClick={() => {
                            if (isDraggable && hasDragged) return; // ignore click if dragged
                            setIsOpen(false); // Close chat widget
                            navigate(`/book/${b.id}`); // Navigate to book detail page
                          }}
                        >
                          <img src={cover} alt={b.title} className="chat-book-cover" />
                          <div className="chat-book-info">
                            <span className="chat-book-title">{b.title}</span>
                            <span className="chat-book-author">{b.authors[0]}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}

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
