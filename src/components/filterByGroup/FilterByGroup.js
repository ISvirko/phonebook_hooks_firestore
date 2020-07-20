import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomSelect from "../../ui/CustomSelect";
import { contactsSlice, contactsSelectors } from "../../redux/contacts";
import styles from "./FilterByGroup.module.css";

const FilterByGroup = () => {
  const group = useSelector((state) => contactsSelectors.getGroup(state));

  const dispatch = useDispatch();

  return (
    <div className={styles.filterWrapper}>
      <CustomSelect
        onChange={({ value }) =>
          dispatch(contactsSlice.groupSort.actions.sortByGroup(value))
        }
        value={
          group
            ? { value: group, label: group }
            : { value: "", label: "Search by group" }
        }
      />
    </div>
  );
};

export default FilterByGroup;
