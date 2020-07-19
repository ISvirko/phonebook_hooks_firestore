import React from "react";
import { useDispatch } from "react-redux";
import { contactsActions } from "../../redux/contacts";

const ResetButton = () => {
  const dispatch = useDispatch();

  return (
    <button
      className="btn btn-warning"
      type="button"
      onClick={() => dispatch(contactsActions.resetSearch())}
    >
      <i className="fas fa-undo"></i>
    </button>
  );
};

export default ResetButton;
