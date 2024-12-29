import React, { useState, useEffect, useCallback, useRef } from "react";
import namaste from "../images/namaste.jfif";
import userIcon from "../images/user.png"; 

export default function Chatbot() {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChatbotVisibility = useCallback(() => {
    setIsChatbotVisible((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isChatbotVisible && messages.length === 0) {
      setMessages([{ text: "Hi there! How can I help you today?", sender: "bot" }]);
    }
  }, [isChatbotVisible, messages.length]);

  useEffect(() => {
   
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (input.trim() && !isLoading) {
      setIsLoading(true);
      const newMessages = [...messages, { text: input, sender: "user" }];
      setMessages(newMessages);
      setInput("");
  
 
      const typingMessage = { text: "Typing...", sender: "bot", isTyping: true };
      setMessages([...newMessages, typingMessage]);
  
      try {
        const response = await fetch(
          process.env.REACT_APP_CHATBOT_API_URL || "https://jec-chatbot.goodwish.com.np/assistant/query/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: input }),
          }
        );
  
        const data = await response.json();
        let botResponse = data.response;
  
        
        if (botResponse === "The requested information is not found in the retrieved data. Please try another query or topic.") {
          botResponse = "I am a JEC virtual assistant and I am able to help with questions and curiosity related to Janakpur Engineering College only.";
        }
  

        setMessages([
          ...newMessages,
          { text: botResponse, sender: "bot" },
        ]);
      } catch (error) {
        console.error("Error:", error);
        setMessages([
          ...newMessages,
          { text: "Sorry, I couldn't connect to the server.", sender: "bot" },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  }, [input, messages, isLoading]);

  const renderMessageText = (text, isTyping) => {
    if (isTyping) {
      return (
        <span className="typing-dots">
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </span>
      );
    }

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) =>
      urlRegex.test(part) ? (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  return (
    <>
      <div className="fixed z-50 flex flex-col items-center space-y-1 bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8">
        <img
          src={namaste}
          className="w-16 h-16 transition-transform transform rounded-full shadow-lg md:w-20 md:h-20 lg:w-24 lg:h-24 hover:scale-105"
          alt="Chatbot Icon"
        />
        <button
          type="button"
          className="bg-gradient-to-r from-blue-500 to-red-500 text-white text-xs md:text-sm lg:text-base p-2 md:p-2.5 lg:p-3 rounded-lg shadow-xl transition-transform transform hover:scale-105"
          onClick={toggleChatbotVisibility}
        >
          <span className="font-bold" style={{ fontFamily: "'Merriweather', serif" }}>
            Janaki
          </span>
          <span
            className="block text-xs font-bold md:text-xs lg:text-sm"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Chat with Janaki
          </span>
        </button>
      </div>

      {isChatbotVisible && (
        <div
          style={{ fontFamily: "'Merriweather', serif" }}
          className="fixed bottom-4 right-1 md:bottom-6 md:right-6 lg:bottom-8 lg:right-4 z-50 w-[85%] max-w-lg md:w-[300px] lg:w-[350px] h-[500px] md:h-[500px] lg:h-[550px] xl:h-[650px] xl:w-[420px] bg-white border-2 border-gray-300 rounded-lg shadow-xl flex flex-col transform transition-all duration-300 ease-in-out"
        >
          <div className="flex items-center justify-between h-16 md:h-[50px] p-3 bg-blue-500 rounded-t-lg shadow-md">
            <h1 className="text-lg font-bold text-white md:text-lg lg:text-xl">JEC</h1>
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 text-red-600 rounded-full md:w-10 md:h-10 focus:outline-none focus:ring-2 hover:scale-105"
              onClick={() => setIsChatbotVisible(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 md:w-6 md:h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 p-3 my-2 space-y-3 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "bot" && (
                  <div className="flex flex-col items-center font-semibold text-center">
                    <img
                      src={namaste}
                      alt="Bot Icon"
                      className="w-10 h-10 mr-2 border-blue-500 border-solid rounded-full border-1"
                    />
                    <p className="text-[13px]">Janaki</p>
                  </div>
                )}
                <div
                  className={`p-2 my-2 rounded-lg shadow-md transition-transform duration-200 ${
                    message.sender === "user"
                      ? "bg-gray-600 text-gray-200"
                      : "bg-blue-400 text-black"
                  } max-w-[80%] md:max-w-[70%] lg:max-w-[60%] text-xs md:text-sm lg:text-sm break-words`}
                >
                  {renderMessageText(message.text, message.isTyping)}
                </div>

                {message.sender === "user" && (
                  <div className="flex flex-col items-center p-0 text-center">
                    <img
                      src={userIcon}
                      alt="User Icon"
                      className="h-10 rounded-full w-14"
                    />
                    <p className="text-[13px]">
                      {user && user.first_name ? user.first_name : "User"}
                    </p>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center p-3 bg-gray-100 rounded-b-lg">
            <input
              type="text"
              className="flex-grow p-2 text-xs border-2 border-gray-300 rounded-l-lg md:text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <button
              type="button"
              disabled={isLoading}
              className={`p-2 ml-2 text-white rounded-lg shadow-lg transition-transform ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-105"
              }`}
              onClick={handleSendMessage}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      )}

      
      <style jsx>{`
       .typing-dots {
  display: flex;
  justify-content: center; 
  align-items: center; 
  height: 100%; 
}

.dot {
  font-size: 2rem;
  margin: 0 2px;
  animation: blink 2s infinite; 
}

.dot:nth-child(2) {
  animation-delay: 0.4s; 
}

.dot:nth-child(3) {
  animation-delay: 0.8s; 
}

@keyframes blink {
  0%, 33% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}


      `}</style>
    </>
  );
}
