import React from 'react';

const Table = ({ deals, handleEdit, handleDelete }) => {
  deals.forEach((deal, i) => {
    deal.id = i + 1;
  });

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
  });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Date</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {deals.length > 0 ? (
            deals.map((deal, i) => (
              <tr key={deal.id}>
                <td>{i + 1}</td>
                <td>{deal.firstName}</td>
                <td>{deal.lastName}</td>
                <td>{deal.email}</td>
                <td>{formatter.format(deal.salary)}</td>
                <td>{deal.date} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(deal.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(deal.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Employees</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
