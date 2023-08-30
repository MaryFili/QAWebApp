import { useState } from 'react'
import "../styles/Home.scss";
import Navbar from '../components/Navbar';
import Form from '../components/Form';
import Answer from '../components/Answer';
import Heading from '../components/Heading';
import Loader from '../components/Loader';
import Errors from '../components/Errors';


// const apiKey = import.meta.env.VITE_API_KEY
// const url = import.meta.env.VITE_URL

export default function Home() {


  const [question, setQuestion] = useState("");
  const [passage, setPassage] = useState("");
  const [answer, setAnswer] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textError, setTextError] = useState(false);


  return (
    <>
      <Navbar />
      <div className='home'>
        <Heading />

        <Form question={question} passage={passage} setQuestion={setQuestion} setPassage={setPassage} setAnswer={setAnswer} setIsError={setIsError} setTextError={setTextError} setIsLoading={setIsLoading} />

        {isLoading && <Loader />}

        {answer && (
          <Answer answer={answer} />
        )}

        <Errors isError={isError} textError={textError} />

      </div>

    </>
  )
}
