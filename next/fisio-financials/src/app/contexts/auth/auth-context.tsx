import { createContext, useContext, useEffect, useState } from 'react'
import { LoginUser } from '../../../../../../core/models'
import { HttpService } from '../../../../../../core/services/http-service'
import { setCookie, parseCookies, destroyCookie } from 'nookies'

export const AuthContext = createContext({})

interface AuthProviderProps {
  children: JSX.Element
}

type AuthContextType = {
  isAuthenticated: boolean
  token: string
  signIn: (data: LoginUser) => Promise<'ok' | 'err'>
  signOut: () => void
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState('')

  const isAuthenticated = !!token

  useEffect(() => {
    const { 'auth.token': cookieToken } = parseCookies()
    
    if (cookieToken) {
      setToken(`Bearer ${cookieToken}`)
    }
  }, [])

  const signIn = ({ userName, password }: LoginUser) => {
    return new Promise<'ok' | 'err'>((resolve, reject) => {
      HttpService({ domain: 'users/login' })
                      .post('/', { userName, password })
                      .then((res) => {
                        const responseToken = res.data.token

                        setToken(`Bearer ${responseToken}`)

                        setCookie(undefined, 'auth.token', responseToken, {
                          maxAge: 60 * 60 * 1,
                          path: '/'
                        })

                        resolve('ok')
                      })
                      .catch((err) => {
                        reject('err')
                      })
    })
  }

  const signOut = () => {
    destroyCookie(undefined, 'auth.token')
    setToken('')
  }

  return (
    <AuthContext.Provider 
      value={{ 
        token, 
        signIn, 
        signOut, 
        isAuthenticated, 
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  const { 
    token,
    signIn,
    signOut, 
    isAuthenticated 
  } = context as AuthContextType

  return { 
    token,
    signIn,
    signOut, 
    isAuthenticated 
  }
}
