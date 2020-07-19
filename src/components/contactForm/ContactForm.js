import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CustomSelect from "../../ui/CustomSelect";
import { contactsOperations } from "../../redux/contacts";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [selectedGroup, setGroup] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim && number.trim()) {
      dispatch(contactsOperations.addContact({ name, number, selectedGroup }));

      setName("");
      setNumber("");
      setGroup("");
    } else {
      alert("Please fill in the required fields");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <fieldset>
        <div className="form-group">
          <label htmlFor="nameInput" className={styles.formLabel}>
            Name*
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="nameInput"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="numberInput" className={styles.formLabel}>
            Phone Number*
          </label>
          <input
            type="tel"
            className="form-control"
            name="number"
            id="numberInput"
            placeholder="Enter phone number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <CustomSelect
          onChange={({ value }) => setGroup(value)}
          value={
            selectedGroup
              ? { value: selectedGroup, label: selectedGroup }
              : { value: "", label: "Select group" }
          }
          className={styles.select}
        />

        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </fieldset>
    </form>
  );
};

export default ContactForm;
