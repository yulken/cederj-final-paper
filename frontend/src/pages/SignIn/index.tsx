import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import Joi from 'joi';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import {
  getValidationErrors,
  validateInput,
} from '../../utils/getValidationErrors';
import { Container, Content, AnimationContainer } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ValidationError from '../../errors/ValidationError';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const history = useHistory();
  const { addToast } = useToast();
  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Joi.object({
          email: Joi.string()
            .empty()
            .email({ tlds: { allow: false } })
            .messages({
              'string.empty': 'E-mail obrigatório',
              'string.email': 'Email deve ser válido',
            }),
          password: Joi.string().empty().messages({
            'string.empty': 'Senha obrigatória',
          }),
        });

        validateInput(
          schema.validate(data, {
            abortEarly: false,
          }),
        );

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/profile');
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
    [signIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Entrar</Button>
            <a href="forgot">Esqueci minha senha</a>
          </Form>
          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
export default SignIn;
