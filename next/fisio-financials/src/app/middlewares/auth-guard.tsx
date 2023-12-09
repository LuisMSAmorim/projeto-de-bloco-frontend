import { Flex } from "@chakra-ui/react"
import { useAuth } from "../contexts"
import Link from "next/link"

interface AuthGuardProps {
  children: JSX.Element
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return children
  }

  return (
    <Flex 
      w={'100%'} 
      h={'100vh'} 
      alignItems={'center'} 
      justifyContent={'center'}
    >
      <h1
        style={{
          color: 'gray.500',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Oops, você não possui permissão para acessar essa página! faça <Link href={'/login'} style={{ color: 'blue' }}>Login</Link> para continuar.
      </h1>
    </Flex>
  )
}
