import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Joi from 'joi';
import { Link, useHistory } from 'react-router-dom';
import {
  getValidationErrors,
  validateInput,
} from '../../utils/getValidationErrors';
import ValidationError from '../../errors/ValidationError';
import { Container, Content, AnimationContainer } from './styles';
import api from '../../services/apiClient';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      formRef.current?.setErrors({});
      try {
        const schema = Joi.object({
          name: Joi.string().messages({
            'string.empty': 'Nome obrigatório',
          }),
          email: Joi.string()
            .email({ tlds: { allow: false } })
            .messages({
              'string.empty': 'E-mail obrigatório',
              'string.email': 'Email deve ser válido',
            }),
          password: Joi.string().min(6).messages({
            'string.min': 'No mínimo 6 dígitos',
            'string.empty': 'Senha Obrigatória',
          }),
          passwordConfirmation: Joi.string()
            .valid(Joi.ref('password'))
            .messages({
              'any.only': 'Senha e confirmação não correspondem',
              'string.empty': 'Confirmação Obrigatória',
            }),
        });

        validateInput(
          schema.validate(data, {
            abortEarly: false,
          }),
        );

        await api.post('/users', data);

        history.push('/');
      } catch (err) {
        if (err instanceof ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Input
              name="passwordConfirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirme sua Senha"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/signin">
            <FiArrowLeft />
            Voltar para login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
export default SignUp;
