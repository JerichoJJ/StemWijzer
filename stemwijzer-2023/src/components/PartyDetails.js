import React from 'react';

const PartyDetails = ({ party }) => {
  return (
    <div>
      <h2>{party.name}</h2>
      <p>
        <strong>Partijleider:</strong> {party.leader}
      </p>
      <p>
        <strong>Beschrijving:</strong> {party.description}
      </p>
      <p>
        <strong>Standpunten:</strong>
      </p>
      <ul>
        {party.positions.map((position, index) => (
          <li key={index}>{position}</li>
        ))}
      </ul>
    </div>
  );
};

export default PartyDetails;
