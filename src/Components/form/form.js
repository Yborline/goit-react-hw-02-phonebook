import { Component } from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import s from "./form.module.css";

class Form extends Component {
  state = {
    name: "",
    number: "",
  };
  nameinputId = nanoid();
  numberInputId = nanoid();

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.value.find((contact) => contact.number === this.state.number)
      ? alert("Такой номер уже используется")
      : this.props.onSubmit(this.state);
    this.reset();
  };

  handleChange = (event) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };
  reset() {
    this.setState({ name: "", number: "" });
  }

  render() {
    return (
      <form className={s.form} onSubmit={this.handleSubmit}>
        <label htmlFor={this.nameinputId}>
          Имя{" "}
          <input
            className={s.inputName}
            value={this.state.name}
            onChange={this.handleChange}
            id={this.nameinputId}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label htmlFor={this.numberInputId}>
          <input
            className={s.inputNumber}
            id={this.numberInputId}
            onChange={this.handleChange}
            value={this.state.number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button className={s.button} type="submit" on>
          Save
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
