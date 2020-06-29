import styles from '../about.css'

export default function ({ match }) {
  console.log('match', match)
  return (
    <div className={styles.normal}>
      <h1>users/{match.params.id}</h1>
    </div>
  )
}