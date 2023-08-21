import "../styles/Form.scss";
import Button from "./Button";
import { motion } from "framer-motion";

export default function Form({ passage, setPassage, question, setQuestion, getAnswer }) {
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
