import React, { useState, useEffect } from 'react';
import PlanCard from './ClientFlipingCard';

const PlanCardList = ({ plans }) => {
  const [filteredPlans, setFilteredPlans] = useState(plans);
  const [filters, setFilters] = useState({
    cat_risk: '',
    cat_type: '',
    priceMin: '',
    priceMax: '',
    searchText: ''
  });
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let filtered = plans.filter(plan => {
      if (filters.cat_risk && plan.risk_cat !== filters.cat_risk) return false;
      if (filters.cat_type && plan.type_cat !== filters.cat_type) return false;
      if (filters.priceMin && parseFloat(plan.price) < parseFloat(filters.priceMin)) return false;
      if (filters.priceMax && parseFloat(plan.price) > parseFloat(filters.priceMax)) return false;
      if (filters.searchText && !(plan.advisor_id.includes(filters.searchText) || plan.plan_name.toLowerCase().includes(filters.searchText.toLowerCase()))) return false;
      return true;
    });
    setFilteredPlans(filtered);
  };

  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortPlans = () => {
    if (sortOption === 'rating') {
      return filteredPlans.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    } else if (sortOption === 'total_orders') {
      return filteredPlans.sort((a, b) => parseInt(b.total_orders) - parseInt(a.total_orders));
    } else {
      return filteredPlans;
    }
  };

  return (
<div>

<center>
      <div className="container">
        <div>
          <label>
            Filter by Risk Category:
            <select name="cat_risk" value={filters.cat_risk} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <label>
            Filter by Type Category:
            <select name="cat_type" value={filters.cat_type} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="Equity">Equity</option>
              <option value="Debts">Debts</option>
              <option value="Commodities">Commodities</option>
            </select>
          </label>
          <label>
            <br/>
            Price Range:
            <input type="number" name="priceMin" placeholder="Min" value={filters.priceMin} onChange={handleFilterChange} />
            <input type="number" name="priceMax" placeholder="Max" value={filters.priceMax} onChange={handleFilterChange} />
          </label>
          <label>
            Search by Advisor ID or Plan Name:
            <input type="text" name="searchText" value={filters.searchText} onChange={handleFilterChange} />
          </label>
        </div>

        <div>
          <label>
            Sort by:
            <select value={sortOption} onChange={handleSortChange}>
              <option value="">None</option>
              <option value="rating">Rating</option>
              <option value="total_orders">Total Orders</option>
            </select>
          </label>
        </div>
      </div></center>

      <br/>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {sortPlans().map((plan, index) => (
          <div key={index} style={{ width: '33%', padding: '10px' }}>
            <PlanCard plan={plan} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanCardList;
