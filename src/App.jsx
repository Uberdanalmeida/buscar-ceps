import { useState } from 'react'
import './App.css'
import api from './server/api'
import { BsSearch } from "react-icons/bs";

function App() {
  const [count, setCount] = useState('')
  const [cep, setCep] = useState({})

 async function teste() {
    if(count === '') {
      alert('preencha os dados.')
      return;
    }

    try{
     const response = await api.get(`${count}/json`)
     setCep(response.data)
     setCount('')
     
    }catch{
     alert('cep invalido.')
     setCount('')
    }

  }

  return (
    <>
      <div className='container'>
        <h1 className='titulo'>Buscador de CEP</h1>

        <div className='input'>
          <input
  type="text"
  placeholder="Digite um CEP"
  value={count}
  onChange={(e) => setCount(e.target.value)}
  onKeyDown={(e) => e.key === 'Enter' && teste()}
/>

          <button className='botao' onClick={teste}>
  <BsSearch size={18} />
</button>
        </div>

        {Object.keys(cep).length > 0 && (
          <main className='main'>
          <h2>Cep: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
        )}

      </div>
    </>
  )
}

export default App
