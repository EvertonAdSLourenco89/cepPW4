import React, { useState } from 'react';

const App = () => {
  const [cep, setCep] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode enviar os dados para um backend ou apenas exibi-los no console por enquanto
    console.log({ nome, email, telefone, cep, endereco: data });
  };

  return (
    <div>
      <h1>Cadastro de Usuário</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
          />
        </div>

        <div>
          <label>Telefone:</label>
          <input
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="Digite seu telefone"
            required
          />
        </div>

        <div>
          <label>CEP:</label>
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            placeholder="Digite o CEP"
            required
          />
          <button type="button" onClick={handleFetch}>Buscar Endereço</button>
        </div>

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

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default App;
