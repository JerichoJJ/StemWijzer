import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Home.css';

const Home = () => {
  const [answers, setAnswers] = useState({
    // Initial answers state
    question1: '',
    question2: '',
    // ... voeg meer vragen toe
  });

  const handleAnswerChange = (e) => {
    // Update de antwoorden terwijl de gebruiker vragen beantwoordt
    const { name, value } = e.target;
    setAnswers({
      ...answers,
      [name]: value,
    });
  };

  const handleShowResults = () => {
    // Stuur antwoorden naar de backend om resultaten op te halen
    fetch('/api/calculate-results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(answers),
    })
      .then((response) => response.json())
      .then((data) => {
        // Toon de resultaten aan de gebruiker
        console.log(data.results);
      })
      .catch((error) => {
        console.error('Er is een fout opgetreden bij het ophalen van resultaten:', error);
      });
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Welkom bij Stemwijzer 2023</h1>
        <p>
          Stemwijzer 2023 helpt u bij het ontdekken van politieke partijen en hun standpunten.
        </p>
        <p>
          Beantwoord de vragenlijst en ontdek welke partij het beste bij uw opvattingen past.
        </p>
        <form>
          <div className="form-group">
            <label>Vraag 1:</label>
            <input
              type="text"
              name="question1"
              value={answers.question1}
              onChange={handleAnswerChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Vraag 2:</label>
            <input
              type="text"
              name="question2"
              value={answers.question2}
              onChange={handleAnswerChange}
              className="form-control"
            />
          </div>
          {/* Voeg meer vragen toe */}
          <button
            type="button"
            onClick={handleShowResults}
            className="btn btn-primary"
          >
            Resultaten weergeven
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
