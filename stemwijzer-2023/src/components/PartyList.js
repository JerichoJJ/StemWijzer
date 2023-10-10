import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PartyList from '../components/PartyList';

const parties = [
  {
    id: 1,
    name: 'Partij A',
    leader: 'Leider A',
    positions: ['Standpunt 1A', 'Standpunt 2A', 'Standpunt 3A'],
  },
  // Voeg hier de gegevens van de andere politieke partijen toe
  { 
    id: 30,
    name: 'Partij Z',
    leader: 'Leider Z',
    positions: ['Standpunt 1Z', 'Standpunt 2Z', 'Standpunt 3Z'],
  },
];

const Home = () => {
  return (
    <div>
      <Header />
      <div className="container">
        {/* Andere inhoud van de Home-pagina */}
        <PartyList parties={parties} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
