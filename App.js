import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const apiKey = "8VZWIjdhwAWLfywYYf20LmzMluNk43Y9hRSm0Q8G";
  const [date, setDate] = useState("");
  const [data, setData] = useState("");
  const [mediaType, setMediaType] = useState(""); // Para verificar se é vídeo ou imagem
  const [mediaUrl, setMediaUrl] = useState("");
  let day = new Date().getDate();
  let month = new Date().getMonth();
  let year = new Date().getFullYear();

  const handleChange = (event) => {
    setDate(event.target.value);
  };

  const fetchData = () => {
    if (date) {
      fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`)
        .then((response) => response.json())
        .then(data => {
          setData(data);
          if (data.media_type === "image" || data.media_type === "video") {
            setMediaType(data.media_type);
            setMediaUrl(data.url);
          }
          else{
            setMediaType("none");
          }
        })
        .catch(error => console.error(error));
    }
  };

  useEffect(() => {
    fetchData();
  }, [date]);

  return (
    <div className="App">
      <header>
        <input type='date' value={date} onChange={handleChange} style={{ width: '300px', height: '50px', textAlign: 'center', fontSize: '35px', fontFamily: 'arial' }}  />
      </header>

      {mediaType === "video"?(
        <a href={mediaUrl}>
          {mediaUrl}
        </a>

      ) : mediaType === "image" ? (
        <img src={mediaUrl} alt = "NASA APOD" /> 
      ) : mediaType === "none" ? (
        <p>Insira uma data entre 16-06-1995 e 0{day}-0{month}-{year}</p>
      ) : null
      }
      {data && (
        <div id='texto'>
          <p>{data.explanation}</p>
        </div>
      )}



    </div>
  );
}

export default App;
