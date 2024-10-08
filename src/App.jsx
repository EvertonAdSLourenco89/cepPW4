import React, { useState } from 'react';

const App = () => {
  const [cep, setCep] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    setError(null); // Limpa o erro anterior
    setData(null); // Limpa os dados anteriores

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) {
        throw new Error('CEP não encontrado');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Buscar CEP</h1>
      <input
        type="text"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        placeholder="Digite o CEP"
      />
      <button onClick={handleFetch}>Buscar</button>

      {error && <div style={{ color: 'red' }}>Erro: {error}</div>}
      {data && (
        <div>
          <h2>Endereço:</h2>
          <p>Rua: {data.logradouro}</p>
          <p>Bairro: {data.bairro}</p>
          <p>Cidade: {data.localidade}</p>
          <p>Estado: {data.uf}</p>
        </div>
      )}
    </div>
  );
};

export default App;
