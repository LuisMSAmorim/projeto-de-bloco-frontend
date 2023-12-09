"use client"

import { 
  Input,
  Button,
  FormControl, 
  FormLabel, 
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { RegisterUser } from '../../../../../core/models'
import { HttpService } from '../../../../../core/services/http-service'
import Link from 'next/link'

const Register = () => {
  const [formData, setFormData] = useState<RegisterUser>({
    email: '',
    userName: '',
    password: '',
    firstName: '',
    lastName: ''
  })

  const [errors, setErrors] = useState({
    email: '',
    userName: '',
    password: '',
    firstName: '',
    lastName: ''
  })

  const toast = useToast()

  const handleChange = (name: string, value: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  const validateInput = (name: string, value: string) => {
    if (!value || value.trim() === '') {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: `${name} is required` }))
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }))
    }
  };

  const handleBlur = (name: string, value: string) => {
    validateInput(name, value)
  }

  const handleSubmit = () => {
    const hasErrors = Object.values(errors).some((error) => error !== '')
    const hasEmptyFields = Object.values(formData).some((value) => value === '')

    if (hasErrors || hasEmptyFields) {
      toast({
        title: 'Erro ao salvar',
        description: 'Preencha todos os campos corretamente',
        status: 'error',
        duration: 3000,
        isClosable: true,
        variant: 'left-accent',
        position: 'bottom-right'
      })
      return
    }

    HttpService({ domain: 'users/register' }).post('/', formData)
      .then((res) => {
        toast({
          title: 'Sucesso',
          description: 'Usuário registrado com sucesso',
          status: 'success',
          duration: 3000,
          isClosable: true,
          variant: 'left-accent',
          position: 'bottom-right'
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
        Registre-se
      </h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '20px',
        }}
      >
        <FormControl id="email" isRequired isInvalid={errors.email !== ''}>
          <FormLabel>Email</FormLabel>
          <Input 
            type="email" 
            name="email" 
            onBlur={(event) => handleBlur('email', event.target.value)}
            onChange={(event) => handleChange('email', event.target.value)}
          />
        </FormControl>

        <FormControl id="userName" isRequired isInvalid={errors.userName !== ''}>
          <FormLabel>Nome de usuário</FormLabel>
          <Input 
            type="text"
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

        <FormControl id="firstName" isRequired isInvalid={errors.firstName !== ''}>
          <FormLabel>Nome</FormLabel>
          <Input 
            type="text"
            name="firstName"
            onBlur={(event) => handleBlur('firstName', event.target.value)}
            onChange={(event) => handleChange('firstName', event.target.value)}
          />
        </FormControl>

        <FormControl id="lastName" isRequired isInvalid={errors.lastName !== ''}>
          <FormLabel>Sobrenome</FormLabel>
          <Input
            type="text"
            name="lastName"
            onBlur={(event) => handleBlur('lastName', event.target.value)}
            onChange={(event) => handleChange('lastName', event.target.value)}
          />
        </FormControl>

        <p>Já possui uma conta? <Link href={'/login'} style={{ color: 'blue' }}>Login</Link></p>

        <Button 
          type="submit" 
          colorScheme="pink" 
          onClick={handleSubmit}
        >
          Registrar
        </Button>
      </div>
    </div>
  )
}

export default Register
