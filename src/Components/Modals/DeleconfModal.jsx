import React from 'react';
import { Button, Modal } from 'flowbite-react';

export const DeleconfModal = ({ open, onConfirm, onClose }) => {
  return (
    <div>
      <Modal show={open} onClose={onClose} className="py-36">
        <Modal.Header>Delete Post</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this post?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onConfirm} color="red">
            Yes, delete it
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
