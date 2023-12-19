import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from 'components/ContactForm/ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  onSubmitForm = evt => {
    evt.preventDefault();
    this.props.onSubmitForm({
      id: nanoid(),
      ...this.state,
    });

    evt.target.reset();
  };

  render() {
    return (
      <div>
        <form className={css.form} onSubmit={this.onSubmitForm}>
          <label>
            <span className={css.text}>Name</span>
            <input
              className={css.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            <span className={css.text}>Telefone</span>
            <input
              className={css.input}
              type="tel"
              name="number"
              pattern="\d{3}[\-]\d{2}[\-]\d{2}"
              title="Number may contain only numbers and dushes. For example 123-45-67"
              required
              onChange={this.handleInputChange}
            />
          </label>
          <button className={css.button} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}
