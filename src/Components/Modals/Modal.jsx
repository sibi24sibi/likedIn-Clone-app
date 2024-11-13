import React from 'react';
import { Button, Modal } from 'flowbite-react';

export const ModalForm = ({ modelTitle, modelDesc, modelFooter, open, onClose, showFooter = true }) => {
  return (
    <div>
      <Modal show={open} onClose={onClose} className="py-36">
        <Modal.Header>{modelTitle}</Modal.Header>
        <Modal.Body>
          <p>{modelDesc}</p>
        </Modal.Body>
        {
          showFooter &&
          <Modal.Footer   >
            {modelFooter}

          </Modal.Footer>
        }
      </Modal>
    </div>
  );
};
