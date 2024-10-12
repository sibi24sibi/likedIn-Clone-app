import { Modal } from 'flowbite-react';
import ProfileForm from '../ProfileForm';

export const ProfileFormModal = ({ setOpen, open }) => {
    return (
        <div>
            <Modal show={open} onClose={() => setOpen(false)}>
                <Modal.Header>Edit Profile</Modal.Header>
                <Modal.Body>
                    <ProfileForm onClose={() => setOpen(false)} />
                </Modal.Body>
            </Modal>
        </div>
    );
};
