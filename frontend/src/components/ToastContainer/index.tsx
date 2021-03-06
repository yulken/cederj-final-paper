import React from 'react';
import { useTransition } from 'react-spring';
import { Container } from './styles';
import Toast from './Toast';
import { ToastMessage } from '../../hooks/toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    // message => message.id,
    {
      from: { right: '-120%' },
      enter: { right: '0%' },
      leave: { right: '-120%' },
    },
  );
  // messages,
  // message => message.id,
  // () => {
  //   from: { right: '-120%' },
  //   enter: { right: '0%' },
  //   leave: { right: '-120%' },
  // },
  return (
    <Container>
      {messagesWithTransitions((values, item) => (
        <Toast message={item} style={values} />
      ))}
    </Container>
  );
};

export default ToastContainer;
