import { Modal } from 'flowbite-react';
import ProfileForm from '../ProfileForm';
import { useAuth } from '../../Api/AuthApi';

export const ProfileFormModal = ({ setOpen, open }) => {

    const {userData} = useAuth();

    return (
        <div>
            <Modal show={open} onClose={() => setOpen(false)}>
                <Modal.Header>Edit Profile</Modal.Header>
                <Modal.Body>
                    <ProfileForm onClose={() => setOpen(false)} userId={userData.userID} />
                </Modal.Body>
            </Modal>
        </div>
    );
};
