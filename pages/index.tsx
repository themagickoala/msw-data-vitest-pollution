import type { NextPage } from 'next'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const client = useQueryClient();
  const { data } = useQuery(['users'], async () => {
    const res = await fetch('http://localhost/api/hello');
    return await res.json();
  });

  const addUser = useMutation(async () => {
    return await fetch('http://localhost/api/user', { method: 'POST', body: JSON.stringify({ name: 'test' }) });
  }, {
    onSuccess: () => {
      client.invalidateQueries(['users']);
    },
  });

  const updateUser = useMutation(async () => {
    return await fetch('http://localhost/api/user/1', { method: 'PUT', body: JSON.stringify({ name: 'test' }) });
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
      <button onClick={() => {
        updateUser.mutate();
      }}>
        Update user
      </button>
    </div>
  )
}

export default Home
