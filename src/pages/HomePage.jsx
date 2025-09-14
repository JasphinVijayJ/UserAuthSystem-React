import LogoutButton from '../components/common/LogoutButton'

export default function HomePage() {
  return (
    <div className='homePage'>
      <h1>Welcome to the Home Page...</h1>
      <p>You have successfully logged in.</p>

      <LogoutButton />
    </div>
  )
}
