import { useState } from 'react'
import Navbar from '../components/Navbar';
import "../styles/Home.scss";
import Form from '../components/Form';
import Answer from '../components/Answer';
import Heading from '../components/Heading';
import Loader from '../components/Loader';
import { BiErrorAlt } from 'react-icons/bi'
import Errors from '../components/Errors';


const apiKey = import.meta.env.VITE_API_KEY

export default function Home() {


  const [question, setQuestion] = useState("");
  const [passage, setPassage] = useState("");
  const [answer, setAnswer] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textError, setTextError] = useState(false);




  const getAnswer = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/bert-large-uncased-whole-word-masking-finetuned-squad",
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        method: "POST",
        body: JSON.stringify({ 'question': question, 'context': passage }),
      }
    );


    const result = await response.json();
    console.log(result.answer);
    setAnswer(result.answer);
    setIsError(false);
    setTextError(false);
    setIsLoading(false);

    if (question === "" || passage === "") {
      setTextError(true);
      return;
    }

    if (!result.answer) {
      setIsError(true);
      return
    }
  };

  return (
    <>
      <Navbar />
      <div className='home'>
        <Heading />

        <Form question={question} passage={passage} setQuestion={setQuestion} setPassage={setPassage} getAnswer={getAnswer} />

        {isLoading && <Loader />}

        {answer && (
          <Answer answer={answer} />
        )}

        <Errors isError={isError} textError={textError} />

      </div>

    </>
  )
}
