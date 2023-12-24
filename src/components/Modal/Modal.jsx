import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendlerCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendlerCloseModal);
  }

  hendlerCloseModal = evt => {
    if (evt?.code === 'Escape' || evt.target === evt.currentTarget) {
      const { onCloseModal } = this.props;
      onCloseModal();
    }
  };

  render() {
    const { imgSrc, imgAlt } = this.props;

    return (
      <div className="Overlay" onClick={this.hendlerCloseModal}>
        <div className="Modal">
          <img src={imgSrc} alt={imgAlt} />
        </div>
      </div>
    );
  }
}
