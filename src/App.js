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

  // componentDidMount() {
  //   const localstor = localStorage.getItem('phonebook')
  //   const parsedContacts = JSON.parse(localstor)
  //   if(parsedContacts){
  //     this.setState({ contacts: parsedContacts });
  //     }
  // }
  componentDidMount() {
    const contacts = localStorage.getItem("phonebook");
    if (!contacts) {
      return;
    }
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
    // console.log("didMount", this.state.contacts);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState);
    if (this.state.contacts !== prevState.contacts) {
      console.log("обновилось что-оо");
      localStorage.setItem("phonebook", JSON.stringify(this.state.contacts));
    }
    console.log(this.state);
  }

  formSubmitHandler = (data) => {
    data.id = nanoid();
    this.state.contacts.find((contact) => contact.name === data.name)
      ? alert("Такое имя уже занято")
      : this.setState((prevState) => ({
          contacts: [...prevState.contacts, data],
        }));
  };

  changeFilter = (event) => {
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
        <Form onSubmit={this.formSubmitHandler} value={contacts}></Form>
        <Filter value={filter} onChange={this.changeFilter}></Filter>
        <ListForm
          onContacts={this.findContact}
          onDelete={this.deletedContact}
        ></ListForm>
      </div>
    );
  }
}

export default App;
