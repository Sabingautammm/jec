import React, { useState, useEffect, useCallback, useRef } from "react";
import namaste from "../images/namaste.jfif";

export default function Chatbot() {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null); // Ref for auto-scrolling

  const toggleChatbotVisibility = useCallback(() => {
    setIsChatbotVisible((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isChatbotVisible && messages.length === 0) {
      setMessages([
        { text: "Hi there! How can I help you today?", sender: "bot" },
      ]);
    }
  }, [isChatbotVisible, messages.length]);

  useEffect(() => {
    // Auto-scroll to the bottom when new messages are added
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (input.trim()) {
      setIsLoading(true);
      const newMessages = [...messages, { text: input, sender: "user" }];
      setMessages(newMessages);
      setInput("");

      try {
        const response = await fetch("https://jec.edu.np/api/chatbot/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input }),
        });

        const data = await response.json();
        setMessages([...newMessages, { text: data.response, sender: "bot" }]);
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
  }, [input, messages]);

  return (
    <>
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 z-50 flex flex-col items-center space-y-4">
        <img
          src={namaste}
          className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full shadow-lg"
          alt="Chatbot Icon"
        />
        <button
          type="button"
          className="bg-gradient-to-r from-blue-500 to-red-500 text-white text-xs md:text-sm lg:text-base p-2 md:p-2.5 lg:p-3 rounded-lg shadow-xl transition-transform transform hover:scale-105"
          onClick={toggleChatbotVisibility}
        >
          <span
            className="font-bold"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Janaki
          </span>
          <span
            className="block text-xs md:text-xs lg:text-sm font-bold"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            Chat with Janaki
          </span>
        </button>
      </div>

      {isChatbotVisible && (
        <div
          style={{ fontFamily: "'Merriweather', serif" }}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 z-50 w-[90%] max-w-xs md:max-w-md lg:max-w-[30%] h-96 md:h-96 lg:h-[460px] bg-white border-2 border-gray-300 rounded-lg shadow-xl flex flex-col"
        >
          <div className="flex justify-between items-center bg-blue-500 p-3 rounded-t-lg h-16 shadow-md">
            <h1 className="text-lg md:text-lg lg:text-xl font-bold text-white">
              Chat with Janaki
            </h1>
            <button
              type="button"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-500 text-white text-lg font-bold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-transform transform hover:scale-105"
              onClick={() => setIsChatbotVisible(false)}
            >
              &times;
            </button>
          </div>

          <div className="flex-1 p-3 my-2 overflow-y-auto space-y-3">
            <div aria-live="polite">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 my-2 rounded-lg shadow-md ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-black"
                    } max-w-[80%] md:max-w-[70%] lg:max-w-[60%] relative text-xs md:text-sm lg:text-base`}
                  >
                    {message.text}
                    {isLoading && index === messages.length - 1 && (
                      <div className="absolute bottom-0 left-0 right-0 h-2 bg-blue-600 animate-pulse"></div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="p-3 bg-gray-100 rounded-b-lg flex items-center">
            <input
              type="text"
              className="flex-grow p-2 border-2 border-gray-300 rounded-l-lg text-xs md:text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="ml-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white p-2 md:p-3 rounded-lg shadow-lg"
              onClick={handleSendMessage}
            >
              <span className="font-bold text-xs md:text-sm lg:text-base">
                Send
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
