import React from 'react';

function PredictionResult({ prediction }) {
  return (
    <div className="prediction-result">
      <h2>Estimated Price: {prediction} MAD</h2>
    </div>
  );
}

export default PredictionResult;