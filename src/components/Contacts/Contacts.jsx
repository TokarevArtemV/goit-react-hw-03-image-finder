import { ContactItem } from 'components/ContactItem/ContactItem';
import css from 'components/Contacts/Contacts.module.css';

export const Contacts = ({ contacts, onClickDelBtn }) => (
  <ul className={css.list}>
    {contacts.map(contact => (
      <ContactItem
        key={contact.id}
        contact={contact}
        onClickDelBtn={onClickDelBtn}
      />
    ))}
  </ul>
);
