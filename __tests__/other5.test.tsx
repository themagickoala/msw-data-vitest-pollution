import { render, screen, waitFor } from "@testing-library/react";
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

for(let i = 0; i < 4; i++) {
  test(`should find users ${i}: ${__filename}`, async () => {
    setup();
    await screen.findByText('User 1');
  });

  test(`should add users ${i}: ${__filename}`, async () => {
    const { user } = setup();
    await user.click(screen.getByText('Add user'));
    expect(await screen.findByText('test')).toBeInTheDocument();
    expect(screen.getByText('User 1')).toBeInTheDocument();
  });

  test(`should update users ${i}: ${__filename}`, async () => {
    const { user } = setup();
    await waitFor(() => {
      expect(screen.getByText('Update user')).toBeEnabled();
    });
    await user.click(screen.getByText('Update user'));
    expect(await screen.findByText('test')).toBeInTheDocument();
    expect(screen.queryByText('User 1')).not.toBeInTheDocument();
  });
}