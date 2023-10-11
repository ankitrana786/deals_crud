import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ deals, setDeals, setIsAdding }) => {
  const [name, setName] = useState('');
  const [skus, setSku] = useState('');
  const [date, setDate] = useState('');
  const [expiry_date, setExpiryDate] = useState('');
  const [status, setStatus] = useState('OK'); // Initialize status with 'OK'
  const [target, setTarget] = useState('Products'); // Initialize target with 'Products'
  const [categories, setCategory] = useState(''); // Initialize categories with an empty string
  const [min_value,setMinValue] = useState('');
  const [discount_rate,setDiscountRate] = useState('');
  const [discount_in_value,setDiscountinvalue] = useState('');
  const [max_discount_allowed,setMaxDiscountAllowed] = useState('');
  const handleAdd = e => {
    e.preventDefault();

    if (!name || !skus || !target || !categories || !date || !expiry_date) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const id = deals.length + 1;
    let  Deal={"min_value":min_value,"discount_rate":discount_rate,"discount_in_value":discount_in_value,"max_discount_allowed":max_discount_allowed}
    const newDeal = {
      id,
      name,
      skus,
      target,
      categories,
      Deal,
      date,
      expiry_date,
      status, // Add status to the employee data
      target, // Add target to the employee data
    };
    console.log(newDeal)
    return;
    deals.push(newDeal);
    localStorage.setItem('deals_data', JSON.stringify(deals));
    setDeals(deals);
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${name} ${skus}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleClear = () => {
    // Reset all form fields and status
     setName('');
      setSku('');
      setDate('');
      setStatus('OK');
      setTarget('Products');
      setCategory(''); // Reset the target to 'Products'
      setMinValue('');
      setDiscountRate('');
      setDiscountinvalue('');
      setMaxDiscountAllowed('');
      setExpiryDate('');
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Deal</h1>
        <label htmlFor="name">Deal Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Deal Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor="skus">SKU </label>
        <input
          id="skus"
          type="text"
          placeholder="SKU"
          name="skus"
          value={skus}
          onChange={e => setSku(e.target.value)}
        />
        
        <label htmlFor="date">Creation Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <label htmlFor="date">Expiry Date</label>
        <input
          id="expiry_date"
          type="date"
          name="expiry_date"
          value={expiry_date}
          onChange={e => setExpiryDate(e.target.value)}
        />
        <label htmlFor="target">Target</label>
        <select
          id="target"
          name="target"
          value={target}
          onChange={e => setTarget(e.target.value)}
        >
          <option value="Products">Products</option>
          <option value="Categories">Categories</option>
          <option value="Cart-value">Cart-value</option>
          <option value="Category-value">Category-value</option>
        </select>
        <label htmlFor="categories">Category</label>
        <select
          id="categories"
          name="categories"
          value={categories}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a categories</option>
          <option value="Category1">Category 1</option>
          <option value="Category2">Category 2</option>
          <option value="Category3">Category 3</option>
          {/* Add more options as needed */}
        </select>
        <div>
           <label htmlFor="deal">Deals (Cart Value) </label>
            <div className="deals-container">
              <input
                id="min_value"
                type="number"
                name="min_value"
                placeholder="min value"
                value={min_value}
                onChange={e => setMinValue(e.target.value)}
              />
              <input
                id="discount_rate"
                type="number"
                name="discount_rate"
                placeholder="discount rate"
                value={discount_rate}
                onChange={e => setDiscountRate(e.target.value)}
              />
              <input
                id="discount_in_value"
                type="number"
                name="discount_in_value"
                placeholder="discount value"
                value={discount_in_value}
                onChange={e => setDiscountinvalue(e.target.value)}
              />
              <input
                id="max_discount_allowed"
                type="number"
                name="max_discount_allowed"
                placeholder="max discount allowed"
                value={max_discount_allowed}
                maxLength={1000}
                onChange={e => setMaxDiscountAllowed(e.target.value)}
              />
            </div>
        </div>
        <div>
           <label htmlFor="deal">Deals (Products or Categories) </label>
            <div className="deals-container">
              <input
                id="discount_rate"
                type="number"
                name="discount_rate"
                placeholder="discount rate"
                value={discount_rate}
                onChange={e => setDiscountRate(e.target.value)}
              />
              <input
                id="discount_in_value"
                type="number"
                name="discount_in_value"
                placeholder="discount value"
                value={discount_in_value}
                onChange={e => setDiscountinvalue(e.target.value)}
              />
              <input
                id="max_discount_allowed"
                type="number"
                name="max_discount_allowed"
                placeholder="max discount allowed"
                value={max_discount_allowed}
                maxLength={1000}
                onChange={e => setMaxDiscountAllowed(e.target.value)}
              />
            </div>
        </div>
        <label htmlFor="status">Status</label>
        <div className="radio-container">
          <label>
            <input
              type="radio"
              name="status"
              value="OK"
              checked={status === 'OK'}
              onChange={() => setStatus('OK')}
            />
            OK
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="HIDE"
              checked={status === 'HIDE'}
              onChange={() => setStatus('HIDE')}
            />
            HIDE
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="DELETE"
              checked={status === 'DELETE'}
              onChange={() => setStatus('DELETE')}
            />
            DELETE
          </label>
        </div>
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Clear"
            onClick={handleClear}
          />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
