import { useState } from 'react'
import Navbar from '../components/Navbar';
import "../styles/Home.scss";
import Form from '../components/Form';
import Answer from '../components/Answer';
import Heading from '../components/Heading';



const apiKey = import.meta.env.VITE_API_KEY

export default function Home() {


  const [question, setQuestion] = useState("");
  const [passage, setPassage] = useState("");
  const [answer, setAnswer] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passageError, setPassageError] = useState(false);
  const [questionError, setQuestionError] = useState(false);



  const getAnswer = async (event) => {
    event.preventDefault();
    setLoading(true);

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
    setLoading(false);

    if (question === "") {
      setQuestionError(true);
      return;
    }
    if (passage === "") {
      setPassageError(true);
      return
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


        {answer && (
          <Answer answer={answer} />
        )}

        {isError && <p>Sorry, something went wrong. Please try again later</p>}
      </div>

    </>
  )
}
