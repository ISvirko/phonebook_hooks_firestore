import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import CustomSelect from "../../ui/CustomSelect";
import { contactsOperations, contactsSlice } from "../../redux/contacts";
import styles from "./EditForm.module.css";

const EditForm = ({ editedContact }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [selectedGroup, setGroup] = useState("");

  useEffect(() => {
    const { name, number, selectedGroup } = editedContact;

    setName(name);
    setNumber(number);
    setGroup(selectedGroup ? selectedGroup : "");
  }, [editedContact]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim && number.trim()) {
      dispatch(
        contactsOperations.editContact(editedContact, {
          name,
          number,
          selectedGroup,
        })
      );

      setName("");
      setNumber("");
      setGroup("");

      dispatch(contactsSlice.items.actions.changeEditMode(editedContact.id));
    } else {
      alert("Please fill in the required fields");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formEdit}>
      <div className={styles.selectEdit}>
        <CustomSelect
          onChange={({ value }) => setGroup(value)}
          value={
            selectedGroup
              ? { value: selectedGroup, label: selectedGroup }
              : { value: "", label: "Select group" }
          }
        />
      </div>

      <input
        type="text"
        className="form-control edit-input"
        name="name"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="tel"
        className="form-control edit-input"
        name="number"
        placeholder="Enter phone number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <button type="submit" className="btn btn-success edit-button">
        <i className="far fa-save"></i>
      </button>
    </form>
  );
};

export default EditForm;
