import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChatbubblesOutline, IoClose } from "react-icons/io5";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "👋 Welcome to FixItNow! We’re here to make your home repairs easier and faster. How can we help you today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);

  const services = [
    "Plumbing Repair",
    "Electrical Maintenance",
    "Home Cleaning",
    "AC & Fridge Repair",
    "Carpentry & Furniture Fixing",
    "Painting & Renovation",
    "Appliance Installation",
  ];

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => handleBotFlow(), 800);
  };

  const handleBotFlow = () => {
    if (step === 0) {
      const reply = `Here are the home repairing services we currently provide:\n\n${services
        .map((s) => `• ${s}`)
        .join("\n")}\n\nPlease choose any service you’d like to book.`;
      setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
      setStep(1);
    } else if (step === 1) {
      const reply =
        "To book a service, simply go to the **Services** page, select your desired service, and click the **Book Now** button. 🛠️\n\nOur team will confirm your request and send a technician to your location shortly.";
      setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
      setStep(2);
    } else if (step === 2) {
      const reply =
        "🙏 Thanks for contacting **FixItNow**! We’re always ready to serve you. Have a wonderful day! 🌟";
      setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
      setStep(3);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-10000 flex flex-col items-end">
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="w-80 sm:w-96 bg-white dark:bg-gray-900 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden backdrop-blur-md"
          >
            {/* Header */}
            <div className="bg-primary text-white dark:bg-indigo-600 flex justify-between items-center px-4 py-3">
              <h4 className="font-semibold text-lg">FixItNow Assistant</h4>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded-full transition"
              >
                <IoClose size={20} />
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto max-h-80 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-[80%] whitespace-pre-line leading-relaxed text-sm shadow-sm ${
                      msg.sender === "user"
                        ? "bg-primary text-white dark:bg-indigo-500"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-gray-200 dark:border-gray-700 flex gap-2 bg-gray-50 dark:bg-gray-800"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 text-sm px-3 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-indigo-500 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              />
              <button
                type="submit"
                className="btn bg-primary hover:bg-primary/90 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-primary dark:bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition duration-300"
      >
        <IoChatbubblesOutline size={26} />
      </motion.button>
    </div>
  );
};

export default ChatWidget;
