import {useState} from 'react'
import Navbar from '../components/Navbar';
import "../styles/Home.scss";



const apiKey = import.meta.env.VITE_API_KEY

export default function Home() {


    const [question, setQuestion] = useState("");
    const [passage, setPassage] = useState("");
    const [answer, setAnswer] = useState("");
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
  
  
  
    const getAnswer = async (event) => {
      event.preventDefault();
      setLoading(true);
  
      const response = await fetch(
        "https://api-inference.huggingface.co/models/bert-large-uncased-whole-word-masking-finetuned-squad",
        {
          headers: { Authorization: `Bearer ${apiKey}` },
          method: "POST",
          body: JSON.stringify({'question': question, 'context': passage}),
        }
      );
      const result = await response.json();
      console.log(result.answer);
      setAnswer(result.answer);
      setLoading(false);
  
      if(!result.answer)
        setIsError(true);
    };

  return (<>

 
    <Navbar/>
    <div className='home'>

<div className='heading-container'>

      <h1 className="main-heading">
         Question Answering
      </h1>
      <p className="sub-heading">Explore our Question Answering Web App</p>
      <p>Paste your text, ask questions in another box, get answers. Easy and quick</p>
      </div>
      <form>
        <label>Enter the Question</label>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          type="text"
        />

        <label>Enter the Context</label>
     
        <textarea
          value={passage}
          onChange={(e) => setPassage(e.target.value)}
          type="text"
        />
      </form>

      <button onClick={getAnswer}>Ask your question</button>

      {answer && (
        <div>
          <label>Answer</label>
          <div>
            <p>{answer}</p>
          </div>
        </div>
      )}

      {isError && <p>Sorry, something went wrong. Please try again later</p>}
    </div>
   
     </>
  )
}
