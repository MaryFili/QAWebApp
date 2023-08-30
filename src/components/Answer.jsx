import "../styles/Answer.scss";
export default function Answer({ answer }) {



    return (
        <div className='answer-container'>
            <h2>Answer</h2>
            <div className="answer">
                <p>{answer}</p>
            </div>
        </div>
    )
}
