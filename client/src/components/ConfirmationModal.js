import Modal from "react-modal";
import { CgDanger } from "react-icons/cg";
import styled from "styled-components";

const ConfirmationModal = ({
  modalIsOpen,
  closeModal,
  confirmAction,
  itemName,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0",
      backgroundColor: "var(--background)",
      borderRadius: "0.8rem",
      border: "none",
    },
  };

  return (
    <Modal ariaHideApp={false} isOpen={modalIsOpen} style={customStyles}>
      <ModalWrapper>
        <CgDanger size={65} style={{ color: "var(--darkblue)" }} />
        <label>
          Are you sure you want to delete{" "}
          <span style={{ color: "red" }}>{itemName}</span> from your favorites?
        </label>
        <div>
          <button onClick={confirmAction}>Yes, delete it!</button>
          <button onClick={closeModal}>No, cancel!</button>
        </div>
      </ModalWrapper>
    </Modal>
  );
};

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  border: none;
  label {
    font-size: 1.2rem;
    font-weight: 500;
    max-width: 500px;
    line-height: 1.5rem;
    margin: 15px 0;
    &:after {
      color: var(--darkblue);
    }
  }
  button {
    width: 150px;
    height: 40px;
    margin: 15px 10px;
    background-color: var(--darkblue);
    border-radius: 6px;
    border: none;
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.4s, opacity 0.5s;
    &:hover {
      background-color: var(--yellow);
      padding: 5px;
      border-radius: 14px;
      color: var(--darkblue);
      font-weight: 500;
      font-size: 20px;
    }
    &:active {
      opacity: 0.3;
    }
  }

  @media screen and (max-width: 600px) {
    padding: 10px;
    label {
      font-size: 1.1rem;
      font-weight: 500;
      max-width: 300px;
      line-height: 1.5rem;
      margin: 10px 0;
    }
    button {
      width: 120px;
      padding: 0.8rem;
      font-size: 1rem;
      &:hover {
        font-size: 1rem;
      }
    }
  }
`;

export default ConfirmationModal;
