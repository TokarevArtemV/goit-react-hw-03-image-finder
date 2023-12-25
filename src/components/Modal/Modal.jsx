import { Component } from 'react';
import disableScroll from 'disable-scroll';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendlerCloseModal);
    disableScroll.on();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendlerCloseModal);
    disableScroll.off();
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
