import React, { useState } from 'react';
import PredictionResult from './PredictionResult';
import { getPrediction } from './Services/predictionService';

function PredictionForm() {
  const [formData, setFormData] = useState({
    sallesDeBain: '',
    surface: '',
    chambres: '',
    salons: '',
    secteur: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'secteur' && value.trim() !== '') {
      const matches = secteurOptions.filter(option =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matches.length ? matches : ['No matches found']);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (value) => {
    setFormData({ ...formData, secteur: value });
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const result = await getPrediction(formData);
      setPrediction(result);
    } catch (error) {
      setError("Error fetching prediction. Please try again.");
      console.error("Error fetching prediction:", error);
    }
  };

  const secteurOptions = [
    'Aïn Borja', 'Maarif', 'Sidi Bernoussi', 'Bourgogne', 'Autre secteur',
    'Quartier des Hôpitaux', 'Oulfa', 'Racine', 'Oasis', 'Sidi Moumen',
    'Ferme Bretone', 'Hay Moulay Rachid 2', 'Laimoune', 'Roches Noires',
    'La Gironde', 'Belvédère', 'Lissasfa', 'Sidi Maarouf', 'Beauséjour',
    'Val Fleuri', 'Hay Mohammadi', '2 Mars', 'Bournazil', 'Californie',
    'Ain Sebaa', 'Maârif Extension', 'Les Princesses', 'Casablanca Finance City',
    'Sidi Othmane', 'Palmier', 'Almaz', 'Centre Ville', "Triangle d'Or",
    'Hay Hassani', 'Mers Sultan', 'C.I.L', "Route d'Azemmour", 'Anfa', 'Aïn Chock',
    'Al Qods', 'Nassim', 'Errahma', 'Derb Omar', 'La Gare', 'Hermitage',
    'Hay Albaraka', 'Hay Moulay Rachid 3', 'Abdelmoumen', 'Sbata',
    'Hay Moulay Rachid', 'Gauthier', 'Ben Ejdia', 'Aïn Diab', 'Franceville',
    "Ben M'sick", 'Bachkou', 'Al Fida', 'Hay Sadri', 'Florida', 'Sidi Belyout',
    'El Manar El Hank', 'Derb Ghallef', 'Riviera', 'Al Mostakbal',
    'Alsace Lorraine', 'Hay Inara', 'Tantonville', 'Hay Almassira 1',
    'Al Madina Aljadida', "Route d'El Jadida", 'Fonciere', 'Zone Industrielle',
    'Hay Alfalah', 'Hay Laymouna', 'Hay Moulay Rachid 6', 'Hay Moulay Rachid 4',
    'Hay Almassira 3', 'Hay Moulay Rachid 1', 'Parc', 'Les Camps', "Val d'Anfa",
    'Polo', 'Hay Al Amal', 'Hay Rajaa', 'Hay El Farah', 'Sour Jdid',
    'Zone Industrielle Moulay Rachid', 'Hay Almassira 2', 'Hay Hana',
    'Les Cretes', "Hay M'barka"
  ];

  return (
    <div className="prediction-form">
      <form onSubmit={handleSubmit}>
        <input type="number" name="sallesDeBain" value={formData.sallesDeBain} onChange={handleChange} placeholder="Number of Bathrooms" required />
        <input type="number" name="surface" value={formData.surface} onChange={handleChange} placeholder="Surface Area" required />
        <input type="number" name="chambres" value={formData.chambres} onChange={handleChange} placeholder="Number of Bedrooms" required />
        <input type="number" name="salons" value={formData.salons} onChange={handleChange} placeholder="Number of Living Rooms" required />
        <div className="autocomplete">
          <input
            type="text"
            name="secteur"
            value={formData.secteur}
            onChange={handleChange}
            placeholder="Enter a Sector"
            required
          />
          {showSuggestions && (
            <div className="suggestions">
              {suggestions.map((suggestion, index) => (
                <div key={index} onClick={() => handleSelectSuggestion(suggestion)}>
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="button-container">
          <button type="submit">Predict Price</button>
        </div>
      </form>
      {error && <div className="error">{error}</div>}
      {prediction && <PredictionResult prediction={prediction} />}
    </div>
  );
}

export default PredictionForm;
