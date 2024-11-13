import { Modal } from 'flowbite-react';
import ProfileForm from '../ProfileForm';
import { useAuth } from '../../Api/AuthApi';

export const ProfileFormModal = ({ setOpen, open, userId, initialData }) => {


    return (
        <div>
            <Modal show={open} onClose={() => setOpen(false)}>
                <Modal.Header>Edit Profile</Modal.Header>
                <Modal.Body>
                    <ProfileForm onClose={() => setOpen(false)} userId={userId} initialData={initialData} />
                </Modal.Body>
            </Modal>
        </div>
    );
};
