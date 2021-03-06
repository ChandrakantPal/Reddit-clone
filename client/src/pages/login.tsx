import { FormEvent, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'

import InputGroup from '../components/InputGroup'
import { useAuthDispatch, useAuthState } from '../context/auth'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<any>({})

  const dispatch = useAuthDispatch()
  const { authenticated } = useAuthState()

  const router = useRouter()

  const submitForm = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const responseObject = await axios.post('/auth/login', {
        password,
        username,
      })

      dispatch('LOGIN', responseObject.data)

      router.push('/')
    } catch (err) {
      setErrors(err.response.data)
    }
  }

  if (authenticated) router.push('/')

  return (
    <div className="flex bg-white">
      <Head>
        <title>Login</title>
      </Head>

      <div
        className="h-screen bg-center bg-cover w-36"
        style={{ backgroundImage: "url('/images/bricks.jpg')" }}
      ></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-70">
          <h1 className="mb-2 text-lg font-medium">Login</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy
          </p>
          <form onSubmit={submitForm}>
            <InputGroup
              className="mb-2"
              value={username}
              placeholder="USERNAME"
              type="text"
              setValue={setUsername}
              error={errors.username}
            />
            <InputGroup
              className="mb-4"
              value={password}
              placeholder="PASSWORD"
              type="password"
              setValue={setPassword}
              error={errors.password}
            />
            <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded">
              Login
            </button>
          </form>
          <small>
            New to Readitor?
            <Link href="/register">
              <a className="ml-1 text-blue-500 uppercase">Sign Up</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  )
}
