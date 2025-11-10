import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "Må jeg kunne svømme, sykle og løpe?",
      answer:
        "Ja, det er litt av poenget. Men vi heier på deg uansett hvor mange grener du mestrer.",
    },
    {
      question: "Kan jeg bruke enhjulsykkel på sykkeletappen?",
      answer:
        "Bare hvis du også svømmer butterfly og løper baklengs.",
    },
    {
      question: "Kan jeg delta i badekåpe og crocs?",
      answer:
        "Vi elsker stilen, men det er nok ikke helt etter reglementet",
    },
    {
      question: "Er det normalt å gråte litt underveis?",
      answer:
        "Ja, helt normalt. Vi kaller det hydrering med følelser.",
    },
       {
      question: "Hva skjer hvis jeg glemmer hvilken etappe jeg er på?",
      answer:
        "Se deg rundt: er folk våte, på hjul eller svette? Velg deretter.",
    },
       {
      question: "Kan jeg donere penger til arrangementet?",
      answer:
        "Ja, absolutt. Vi trenger penger til egenkapital, så det kommer godt med! Vipps til 94780990 (helst) eller 90956083.",
    },
       {
      question: "Hvor skal man sove, spise og drite?",
      answer:
        "Du sover der du finner en plass, spiser med fellesskapet og driter alene på passende sted.",
    },
      
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "80px auto",
        padding: "0 20px",
        textAlign: "left",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "40px" }}>FAQ</h2>
      {faqData.map((item, index) => (
        <div
          key={index}
          style={{
            borderBottom: "1px solid #ddd",
            padding: "16px 0",
            cursor: "pointer",
          }}
          onClick={() => toggle(index)}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: "600",
              color: "#000",
            }}
          >
            {item.question}
          </h3>
          {openIndex === index && (
            <div
              style={{
                marginTop: "10px",
                background: "#f8f8f8",
                padding: "15px",
                borderRadius: "8px",
                fontSize: "16px",
                color: "#333",
              }}
            >
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

