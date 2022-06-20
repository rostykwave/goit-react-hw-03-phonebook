import { Component } from "react";
import ContactForm from "./ContactForm";
import { nanoid } from 'nanoid';
import ContactList from "./ContactList";
import Container from "./Container";
import Filter from "./Filter";

//Додробити на css modules

class App extends Component{
  state = {
    contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
     filter: '',
   
  }

  addContact = data => {
   
    const { contacts } = this.state;
    if (contacts.find(contact => contact.name === data.name)) {
      alert(`${data.name} is already in contacts`)
      return;
    }
    

    const contact = {
      id: nanoid(),
      ...data,
    }

    this.setState(({ contacts })=>({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
 

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');

    if (this.state.contacts !== prevState.contacts) {
      console.log('Local');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  

  render() {

    const {filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <Container>
        
        <h2>PhoneBook</h2>

        <ContactForm
          onSubmit={this.addContact}
        />
      
        <h2>Contacts</h2>
        <br></br>

        <Filter
          value={filter}
          onChange={this.changeFilter}
        />

        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      
      </Container>
    )
  }
}

export default App;