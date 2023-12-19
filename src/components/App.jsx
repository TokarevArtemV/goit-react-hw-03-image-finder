import React, { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleInputFilter = evt => {
    const searchName = evt.target.value;
    this.setState({ filter: searchName });
  };

  handleSubmitForm = ({ id, name, number }) => {
    const isExists = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isExists) {
      NotificationManager.info(`${name} is alredy in contacts`);
      return;
    }
    this.setState(() => {
      return {
        contacts: [...this.state.contacts, { id, name, number }],
      };
    });
  };

  handleDeleteContact = idContact => {
    this.setState(prevState => {
      return {
        ...prevState,
        contacts: prevState.contacts.filter(
          contact => contact.id !== idContact
        ),
      };
    });
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return (
      <div className="container">
        <NotificationContainer />
        <h1>Phonebook</h1>
        <ContactForm onSubmitForm={this.handleSubmitForm} />
        <h2>Contacts</h2>
        <Filter
          onInputFilter={this.handleInputFilter}
          filter={this.state.filter}
        />
        {filteredContacts.length > 0 && (
          <Contacts
            contacts={filteredContacts}
            onClickDelBtn={this.handleDeleteContact}
          />
        )}
      </div>
    );
  }
}
