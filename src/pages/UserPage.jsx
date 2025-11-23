import { useEffect } from 'react';
import LogoutButton from '../components/common/LogoutButton'

export default function UserPage() {

  useEffect(() => {
    document.title = "UserAuthSystem | User Dashboard";
  }, []);

  return (
    <div className='homePage'>
      <h1>Welcome User...</h1>
      <p>You have successfully logged in.</p>

      <LogoutButton />
    </div>
  )
}
