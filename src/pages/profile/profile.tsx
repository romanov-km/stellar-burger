import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateUser } from '../../services/thunk/user';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.data?.name) || '';
  const userEmail = useSelector((state) => state.user.data?.email) || '';

  const [formValue, setFormValue] = useState({
    name: userName,
    email: userEmail,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: userName,
      email: userEmail
    }));
  }, [userName, userEmail]);

  const isFormChanged =
    formValue.name !== userName ||
    formValue.email !== userEmail ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // Ваш код отправки данных
    dispatch(updateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: userName,
      email: userEmail,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
