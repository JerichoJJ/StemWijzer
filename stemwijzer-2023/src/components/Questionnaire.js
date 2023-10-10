// src/components/Questionnaire.js

import React, { useState } from 'react';

const Questionnaire = ({ questions }) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (questionId, optionId) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: optionId,
    });
  };

  return (
    <div>
      <h2>Vragenlijst</h2>
      <form>
        {questions.map((question) => (
          <div key={question.id}>
            <p>{question.text}</p>
            <ul>
              {question.options.map((option) => (
                <li key={option.id}>
                  <label>
                    <input
                      type="radio"
                      name={`question_${question.id}`}
                      value={option.id}
                      checked={selectedOptions[question.id] === option.id}
                      onChange={() => handleOptionChange(question.id, option.id)}
                    />
                    {option.text}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </form>
    </div>
  );
};

export default Questionnaire;
