import React from 'react';
import styles from './index.css';
import { history, Link } from 'umi';

export default () => {
  const users = [{ id: 11, name: 'tom' }, { id: 12, name: 'peter' }]
  return (
    <div>
      <h1 className={styles.title}>Page users/index</h1>
      <ul>
        {users.map(u => (
          <li key={u.id} onClick={() => history.push(`/users/${u.id}`)}>{u.name}</li>
        ))}
        {users.map(u => (
          <li key={u.id}>
            <Link to={'/users/' + u.id}>{u.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
