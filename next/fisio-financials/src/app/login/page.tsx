"use client"

import { useState } from 'react'
import { 
  Input, 
  Button, 
  FormControl,
  FormLabel, 
  useToast 
} from '@chakra-ui/react'
import { LoginUser } from '../../../../../core/models'
import { useAuth } from '../contexts'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Login = () => {
  const [formData, setFormData] = useState<LoginUser>({
    userName: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  })

  const { signIn } = useAuth()
  const toast = useToast()
  const router = useRouter()

  const handleChange = (name: string, value: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  };

  const validateInput = (name: string, value: string) => {
    if (!value || value.trim() === '') {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: `${name} is required` }))
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }))
    }
  };

  const handleBlur = (name: string, value: string) => {
    validateInput(name, value)
  };

  const handleSubmit = async () => {
    const hasErrors = Object.values(errors).some((error) => error !== '')
    const hasEmptyFields = Object.values(formData).some((value) => value === '')

    if (hasErrors || hasEmptyFields) {
      toast({
        title: 'Erro ao logar',
        description: 'Preencha todos os campos corretamente',
        status: 'error',
        duration: 3000,
        isClosable: true,
        variant: 'left-accent',
        position: 'bottom-right',
      })
      return
    }

    signIn(formData)
      .then(() => {
        toast({
          title: 'Logado com sucesso',
          description: 'Você será redirecionado...',
          status: 'success',
          duration: 3000,
          isClosable: true,
          variant: 'left-accent',
          position: 'bottom-right',
        })

        router.push('/receiveds')
      })
      .catch(() => {
        toast({
          title: 'Erro ao logar',
          description: 'Usuário ou senha incorretos',
          status: 'error',
          duration: 3000,
          isClosable: true,
          variant: 'left-accent',
          position: 'bottom-right',
        })
      })
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        width: '100%',
        height: '100%',
      }}
    >
      <h1
        style={{
          fontSize: '40px',
          fontWeight: 'bold',
          marginBottom: '20px',
        }}
      >
        Faça Login
      </h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '20px',
        }}
      >
        <FormControl id="username" isRequired isInvalid={errors.username !== ''}>
          <FormLabel>Nome de usuário</FormLabel>
          <Input
            name="userName"
            onBlur={(event) => handleBlur('userName', event.target.value)}
            onChange={(event) => handleChange('userName', event.target.value)}
          />
        </FormControl>

        <FormControl id="password" isRequired isInvalid={errors.password !== ''}>
          <FormLabel>Senha</FormLabel>
          <Input
            type="password"
            name="password"
            onBlur={(event) => handleBlur('password', event.target.value)}
            onChange={(event) => handleChange('password', event.target.value)}
          />
        </FormControl>

        <p>Ainda não possui uma conta? <Link href={'/register'} style={{ color: 'blue' }}>Registre-se</Link></p>

        <Button type="submit" colorScheme="pink" onClick={handleSubmit}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login
