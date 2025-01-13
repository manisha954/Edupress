// pages/index.js
"use client";
import { useState } from "react";
import Navbar from "../LandingPagesUi/Navbar";
import Footer from "../LandingPagesUi/Footer";

interface FAQProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQ = ({ question, answer, isOpen, onClick }: FAQProps) => {
  return (
    <div className="mb-4">
      <div
        className={`flex justify-between items-center px-6 py-4 rounded-lg cursor-pointer ${
          isOpen ? "bg-gray-200 text-orange-500" : "bg-gray-100 text-gray-700"
        }`}
        onClick={onClick}
      >
        <span className="text-sm font-semibold">{question}</span>
        <span className="text-base font-bold">{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && (
        <div className="px-6 py-4 text-sm bg-white border-b">{answer}</div>
      )}
    </div>
  );
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What Does Royalty Free Mean?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      question: "How Do I Subscribe?",
      answer:
        "Cras facilisis faucibus odio arcu duis dui, adipiscing facilisis...",
    },
    {
      question: "Can I Cancel Anytime?",
      answer:
        "Urna, donec turpis egestas volutpat. Quisque nec non amet quis...",
    },
    {
      question: "What Payment Methods Are Accepted?",
      answer:
        "Varius tellus justo odio parturient mauris curabitur lorem in...",
    },
  ];

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto pt-24 mb-12 px-4">
        <h1 className="md:text-3xl text-2xl font-bold mb-6">FAQs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {faqs.map((faq, index) => (
            <FAQ
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
        <img src="/images/faq.png" alt="" className="w-full md:w-1/2" />
      </div>
      <Footer />
    </div>
  );
}
