const genders = ['Male', 'Female'];
const paymentMethods = ['cc', 'money order', 'check', 'paypal'];

const Filters = ({ onGenderFilter, onPaymentMethodFilter }) => {
    return (<div className='filters__container'>
        <div className='filter'>
            <label for='gender'>Gender</label>
            <select id='gender' name='gender' className='form-control' defaultValue='' onChange={onGenderFilter}>
                <option value=''>All</option>
                {genders.map((gender, index) => (<option key={`gender-${index}`} value={gender}>{gender}</option>))}
            </select>
        </div>

        <div className='filter'>
            <label for='paymentMethod'>Payment Type</label>
            <select id='paymentMethod' name='paymentMethod' className='form-control' defaultValue='' onChange={onPaymentMethodFilter}>
                <option value=''>All</option>
                {paymentMethods.map((paymentMethod, index) => (<option key={`paymentMethod-${index}`} value={paymentMethod}>{paymentMethod}</option>))}
            </select>
        </div>
    </div>)
}

export default Filters;
