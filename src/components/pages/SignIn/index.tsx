import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../stories/atoms/Button';
import Input from '../../../stories/atoms/Input';

import { useLoginUserMutation } from '../../../redux/api/index.rtkQuery';
import { errorToast, LocalStorageUtil } from '../../../utils';

import { ApiError } from '../../../types/types';

import styles from './signIn.module.css';

interface ISignIn {
  handleLogin?: (value: string) => void;
}

const SignIn: React.FC<ISignIn> = ({ handleLogin }) => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  const [loginUserMutation, { isLoading }] = useLoginUserMutation();

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const result = await loginUserMutation({ username: login, password, expiresInMins: 150 }).unwrap();
      handleLogin && handleLogin('logged');
      LocalStorageUtil.setItem('token', result.token);
      LocalStorageUtil.setItem('userId', result.id.toString());
      navigate('/');
    } catch (err) {
      const error = err as ApiError;
      errorToast(error?.data?.message || 'Error occurred during login');
      handleLogin && handleLogin('not logged');
    }
  };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSubmit(e);
      }
    };

    return (
      <section className={styles.signIn}>
        <title>Sign in | Goods4you</title>
        <h1>Sign in</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            className={styles.input}
            placeholder='Login'
            value={login}
            onChange={handleLoginChange}
          />
          <Input
            className={styles.input}
            placeholder='Password'
            type='password'
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={handleKeyPress}
          />
          <Button
            className={styles.button}
            label={isLoading ? 'Loading' : 'Sign in'}
            type='submit'
            disabled={isLoading}
          />
        </form>
      </section>
    );
  };

  export default SignIn;
