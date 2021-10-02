import React, { useCallback, useRef } from 'react';
import { FiLogOut, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { GiCrossedSwords } from 'react-icons/gi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import Joi, { ValidationError } from 'joi';

import { useAuth } from '../../hooks/auth';
import api from '../../services/apiClient';
import { getValidationErrors } from '../../utils/getValidationErrors';
import { Container, Content, AnimationContainer } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface ProfileFormData {
  name: string;
  nickname: string;
  email: string;
  oldPassword: string;
  password: string;
  passwordConfirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { user, updateUser, signOut } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Joi.object({
          name: Joi.string(),
          nickname: Joi.string(),
          email: Joi.string().email().messages({
            'string.email': 'Digite um e-mail válido',
          }),
          oldPassword: Joi.string(),
          password: Joi.when('oldPassword', {
            is: (val: string | undefined) => !!val?.length,
            then: Joi.string().min(6).required().messages({
              'any.min': 'No mínimo 6 dígitos',
              'any.required': 'Campo obrigatório',
            }),
            otherwise: Joi.string(),
          }),
          passwordConfirmation: Joi.string().when('oldPassword', {
            is: (val: string | undefined) => !!val?.length,
            then: Joi.required().valid(Joi.ref('password')).messages({
              'any.ref': 'Confirmação incorreta',
              'any.required': 'Campo obrigatório',
            }),
            otherwise: Joi.string(),
          }),
        });

        schema.validate(data, { abortEarly: false });

        const a = Object.entries(data)
          .filter(([key, value]) => user[key] !== value)
          .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

        console.log(a);
        const {
          name,
          email,
          nickname,
          oldPassword,
          password,
          passwordConfirmation,
        } = data;

        const formData = {
          name,
          email,
          nickname,
          ...(oldPassword
            ? {
                oldPassword,
                password,
                passwordConfirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        history.push('/');
      } catch (err) {
        if (err instanceof ValidationError) {
          err.isJoi = true;
          // const errors = getValidationErrors(err);

          // formRef.current?.setErrors(errors);
        }
      }
    },
    [user, history, updateUser],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <h1>Seu Perfil</h1>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="name"
              icon={FiUser}
              placeholder="Nome"
              defaultValue={user.name}
            />
            <Input
              name="nickname"
              icon={GiCrossedSwords}
              placeholder="Nickname"
              defaultValue={user.nickname}
            />
            <Input
              name="email"
              icon={FiMail}
              placeholder="E-mail"
              defaultValue={user.email}
            />
            <h2>Alterar Senha</h2>
            <Input
              name="oldPassword"
              icon={FiLock}
              type="password"
              placeholder="Senha antiga"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova Senha"
            />
            <Input
              name="passwordConfirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirme sua Senha"
            />
            <Button type="submit">Alterar Dados</Button>
          </Form>
          <Link to="signin" onClick={signOut}>
            <FiLogOut />
            Não é você? Sair
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
export default Profile;
