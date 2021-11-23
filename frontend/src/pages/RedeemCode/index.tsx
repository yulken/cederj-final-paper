import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useToast } from '../../hooks/toast';
import { Container, Content, AnimationContainer } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import AxiosError from '../../errors/AxiosError';
import { validateResponse } from '../../utils/AxiosValidator';
import api from '../../services/apiClient';
import TabMenu from '../../components/TabMenu';
import { useAuth, User } from '../../hooks/auth';

interface SignInFormData {
  code: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { updateUser, user } = useAuth();
  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        await validateResponse(api.post(`codes/${data.code}`));

        const gotUser = await api.get(`profile/${user.id}`);

        updateUser(gotUser.data as User);
        addToast({
          type: 'success',
          title: 'Código Reivindicado',
          description: 'O produto já está disponível em sua conta',
        });
      } catch (err) {
        if (err instanceof AxiosError) {
          const message =
            err.message === 'Incorrect email/password combination.'
              ? 'Email e/ou Senha inválido(s)'
              : 'Ocorreu um erro interno';

          addToast({
            type: 'error',
            title: 'Erro na autenticação',
            description: message,
          });
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro Interno',
          description: 'Ocorreu um erro interno.',
        });
      }
    },
    [addToast, updateUser, user.id],
  );

  return (
    <Container>
      <TabMenu />
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Reivindicar código</h1>
            <Input name="code" icon={FiLock} placeholder="Código" />
            <Button color="green" type="submit">
              Reivindicar
            </Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
export default SignIn;
