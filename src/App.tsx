import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';

type IBGEUFresponse = {
  id: number;
  sigla: string;
  nome: string;
}

type IBGECITYresponse = {
  id: number;
  nome: string;
}

export const App = () => {

  const [ufs, setUfs] = useState<IBGEUFresponse[]>([]);

  const [selectedUf, setSelectedUf] = useState('0');

  const [cities, setCities] = useState<IBGECITYresponse[]>([]);

  const [selectedCity, setSelectedCity] = useState('0')

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
      .then(response => {
        console.log(response.data);
        setUfs(response.data);
      })
  }, []);

  useEffect(() => {
    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
        console.log(response.data);
        setCities(response.data);
      })
  }, [selectedUf]);

  const handleSelectedUf = (event: ChangeEvent<HTMLSelectElement>) => {
    const uf = event.target.value;
    setSelectedUf(uf);
  }

  const handleSelectedCity = (event: ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;
    setSelectedCity(city);
  }

  return (
    <>
      <h1>Seletor de UFs e Cidades</h1>
      <div className="container">
        <select
          name="uf"
          id="uf"
          onChange={handleSelectedUf}
        >
          <option value="0">Selecione a UF</option>
          {ufs.map(uf => (
            <option
              key={uf.id}
              value={uf.id}
            >
              {uf.nome}
            </option>
          ))}
        </select>

        <select
          name="city"
          id="city"
          value={selectedCity}
          onChange={handleSelectedCity}
        >
          <option value="0">Selecione a Cidade</option>
          {cities.map(city => (
            <option
              key={city.id}
              value={city.id}
            >
              {city.nome}
            </option>
          ))}
        </select>

        <div>
          <span>{selectedCity}</span>
        </div>

      </div>
    </>
  )
}