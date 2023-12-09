"use client"

import { useState } from "react"
import { 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  useToast
} from "@chakra-ui/react"
import { ModalsBaseInterface } from "../modals-base-interface"
import { Received } from "../../../../../../../core/models"

interface ReceivedsFormModalProps extends ModalsBaseInterface {
  received: Received
  addReceived: (received: Received) => void
  updateReceived: (received: Received) => void
}

export const ReceivedsFormModal = ({
  isOpen,
  onClose,
  received,
  addReceived,
  updateReceived
}: ReceivedsFormModalProps) => {
  const [formData, setFormData] = useState<Received>(received)
  const [formErrors, setFormErrors] = useState<{
    patientName: boolean,
    value: boolean,
    city: boolean,
    local: boolean,
    date: boolean
  }>({
    patientName: false,
    value: false,
    city: false,
    local: false,
    date: false
  })

  const toast = useToast()

  const handleInputChange = (event: any) => {
    const { name, value } = event.target

    setFormData({ ...formData, [name]: value })
  }

  const validateFields = (name: string, value: string | number) => {
    if (!value && value !== 0) {
      setFormErrors({ ...formErrors, [name]: true })
      return
    }
  
    setFormErrors({ ...formErrors, [name]: false })
  }

  const inputOnBlur = (event: any) => {
    const { name, value } = event.target

    validateFields(name, value)
  }

  const onSubmit = () => {
    const formHasErrors = Object.keys(formErrors).some(key => formErrors[key as keyof typeof formErrors])
    const receivedFieldsAreEmpty = Object.keys(formData)
    .filter(key => 
      (key !== 'receivedId' && key !== 'userId')
    )
    .some(key => 
      !formData[key as keyof typeof formData]
    )

    if (formHasErrors || receivedFieldsAreEmpty) {
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

    const isUpdate = received.receivedId

    if (isUpdate) {
      // update
      updateReceived(formData)
      toast({
        title: 'Atualizado com sucesso',
        description: 'O pagamento foi atualizado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
        variant: 'left-accent',
        position: 'bottom-right'
      })
    } else {
      // create
      addReceived(formData)
      toast({
        title: 'Salvo com sucesso',
        description: 'O pagamento foi salvo com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
        variant: 'left-accent',
        position: 'bottom-right'
      })
    }

    onClose()
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Pagamento Recebido</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex flexDir={'column'} rowGap={3}>
                <FormControl isInvalid={formErrors['patientName']}>
                  <FormLabel>Paciente</FormLabel>
                  <Input 
                    value={formData?.patientName}
                    name={'patientName'}
                    placeholder='Maria da Silva' 
                    onChange={handleInputChange}
                    onBlur={inputOnBlur}
                  />
                </FormControl>

                <FormControl isInvalid={formErrors['value']}>
                  <FormLabel>Valor</FormLabel>
                  <Input 
                    value={formData?.value} 
                    name={'value'}
                    type={'number'} 
                    placeholder='500'
                    onChange={handleInputChange}
                    onBlur={inputOnBlur}
                  />
                </FormControl>

                <FormControl isInvalid={formErrors['city']}>
                  <FormLabel>Cidade</FormLabel>
                  <Input 
                    value={formData?.city} 
                    name={'city'}
                    placeholder='Florianópolis'
                    onChange={handleInputChange}
                    onBlur={inputOnBlur}
                  />
                </FormControl>

                <FormControl isInvalid={formErrors['local']}>
                  <FormLabel>Local</FormLabel>
                  <Input 
                    value={formData?.local}
                    name={'local'}
                    placeholder='Clínica'
                    onChange={handleInputChange}
                    onBlur={inputOnBlur}
                  />
                </FormControl>

                <FormControl isInvalid={formErrors['date']}>
                  <FormLabel>Data</FormLabel>
                  <Input 
                    value={formData?.date} 
                    name={'date'}
                    type={'date'}
                    onChange={handleInputChange}
                    onBlur={inputOnBlur}
                  />
                </FormControl>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button 
                colorScheme='pink' 
                onClick={onSubmit}
                mr={3} 
              >
                Salvar
              </Button>
              <Button 
                variant={'outline'}
                mr={3} 
                onClick={onClose}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </>
  )
}
