import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type ModalType = {
  title: string;
  text: string;
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
};

const ConfirmModal: React.FC<ModalType> = ({
  title,
  text,
  show,
  handleClose,
  handleConfirm,
}) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button onClick={handleConfirm} variant="primary">
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
