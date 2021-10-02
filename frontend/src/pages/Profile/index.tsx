import React, { useCallback, useRef } from 'react';
import { FiLogOut, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { GiCrossedSwords } from 'react-icons/gi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import Joi from 'joi';

import { useAuth } from '../../hooks/auth';
import ValidationError from '../../errors/ValidationError';
import { useToast } from '../../hooks/toast';
import api from '../../services/apiClient';
import {
  getValidationErrors,
  validateInput,
} from '../../utils/getValidationErrors';
import { validateResponse } from '../../utils/AxiosValidator';
import { Container, Content, AnimationContainer } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import AxiosError from '../../errors/AxiosError';

interface ProfileFormData {
  name: string;
  nickname: string;
  email: string;
  old_password: string;
  password: string;
  passwordConfirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();
  const { user, updateUser, signOut } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Joi.object({
          name: Joi.string(),
          nickname: Joi.string(),
          email: Joi.string()
            .email({ tlds: { allow: false } })
            .messages({
              'string.email': 'Digite um e-mail válido',
            }),
          old_password: Joi.optional(),
          password: Joi.when('old_password', {
            is: Joi.string(),
            then: Joi.string()
              .disallow(Joi.ref('old_password'))
              .min(6)
              .messages({
                'any.min': 'No mínimo 6 dígitos',
                'any.empty': 'Campo obrigatório',
                'any.invalid': 'Nova senha não deve ser igual a senha antiga.',
              }),
            otherwise: Joi.optional(),
          }),
          passwordConfirmation: Joi.when('old_password', {
            is: Joi.string(),
            then: Joi.valid(Joi.ref('password')).messages({
              'any.ref': 'Confirmação incorreta',
              'any.empty': 'Campo obrigatório',
              'any.only': 'Senha e confirmação não correspondem',
            }),
            otherwise: Joi.optional(),
          }),
        });

        validateInput(schema.validate(data, { abortEarly: false }));

        // const a = Object.entries(data)
        //   .filter(([key, value]) => user[key] !== value)
        //   .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

        const {
          name,
          email,
          nickname,
          old_password,
          password,
          passwordConfirmation,
        } = data;

        const formData = {
          name,
          email,
          nickname,
          ...(old_password
            ? {
                old_password,
                password,
                passwordConfirmation,
              }
            : {}),
        };
        const response = await validateResponse(api.put('/profile', formData));

        updateUser(response.data);

        history.push('/');
      } catch (err) {
        if (err instanceof ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        if (err instanceof AxiosError) {
          const message =
            err.message === 'Old password is incorrect'
              ? 'Senha antiga está incorreta'
              : 'Ocorreu um erro interno';

          addToast({
            type: 'error',
            title: 'Erro na atualização',
            description: message,
          });
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description: 'Ocorreu um erro interno',
        });
      }
    },
    [addToast, history, updateUser],
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
              name="old_password"
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
