import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Page from '../pages/index';

function setup() {
  const client = new QueryClient();
  const user = userEvent.setup();
  render(
    <QueryClientProvider client={client}>
      <Page />
    </QueryClientProvider>
  );

  return { user };
}

for(let s = 0; s < 2; s++) {
  suite(`suite ${s}: ${__filename}`, () => {

    for(let i = 0; i < 2; i++) {
      test(`should find users ${i}`, async () => {
        setup();
        await screen.findByText('User 1');
      });

      test(`should add users ${i}`, async () => {
        const { user } = setup();
        await user.click(screen.getByText('Add user'));
        expect(await screen.findByText('test')).toBeInTheDocument();
        expect(screen.getByText('User 1')).toBeInTheDocument();
      });

      test(`should update users ${i}`, async () => {
        const { user } = setup();
        await user.click(screen.getByText('Update user'));
        expect(await screen.findByText('test')).toBeInTheDocument();
        expect(screen.queryByText('User 1')).not.toBeInTheDocument();
      });
    }
  });
}