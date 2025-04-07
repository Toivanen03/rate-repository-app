import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { LoginFormContainer } from '../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      render(<LoginFormContainer onSubmit={onSubmit} errorMsg="" />);
      
      fireEvent.changeText(screen.getByPlaceholderText('Username:'), 'Simo');
      fireEvent.changeText(screen.getByPlaceholderText('Password:'), 'salasana');
      fireEvent.press(screen.getByText('Log in'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          name: 'Simo',
          pwd: 'salasana',
        });
      });
    });
  });
});