import { X, Send, MessageCircle, Sparkles, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "🎄 Hello! I'm your Moshi Moshi Nippon assistant. How can I help you with your Japan journey today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const knowledgeBase = {
    services: {
      keywords: ['service', 'offer', 'help', 'provide', 'what do you do'],
      response: "We offer comprehensive visa consultation services including:\n\n🎌 Business Visa Processing\n📚 Student Visa Assistance\n💼 Work Permit Guidance\n👨‍👩‍👧 Family Visa Support\n📋 Document Preparation\n✅ Application Review\n\nWe handle everything from initial consultation to successful visa approval!"
    },
    businessVisa: {
      keywords: ['business visa', 'work visa', 'business', 'entrepreneur', 'company'],
      response: "Our Business Visa services include:\n\n✨ Business Manager Visa\n✨ Intra-company Transfer Visa\n✨ Business Development Support\n✨ Company Registration Assistance\n✨ Investment Guidance\n\nWe have a 100% success rate and guide you through every step of the process!"
    },
    studentVisa: {
      keywords: ['student visa', 'study', 'university', 'language school', 'education'],
      response: "Student Visa Services:\n\n📚 Language School Applications\n📚 University Admission Support\n📚 Vocational School Guidance\n📚 Scholarship Information\n📚 Part-time Work Permits\n📚 Accommodation Assistance\n\nStart your academic journey in Japan with our expert guidance!"
    },
    requirements: {
      keywords: ['requirement', 'document', 'need', 'necessary', 'paperwork'],
      response: "Common visa requirements include:\n\n📄 Valid Passport\n📄 Visa Application Form\n📄 Recent Photographs\n📄 Financial Proof\n📄 Purpose Statement\n📄 Educational/Work Certificates\n📄 Health Certificate\n\nSpecific requirements vary by visa type. Contact us for a detailed checklist!"
    },
    timeline: {
      keywords: ['how long', 'timeline', 'duration', 'time', 'when', 'processing time'],
      response: "Processing timelines typically:\n\n⏰ Initial Consultation: Same day\n⏰ Document Preparation: 1-2 weeks\n⏰ Application Submission: 1 week\n⏰ Embassy Processing: 4-8 weeks\n⏰ Visa Approval: 6-12 weeks total\n\nWe expedite where possible and keep you updated throughout!"
    },
    cost: {
      keywords: ['cost', 'price', 'fee', 'charge', 'expensive', 'how much', 'payment'],
      response: "Our consultation fees are competitive and transparent:\n\n💰 Initial Consultation: FREE\n💰 Document Review: Varies by complexity\n💰 Full Service Package: Contact for quote\n\nWe offer flexible payment plans and ensure value for money with our 100% success rate!"
    },
    contact: {
      keywords: ['contact', 'call', 'phone', 'email', 'reach', 'talk', 'speak'],
      response: "Get in touch with us:\n\n📞 Phone: 077 780 7619\n📧 Email: info@moshimoshinippon.com\n📍 Location: Nuwara Eliya, Sri Lanka\n⏰ Hours: Mon-Sat, 9AM-6PM\n\nCall us anytime for immediate assistance!"
    },
    experience: {
      keywords: ['experience', 'expertise', 'track record', 'success', 'reliable'],
      response: "Our proven track record:\n\n⭐ 10+ Years of Experience\n⭐ 100% Success Rate\n⭐ 100% Client Satisfaction\n⭐ 500+ Successful Applications\n⭐ Expert Team of Consultants\n\nWe're your trusted partner for Japan visa services!"
    },
    language: {
      keywords: ['language', 'japanese', 'english', 'speak', 'communication'],
      response: "Language Support:\n\n🗣️ English - Fluent\n🗣️ Japanese - Fluent\n🗣️ Sinhala - Native\n🗣️ Tamil - Available\n\nWe communicate in your preferred language for clear understanding!"
    },
    location: {
      keywords: ['where', 'location', 'office', 'address', 'find you'],
      response: "We're located in:\n\n📍 Nuwara Eliya, Central Province, Sri Lanka\n\nWe serve clients throughout Sri Lanka and provide:\n✅ In-person consultations\n✅ Online consultations\n✅ Document pickup/delivery services\n\nContact us to schedule a visit!"
    },
    booking: {
      keywords: ['book', 'appointment', 'schedule', 'meeting', 'consultation'],
      response: "Booking a consultation is easy:\n\n1️⃣ Click 'Get Started' button on homepage\n2️⃣ Call us at 077 780 7619\n3️⃣ Fill out the consultation form\n4️⃣ Visit our office directly\n\nFirst consultation is FREE - no commitment required!"
    },
    success: {
      keywords: ['success stories', 'testimonial', 'reviews', 'previous clients', 'examples'],
      response: "See our success stories:\n\n🌟 Check our Facebook page for real client testimonials\n🌟 View visa approval celebrations\n🌟 Watch student departure videos\n🌟 Read business success stories\n\nVisit: facebook.com/mmnippon/reels\n\nYour success story could be next!"
    },
    process: {
      keywords: ['process', 'steps', 'procedure', 'how it works', 'workflow'],
      response: "Our simple process:\n\n1️⃣ FREE Initial Consultation\n2️⃣ Visa Type Assessment\n3️⃣ Document Checklist Provided\n4️⃣ Application Preparation\n5️⃣ Embassy Submission\n6️⃣ Follow-up & Updates\n7️⃣ Visa Approval! 🎉\n\nWe handle everything - you just prepare for Japan!"
    },
    christmas: {
      keywords: ['christmas', 'holiday', 'new year', 'celebration', 'merry'],
      response: "🎄 Merry Christmas & Happy Holidays! 🎄\n\nStart your Japan journey this festive season with special benefits:\n\n🎁 FREE consultation throughout December\n🎁 Priority processing for holiday applications\n🎁 Special year-end guidance packages\n\nメリークリスマス! Let's make your Japan dream come true in the new year!"
    },
  };

  const findBestResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for greetings
    if (lowerMessage.match(/^(hi|hello|hey|konnichiwa|good morning|good afternoon|good evening)/)) {
      return "Hello! 👋 Welcome to Moshi Moshi Nippon! I'm here to help you with your Japan visa journey. What would you like to know about?";
    }

    // Check for thank you
    if (lowerMessage.match(/(thank|thanks|arigatou)/)) {
      return "You're welcome! 😊 Is there anything else you'd like to know about our services or the visa process?";
    }

    // Check knowledge base
    for (const [key, data] of Object.entries(knowledgeBase)) {
      if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return data.response;
      }
    }

    // Default response with suggestions
    return "I'd be happy to help! Here's what I can assist you with:\n\n" +
           "✨ Visa services & types\n" +
           "✨ Requirements & documents\n" +
           "✨ Processing timeline\n" +
           "✨ Costs & fees\n" +
           "✨ Booking consultation\n" +
           "✨ Success stories\n\n" +
           "You can also call us directly at 077 780 7619 for immediate assistance!";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: findBestResponse(inputText),
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What services do you offer?",
    "Business visa requirements",
    "Student visa process",
    "How much does it cost?",
    "Book a consultation",
  ];

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-2xl border-2 border-red-600/50 flex flex-col z-50 overflow-hidden">
      <style>{`
        @keyframes christmasGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(220, 38, 38, 0.5), 0 0 40px rgba(34, 197, 94, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(220, 38, 38, 0.8), 0 0 60px rgba(34, 197, 94, 0.5);
          }
        }
        
        .chat-container {
          animation: christmasGlow 2s ease-in-out infinite;
        }
        
        .message-user {
          background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
        }
        
        .message-bot {
          background: linear-gradient(135deg, #1F2937 0%, #111827 100%);
        }
      `}</style>

      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-green-600 to-red-600 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">🎅</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">Moshi Moshi Assistant</h3>
            <p className="text-white/90 text-xs flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Online - Ready to help!</span>
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-red-200 transition-colors p-2 hover:bg-white/10 rounded-lg"
        >
          <X size={24} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.sender === 'user'
                  ? 'message-user text-white rounded-br-none'
                  : 'message-bot text-white border border-white/10 rounded-bl-none'
              }`}
            >
              <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
              <p className="text-xs opacity-70 mt-2">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="message-bot max-w-[80%] rounded-2xl rounded-bl-none p-4 border border-white/10">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 bg-black/30 border-t border-white/10">
          <p className="text-white/70 text-xs mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full transition-colors border border-white/20"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-gradient-to-r from-gray-900 to-black border-t-2 border-red-600/30">
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-white/10 text-white placeholder-white/50 px-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:border-red-600 transition-colors"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="bg-gradient-to-r from-red-600 to-green-600 text-white p-3 rounded-xl hover:from-red-700 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isTyping ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
        <p className="text-white/50 text-xs mt-2 text-center">
          Press Enter to send • 🎄 Merry Christmas!
        </p>
      </div>
    </div>
  );
}

// Floating Chat Button Component
export function ChatButton({ onClick }: { onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <style>{`
        @keyframes chatButtonPulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(220, 38, 38, 0.6), 0 0 40px rgba(34, 197, 94, 0.4);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 30px rgba(220, 38, 38, 0.8), 0 0 60px rgba(34, 197, 94, 0.6);
            transform: scale(1.05);
          }
        }
        
        .chat-button {
          animation: chatButtonPulse 2s ease-in-out infinite;
        }
      `}</style>
      
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="chat-button fixed bottom-6 right-6 bg-gradient-to-r from-red-600 to-green-600 text-white p-4 rounded-full shadow-2xl hover:from-red-700 hover:to-green-700 transition-all z-40 group"
      >
        <MessageCircle size={28} className="group-hover:scale-110 transition-transform" />
        
        {/* Notification Badge */}
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white animate-bounce">
          🎄
        </div>

        {/* Tooltip */}
        {isHovered && (
          <div className="absolute bottom-full right-0 mb-2 bg-black text-white px-4 py-2 rounded-lg whitespace-nowrap text-sm">
            <div className="flex items-center space-x-2">
              <Sparkles size={16} className="text-yellow-400" />
              <span>Need help? Chat with us!</span>
            </div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-black"></div>
          </div>
        )}
      </button>
    </>
  );
}