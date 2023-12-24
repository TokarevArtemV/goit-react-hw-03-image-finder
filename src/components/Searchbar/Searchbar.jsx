import { Component } from 'react';
import { SiIconfinder } from 'react-icons/si';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  onSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      toast('Input serch query!');
      return;
    }
    const { handleSerch } = this.props;
    handleSerch(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <div>
        <header className="Searchbar">
          <form className="SearchForm" onSubmit={this.onSubmit}>
            <button type="submit" className="SearchForm-button">
              <SiIconfinder className="SearchForm-button-icon" />
            </button>

            <input
              className="SearchForm-input"
              type="text"
              autoComplete="off"
              autoFocus
              name="query"
              value={this.state.query}
              onChange={this.handleChange}
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </div>
    );
  }
}
