import React from "react";
import { useDispatch } from "react-redux";
import { contactsSlice } from "../../redux/contacts";

const ResetButton = () => {
  const dispatch = useDispatch();

  return (
    <button
      className="btn btn-warning"
      type="button"
      onClick={() => {
        dispatch(contactsSlice.filter.actions.resetSearch());
        dispatch(contactsSlice.groupSort.actions.resetSearch());
      }}
    >
      <i className="fas fa-undo"></i>
    </button>
  );
};

export default ResetButton;
