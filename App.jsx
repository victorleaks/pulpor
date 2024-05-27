import React, { useEffect, useState } from 'react'; 
import './App.css'


function App(){
  const [cidade, setCidade] = useState('') 

  const [previsao, setPrevisao] = useState(null)


  const api = async () => {

    const chave = '3dfbc6ac607259bf51a123037c07017a'
   

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}`)
     
      if(response.ok) {
        const data = await response.json();
        setPrevisao(data);
      } else {
        console.error('Erro ao obter os dados da previsão do tempo!');
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição da API', error);
    }
  }

  const conversao = (kelvin) => {
    return (kelvin - 273.15).toFixed(2)
    
  }

  useEffect(() => {
    api(); 
  }, [])

  return (
    <div className="App">
      <h1>Previsão do Tempo</h1>

      <input 
        type="text" 
        value={cidade} 
        onChange={(e) => setCidade(e.target.value)} 
        
         placeholder="Digite o nome da cidade"
        />

        <button onClick={api}> 
          Obter Previsão do Tempo
        </button>
        {previsao && (
          <div className="info">
     

            <h2>{previsao.weather[0].description}</h2> 

            <b> <p>Minima: </p> </b> {conversao(previsao.main.temp_min)}ºC

            <b> <p>Maxima: </p> </b> {conversao(previsao.main.temp_max)}ºC

       

            <b> <p>Graus: </p> </b> {conversao(previsao.main.temp)}ºC

            <b> <p>Vento: </p> </b>  {previsao.wind.speed} m/s

            <b> <p>Umidade: </p> </b> {previsao.main.humidity}%


          </div>
        )}


    </div>
  )

}

export default App;