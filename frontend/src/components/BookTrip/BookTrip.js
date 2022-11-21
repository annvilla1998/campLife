

// export const BookTrip = () => {
//     return (

//             {!finishedFirstPage && (
//                 <div className="book-modal">
//                     <img className="book-trip-background-image" src={site.images[0]}></img>
//                     <div className="book-trip-header">
//                         Book a trip to {site.name}
//                     </div>
//                     <div id="errors">
//                         {errors.map((error, ind) => (
//                         <div key={ind}>{error}</div>
//                         ))}
//                     </div>
//                     <div className="date-picker">
//                         <DatePicker
//                         onChange={value => setStartDate(value)}
//                         value={startDate}
//                         label="Start Date"
//                         formatStyle="large"
//                         required
//                         className="date"
//                         />
//                         <DatePicker
//                         required
//                         className="date"
//                         onChange={value => setEndDate(value)}
//                         value={endDate}
//                         label="End Date"
//                         />
//                     </div>
//                     <div onClick={checkFirstPage} className="continue-button">Continue to payment info</div>
//                 </div>
//             )}
//             {(finishedFirstPage && !completedPayment) && (
//                 <div className="payment-modal">
//                     <div id="errors">
//                     {errors.map((error, ind) => (
//                     <div key={ind}>{error}</div>
//                     ))}
//                     </div>
//                     <div className="book-forms">

//                         <form className="camper-details">
//                             <div style={{fontWeight:'bold'}}>Camper details:</div>
//                             <label>First Name
//                                 <input
//                                 type="text"
//                                 required
//                                 />
//                             </label>
//                             <label>Last Name
//                                 <input
//                                 type="text"
//                                 required
//                                 />
//                             </label>
//                             <label>Email Address
//                                 <input
//                                 type="text"
//                                 required
//                                 />
//                             </label>
//                             <label>Phone Number
//                                 <input
//                                 type="text"
//                                 required
//                                 placeholder="xxx - xxx - xxxx"
//                                 />
//                             </label>
//                             <label>Vehicles
//                                 <select>
//                                     <option>1</option>
//                                     <option>2</option>
//                                     <option>3</option>
//                                     <option>4</option>
//                                 </select>                      
//                             </label>
//                         </form>
//                         <form className="payment-form">
//                             <div style={{fontWeight:'bold'}}>Payment details:</div>
//                             <label>Card number
//                             <input 
//                             id="ccn" 
//                             type="tel" 
//                             inputMode="numeric" 
//                             pattern="[0-9\s]{13,19}" 
//                             autoComplete="cc-number"
//                             maxLength="19" 
//                             required
//                             placeholder="xxxx xxxx xxxx xxxx"/>
//                             </label>
//                             <label>Expiration
//                             <input 
//                             id="ccn" 
//                             type="tel" 
//                             required
//                             inputMode="numeric" 
//                             maxLength="4"
//                             placeholder="MM / YY"/>
//                             </label>
//                             <label>CVC
//                             <input 
//                             id="ccn" 
//                             type="tel" 
//                             required
//                             inputMode="numeric" 
//                             maxLength="3"
//                             placeholder="CVC"/>
//                             </label>
//                             <label>Country
//                                 <select
//                                 required>
//                                     <option>United States</option>
//                                     <option>United Kingdom</option>
//                                     <option>Afghanistan</option>
//                                     <option>Algeria</option>
//                                     <option>Brazil</option>
//                                     <option>Canada</option>
//                                     <option>Germany</option>
//                                     <option>Mexico</option>
//                                     <option>Norway</option>
//                                 </select>                      
//                             </label>
//                             <label>ZIP
//                             <input 
//                             id="ccn" 
//                             required
//                             type="tel" 
//                             inputMode="numeric" 
//                             maxLength="5"
//                             placeholder="xxxxx"/>
//                             </label>
//                         </form>
//                     </div>
//                     <div onClick={handleBookTrip} className="continue-button">Book now</div>
//                 </div>
//             )}
//             {completedPayment && (
//                 <div className="completed-gif-modal">
//                     <div className="completed-text-gif">
//                         <div>Payment Completed</div>
//                         <img alt="completed" src="https://media0.giphy.com/media/ibolLe3mOqHE3PQTtk/giphy.gif?cid=ecf05e47wt6jikigymk0nyb6zyv07u5g3lfnpzgpfmy1xkmw&rid=giphy.gif&ct=g"></img>
//                     </div>
//                     <div className="continue-button" onClick={() => setShowBookModal(false)}>Close</div>
//                 </div>
//             )}
        
//     )
// }

