import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { dealsData } from '../../data';

const Dashboard = ({ setIsAuthenticated }) => {
  const [deals, setDeals] = useState(dealsData);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('deals_data'));
    if (data !== null && Object.keys(data).length !== 0) setDeals(data);
  }, []);

  const handleEdit = id => {
    const [deal] = deals.filter(deal => deal.id === id);

    setSelectedEmployee(deal);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [deal] = deals.filter(deal => deal.id === id);

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${deal.firstName} ${deal.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const dealsCopy = deals.filter(deal => deal.id !== id);
        localStorage.setItem('deals_data', JSON.stringify(dealsCopy));
        setDeals(dealsCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            deals={deals}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          deals={deals}
          setDeals={setDeals}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          deals={deals}
          selectedEmployee={selectedEmployee}
          setDeals={setDeals}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
