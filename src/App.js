import { Component } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import ListForm from "./Components/listForm/listForm.js";
import Form from "./Components/form/form.js";
import Filter from "./Components/filter/Filter.js";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  FormSubmitHandler = (data) => {
    data.id = nanoid();
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, data],
    }));
  };

  ChangeFilter = (event) => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  findContact = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();

    if (filter.length) {
      return contacts.filter((contact) =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    } else {
      return contacts;
    }
  };

  deletedContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };
  render() {
    const { filter, contacts } = this.state;

    return (
      <div>
        <Form onSubmit={this.FormSubmitHandler} value={contacts}></Form>
        <Filter value={filter} onChange={this.ChangeFilter}></Filter>
        <ListForm
          onContacts={this.findContact}
          onDelete={this.deletedContact}
        ></ListForm>
      </div>
    );
  }
}

export default App;
