import type { NextPage } from 'next'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const client = useQueryClient();
  const { data } = useQuery(['users'], async () => {
    const res = await fetch('http://localhost:3000/api/hello');
    return await res.json();
  });

  const addUser = useMutation(async () => {
    return await fetch('http://localhost:3000/api/user', { method: 'POST', body: JSON.stringify({ name: 'test' }) });
  }, {
    onSuccess: () => {
      client.invalidateQueries(['users']);
    },
  });

  const updateUser = useMutation<Response, unknown, { id: number }>(async ({ id }) => {
    // console.log({ id });
    return await fetch(`http://localhost:3000/api/user/${id}`, { method: 'PUT', body: JSON.stringify({ name: 'test' }) });
  }, {
    onSuccess: () => {
      client.invalidateQueries(['users']);
    },
  });

  return (
    <div className={styles.container}>
      {data && <ul>
        {data.users.map((user: any) => <li key={user.id}>{user.name}</li>)}
        </ul>}
      <button onClick={() => {
        addUser.mutate();
      }}>
        Add user
      </button>
      <button disabled={!data} onClick={() => {
        updateUser.mutate({ id: data.users[0].id });
      }}>
        Update user
      </button>
    </div>
  )
}

export default Home
