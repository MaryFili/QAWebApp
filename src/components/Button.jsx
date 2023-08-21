import "../styles/Button.scss"

export default function Button({ getAnswer }) {
    return (
        <button className='btn' onClick={getAnswer}>Ask your question</button>
    )
}
