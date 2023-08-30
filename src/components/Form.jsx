import "../styles/Form.scss";
import Button from "./Button";
import { motion } from "framer-motion";



const apiKey = import.meta.env.VITE_API_KEY
const url = import.meta.env.VITE_URL
export default function Form({ passage, setPassage, question, setQuestion, setIsError, setIsLoading, setAnswer, setTextError }) {

    const getAnswer = async (event) => {
        try {
            event.preventDefault();
            setIsLoading(true);

            const response = await fetch(
                url,
                {
                    headers: { Authorization: `Bearer ${apiKey}` },
                    method: "POST",
                    body: JSON.stringify({ 'question': question, 'context': passage }),
                }
            );

            const result = await response.json();
            // console.log(result.answer);
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
                return;
            }
        } catch (error) {
            console.error(error);
            setIsError(true);
            setIsLoading(false);
        }
    };



    return (
        <motion.form
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className='form'>
            <textarea
                value={passage}
                onChange={(e) => setPassage(e.target.value)}
                type="text"
                className="passage"
                placeholder='Paste your text here'
                cols="50"
                rows="8"
                required="true"
            />
            <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                type="text"
                className="question"
                placeholder='Enter your question here'
                required="true"
            />
            <Button getAnswer={getAnswer} />

        </motion.form>
    )
}
