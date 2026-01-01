import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, Star } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Floating sparkle for chatbot
const ChatSparkle = ({ delay }: { delay: number }) => {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${randomX}%`,
        top: `${randomY}%`,
        animation: `chatSparkleFloat 3s ease-in-out ${delay}s infinite`,
      }}
    >
      <Sparkles size={10} className="text-red-400 opacity-60" />
    </div>
  );
};

export function ChatButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-full shadow-2xl hover:shadow-red-600/50 transition-all duration-300 chat-pulse"
    >
      <MessageCircle size={28} />
      {/* 2026 Badge */}
      <div className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-bold px-2 py-1 rounded-full shadow-lg">
        2026
      </div>
      {/* Sparkle decoration */}
      <Sparkles className="absolute -top-1 -left-1 text-yellow-300" size={16} />
    </button>
  );
}

export function Chatbot({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '🎊 Happy New Year 2026! あけましておめでとうございます！How can I help you start your journey to Japan?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    '🎌 Visa Information',
    '📚 Student Programs',
    '💼 Business Visa',
    '📞 Contact Us',
    '🎉 New Year Offers',
  ];

  const botResponses: { [key: string]: string } = {
    'visa': '🎊 Great choice for 2026! We offer comprehensive visa consultation services including Business Visas, Student Visas, and Work Visas. Our success rate is 100%! Would you like to know more about a specific visa type?',
    'student': '📚 Perfect timing for 2026! Our student visa program helps you get into top Japanese universities. We handle everything from application to arrival. Would you like to schedule a consultation?',
    'business': '💼 Excellent! Business visas for 2026 are our specialty. We assist with documentation, company sponsorship, and the entire application process. Call us at 077 780 7619 to get started!',
    'contact': '📞 We\'d love to hear from you! Call us at 077 780 7619 or visit our contact section. Our team is ready to help you achieve your Japan dreams in 2026! 🎌',
    'offer': '🎉 New Year 2026 Special! We\'re offering free initial consultations throughout January. This is the perfect time to start your Japan journey. Contact us today!',
    'default': '🌟 Thank you for your interest! For the best assistance with your Japan visa needs in 2026, please call us at 077 780 7619 or select from the options below. Happy New Year! 🎊',
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputMessage.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      let botResponse = botResponses.default;
      const lowerText = messageText.toLowerCase();

      if (lowerText.includes('visa') && !lowerText.includes('business') && !lowerText.includes('student')) {
        botResponse = botResponses.visa;
      } else if (lowerText.includes('student') || lowerText.includes('study') || lowerText.includes('university')) {
        botResponse = botResponses.student;
      } else if (lowerText.includes('business') || lowerText.includes('work')) {
        botResponse = botResponses.business;
      } else if (lowerText.includes('contact') || lowerText.includes('call') || lowerText.includes('phone')) {
        botResponse = botResponses.contact;
      } else if (lowerText.includes('offer') || lowerText.includes('discount') || lowerText.includes('special') || lowerText.includes('new year')) {
        botResponse = botResponses.offer;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes chatSparkleFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translate(10px, -10px) scale(1.2);
            opacity: 1;
          }
        }
        
        @keyframes chatPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(220, 38, 38, 0.5);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 30px rgba(220, 38, 38, 0.8);
          }
        }
        
        @keyframes messageSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes typingDot {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes newYearShimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        .chat-pulse {
          animation: chatPulse 2s ease-in-out infinite;
        }
        
        .message-slide-in {
          animation: messageSlideIn 0.3s ease-out;
        }
        
        .typing-dot {
          animation: typingDot 1.4s ease-in-out infinite;
        }
        
        .new-year-gradient {
          background: linear-gradient(135deg, #DC2626 0%, #EF4444 50%, #FFFFFF 100%);
        }
        
        .shimmer-text {
          background: linear-gradient(90deg, #DC2626 0%, #FFFFFF 50%, #DC2626 100%);
          background-size: 1000px 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: newYearShimmer 3s linear infinite;
        }
      `}</style>

      {/* Chat Window */}
      <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="new-year-gradient p-4 text-white relative overflow-hidden">
          {/* Decorative sparkles in header */}
          {[...Array(5)].map((_, i) => (
            <ChatSparkle key={i} delay={i * 0.3} />
          ))}
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="/logo.png" 
                  alt="Moshi Moshi Nippon" 
                  className="h-12 w-auto"
                />
                <Sparkles className="absolute -top-1 -right-1 text-yellow-300" size={14} />
              </div>
              <div>
                <h3 className="font-bold text-lg flex items-center space-x-2">
                  <span>Moshi Moshi Nippon</span>
                  <span className="text-sm">🎊</span>
                </h3>
                <p className="text-xs opacity-90 flex items-center space-x-1">
                  <span>Online</span>
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span>• 2026</span>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* New Year Banner */}
          <div className="mt-3 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-center relative z-10">
            <p className="text-xs font-semibold flex items-center justify-center space-x-1">
              <Star size={12} fill="currentColor" />
              <span>Happy New Year 2026!</span>
              <Star size={12} fill="currentColor" />
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} message-slide-in`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                    : 'bg-white border border-gray-200 text-gray-800'
                } shadow-md`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start message-slide-in">
              <div className="bg-white border border-gray-200 p-3 rounded-2xl shadow-md">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full typing-dot"></div>
                  <div className="w-2 h-2 bg-red-600 rounded-full typing-dot" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-red-600 rounded-full typing-dot" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="p-3 bg-white border-t border-gray-200">
          <div className="flex flex-wrap gap-2 mb-3">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="text-xs px-3 py-1.5 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors border border-red-200 font-medium"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message... 🎌"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all"
            />
            <button
              onClick={() => handleSendMessage()}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white p-2 rounded-full hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!inputMessage.trim()}
            >
              <Send size={20} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-2 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {[...Array(3)].map((_, i) => (
              <ChatSparkle key={`footer-${i}`} delay={i * 0.5} />
            ))}
          </div>
          <p className="text-white text-xs font-semibold relative z-10 shimmer-text">
            Start Your 2026 Japan Journey! 🎊
          </p>
        </div>
      </div>
    </>
  );
}