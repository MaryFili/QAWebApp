import "../styles/Form.scss"
import Button from "./Button"

export default function Form({ passage, setPassage, question, setQuestion, getAnswer }) {
    return (
        <form className='form'>


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

        </form>
    )
}
