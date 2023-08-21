import "../styles/Errors.scss"
import { BiErrorAlt } from 'react-icons/bi'


export default function Errors({ isError, textError }) {
    return (
        <div>
            {isError && (
                <div>
                    <BiErrorAlt className='error-icon' />
                    <p className='error'>Sorry, something went wrong. Please try again later</p>
                </div>)}
            {textError && (
                <div>
                    <BiErrorAlt className='error-icon' />
                    <p className='error'>Please enter a text and a question</p>
                </div>)}
        </div>
    )
}
