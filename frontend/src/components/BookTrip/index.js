import { useState } from 'react'
import './bookTrip.css'
import { DatePicker } from 'react-rainbow-components';
import { render } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createTrip } from '../../store/trips'

export const BookTrip = ({site, setShowBookModal}) => {
    const [startDate, setStartDate] = useState(null);
    const dispatch = useDispatch()
    const [endDate, setEndDate] = useState(null);
    const [finishedFirstPage, setFinishedFirstPage] = useState(false);
    const [completedPayment, setCompletedPayment] = useState(false)
    const [errors, setErrors] = useState([])
    const sessionUser = useSelector(state => state.session.user);
    const today = Date.now()
    const date = new Date(today)

    const validate = () => {
        const validationErrors = [];
        
        if(!startDate) validationErrors.push("Please enter a start date.")
        if(!endDate) validationErrors.push("Please enter an end date.")
        if(startDate && startDate.getTime() <= date.getTime()) validationErrors.push("Please choose a future start date.")
        if(endDate && endDate.getTime() <= startDate.getTime()) validationErrors.push("Your start date must be after your ending date.")

        return validationErrors
    }
    
    const checkFirstPage = (e) => {
        e.preventDefault()

        const errors = validate()
        if(errors.length > 0) return setErrors(errors)
        else {
            setFinishedFirstPage(true)
            setErrors([])
        }
    }

console.log(completedPayment)
    const handleBookTrip = async(e) => {
        e.preventDefault();

        const newTrip = {
            userId: sessionUser.id,
            siteId: site.id,
            startDate,
            endDate
        }

        await dispatch(createTrip(newTrip)).then(() => {
            setCompletedPayment(true)      
        })


    }

    return (
        <div>
            {!finishedFirstPage && (
                <div className="book-modal">
                    <img className="book-trip-background-image" src={site.images[0]}></img>
                    <div className="book-trip-header">
                        Book a trip to {site.name}
                    </div>
                    <div id="errors">
                        {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                        ))}
                    </div>
                    <div className="date-picker">
                        <DatePicker
                        onChange={value => setStartDate(value)}
                        value={startDate}
                        label="Start Date"
                        formatStyle="large"
                        required
                        className="date"
                        />
                        <DatePicker
                        required
                        className="date"
                        onChange={value => setEndDate(value)}
                        value={endDate}
                        label="End Date"
                        />
                    </div>
                    <div onClick={checkFirstPage} className="continue-button">Continue to payment info</div>
                </div>
            )}
            {(finishedFirstPage && !completedPayment) && 
                <div className="payment-modal">
                    <div id="errors">
                    {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                    ))}
                    </div>
                    <div className="book-forms">

                        <form className="camper-details">
                            <div style={{fontWeight:'bold'}}>Camper details:</div>
                            <label>First Name
                                <input
                                type="text"
                                required
                                />
                            </label>
                            <label>Last Name
                                <input
                                type="text"
                                required
                                />
                            </label>
                            <label>Email Address
                                <input
                                type="text"
                                required
                                />
                            </label>
                            <label>Phone Number
                                <input
                                type="text"
                                required
                                />
                            </label>
                            <label>Vehicles
                                <select>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>                      
                            </label>
                        </form>
                        <form className="payment-form">
                            <div style={{fontWeight:'bold'}}>Payment details:</div>
                            <label>Card number
                            <input 
                            id="ccn" 
                            type="tel" 
                            inputMode="numeric" 
                            pattern="[0-9\s]{13,19}" 
                            autoComplete="cc-number"
                            maxLength="19" 
                            required
                            placeholder="xxxx xxxx xxxx xxxx"/>
                            </label>
                            <label>Expiration
                            <input 
                            id="ccn" 
                            type="tel" 
                            required
                            inputMode="numeric" 
                            maxLength="4"
                            placeholder="MM / YY"/>
                            </label>
                            <label>CVC
                            <input 
                            id="ccn" 
                            type="tel" 
                            required
                            inputMode="numeric" 
                            maxLength="3"
                            placeholder="CVC"/>
                            </label>
                            <label>Country
                                <select
                                required>
                                    <option>United States</option>
                                    <option>United Kingdom</option>
                                    <option>Afghanistan</option>
                                    <option>Algeria</option>
                                    <option>Brazil</option>
                                    <option>Canada</option>
                                    <option>Germany</option>
                                    <option>Mexico</option>
                                    <option>Norway</option>
                                </select>                      
                            </label>
                            <label>ZIP
                            <input 
                            id="ccn" 
                            required
                            type="tel" 
                            inputMode="numeric" 
                            maxLength="5"
                            placeholder="xxxxx"/>
                            </label>
                        </form>
                    </div>
                    <div onClick={handleBookTrip} className="continue-button">Book now</div>
                </div>
            }
            {completedPayment && (
                <div className="completed-gif-modal">
                    <div className="completed-text-gif">
                        <div>Payment Completed</div>
                        <img src="https://media0.giphy.com/media/ibolLe3mOqHE3PQTtk/giphy.gif?cid=ecf05e47wt6jikigymk0nyb6zyv07u5g3lfnpzgpfmy1xkmw&rid=giphy.gif&ct=g"></img>
                    </div>
                    <div className="continue-button" onClick={() => setShowBookModal(false)}>Close</div>
                </div>
            )}
        </div>
    )
}