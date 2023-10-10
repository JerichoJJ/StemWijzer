// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  // Hier kun je de vragen voor de stemwijzer definiëren
  const questions = [
    {
      id: 1,
      text: "Wat is uw standpunt over belastingverlagingen?",
      options: ["Voor", "Tegen", "Neutraal"]
    },
    {
      id: 2,
      text: "Hoe denkt u over milieubescherming?",
      options: ["Belangrijk", "Minder belangrijk", "Niet belangrijk"]
    },
    {
      id: 3,
      text: "Wat is uw standpunt over immigratie?",
      options: ["Strenger immigratiebeleid", "Soepeler immigratiebeleid", "Neutraal"]
    }
    // Voeg hier meer vragen toe
  ];

  // Functie om de geselecteerde antwoorden op te slaan
  const handleAnswerSelect = (questionId, selectedOption) => {
    // Voeg hier logica toe om de antwoorden op te slaan
    console.log(`Vraag ${questionId}: ${selectedOption}`);
  };

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      <div className="stemwijzer">
        <h2>Stemwijzer</h2>
        <form>
          {questions.map((question) => (
            <div key={question.id} className="stemwijzer-question">
              <p>{question.text}</p>
              {question.options.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name={`question_${question.id}`}
                    value={option}
                    onChange={() => handleAnswerSelect(question.id, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <button type="submit">Resultaten</button>
        </form>
      </div>
    </header>
  );
};

export default Header;
