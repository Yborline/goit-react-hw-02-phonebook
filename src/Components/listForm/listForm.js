import PropTypes from "prop-types";
import s from "./listForm.module.css";

const ListForm = ({ onContacts, onDelete }) => {
  return (
    <ul className={s.list}>
      {onContacts().map((contact) => (
        <li className={s.line} key={contact.id}>
          <span>{contact.name}: </span>
          <span>{contact.number}</span>
          <button
            className={s.button}
            type="submit"
            onClick={() => onDelete(contact.id)}
          >
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};
ListForm.propTypes = {
  onContacts: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ListForm;
