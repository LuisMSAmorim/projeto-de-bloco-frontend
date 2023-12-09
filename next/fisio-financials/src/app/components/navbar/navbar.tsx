"use client"

import { Flex } from '@chakra-ui/react'
import { useAuth } from '@/app/contexts'
import { useRouter } from 'next/navigation'

export const Navbar = () => {
  const route = useRouter()

  const { isAuthenticated, signOut } = useAuth()

  const handleLogout = () => {
    signOut()
    route.push('/login')
  }

  return (
    <Flex 
      w={'100%'} 
      h={50} 
      background={'pink.500'}
      alignItems={'center'}
      justifyContent={'space-between'}
      paddingX={5}
    >
      <h2
        style={{
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Fisio Financials
      </h2>

      {
        isAuthenticated && (
          <button
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        )
      }
    </Flex>
  )
}
