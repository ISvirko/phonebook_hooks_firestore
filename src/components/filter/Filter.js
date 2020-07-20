import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { contactsSlice, contactsSelectors } from "../../redux/contacts";

const Filter = () => {
  const filter = useSelector((state) => contactsSelectors.getFilter(state));

  const dispatch = useDispatch();

  return (
    <input
      type="text"
      className="form-control filter-input"
      placeholder="Search by name"
      value={filter}
      onChange={(e) =>
        dispatch(contactsSlice.filter.actions.handleFilter(e.target.value))
      }
    />
  );
};

export default Filter;
