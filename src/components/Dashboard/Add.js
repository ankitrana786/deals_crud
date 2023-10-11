import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ deals, setDeals, setIsAdding }) => {
  const [name, setName] = useState('');
  const [skus, setSku] = useState('');
  const [date, setDate] = useState('');
  const [expiry, setExpiryDate] = useState('');
  const [status, setStatus] = useState('ok'); // Initialize status with 'OK'
  const [target, setTarget] = useState(''); // Initialize target with 'Products'
  const [categories, setCategory] = useState(''); // Initialize categories with an empty string
  const [min_value,setMinValue] = useState('');
  const [discount_rate,setDiscountRate] = useState('');
  const [discount_in_value,setDiscountinvalue] = useState('');
  const [max_discount_allowed,setMaxDiscountAllowed] = useState('');
  const [type,setDealType] = useState('');
  const [priority,setPriority] = useState('');
  const [show_on_home,setShowOnHome] = useState('0');
  const [show_as_banner,setShowAsBanner] = useState('0');
  const handleAdd = e => {
    e.preventDefault();

    if (!name || !skus || !target || !categories || !date || !expiry || !type) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const id = deals.length + 1;
    let  deal={"min_value":min_value,"discount_rate":discount_rate,"discount_in_value":discount_in_value,"max_discount_allowed":max_discount_allowed}
    const newDeal = {
      id,
      name,
      type,
      skus,
      target,
      categories,
      priority,
      show_on_home,
      deal,
      date,
      expiry,
      status, // Add status to the employee data
      target, // Add target to the employee data
    };
    newDeal.agt_status="OK";
    newDeal.atm_status="OK";
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
      setTarget('');
      setCategory(''); // Reset the target to 'Products'
      setMinValue('');
      setDiscountRate('');
      setDiscountinvalue('');
      setMaxDiscountAllowed('');
      setExpiryDate('');
      setDealType('');
      setPriority('');
      setShowOnHome('0');
      setShowAsBanner('0');
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
        <label htmlFor="target">Deal Type</label>
        <select
          id="type"
          name="type"
          value={type}
          onChange={e => setDealType(e.target.value)}
        >
          <option value="">Select Deal Type</option>
          <option value="normal">Normal</option>
          <option value="addOn">Add On</option>
          <option value="flash">Flash</option>
        </select>
        <label htmlFor="target">Target</label>
        <select
          id="target"
          name="target"
          value={target}
          onChange={e => setTarget(e.target.value)}
        >
          <option value="">Select Target</option>
          <option value="products">Products</option>
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
          <option value="">Select Categories</option>
          <option value="Category1">Category 1</option>
          <option value="Category2">Category 2</option>
          <option value="Category3">Category 3</option>
          {/* Add more options as needed */}
        </select>
        {target === 'Products' && (
          <div>
            <label htmlFor="skus">SKU </label>
            <input
              id="skus"
              type="text"
              placeholder="SKU"
              name="skus"
              value={skus}
              onChange={e => setSku(e.target.value)}
            />
          </div>
        )}
        {target=="Categories" && (
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
        )}
        {target === 'Products' && (
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
        )}
        <label htmlFor="priority">Priority</label>
        <input
          id="priority"
          type="number"
          name="priority"
          placeholder="Priority"
          value={priority}
          onChange={e => setPriority(e.target.value)}
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
          id="expiry"
          type="date"
          name="expiry"
          value={expiry}
          onChange={e => setExpiryDate(e.target.value)}
        />
        <div className="show-container">
          <div>
            <label htmlFor="show_on_home">Show On Home</label>
            <div className="radio-container">
              <label>
                <input
                  type="radio"
                  name="show_on_home"
                  value="0"
                  checked={show_on_home === '0'}
                  onChange={() => setShowOnHome('0')}
                />
                No
              </label>
              <label>
                <input
                  type="radio"
                  name="show_on_home"
                  value="1"
                  checked={show_on_home === '1'}
                  onChange={() => setShowOnHome('1')}
                />
                Yes
              </label>
            </div>
          </div>
        <div>
          <label htmlFor="show_on_home">Show as Banner</label>
          <div className="radio-container">
            <label>
              <input
                type="radio"
                name="show_as_banner"
                value="0"
                checked={show_as_banner === '0'}
                onChange={() => setShowAsBanner('0')}
              />
              No
            </label>
            <label>
              <input
                type="radio"
                name="show_as_banner"
                value="1"
                checked={show_as_banner === '1'}
                onChange={() => setShowAsBanner('1')}
              />
              Yes
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <div className="radio-container">
            <label>
              <input
                type="radio"
                name="status"
                value="ok"
                checked={status === 'ok'}
                onChange={() => setStatus('ok')}
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
          </div>
        </div>
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
