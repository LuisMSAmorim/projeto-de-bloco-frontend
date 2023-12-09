"use client"

import { useEffect, useState } from "react"
import { Received } from "../../../../../core/models"
import { ReceivedsTable, AddButton, ReceivedsFormModal } from "../components"
import { useDisclosure } from "@chakra-ui/react"
import { useAuth } from "../contexts"
import { ReceivedsRepository } from "../../../../../core/repositories"
import { AuthGuard } from "../middlewares"

const receivedsMock: Received[] = [
  {
    receivedId: 1,
    patientName: 'Maria',
    value: 100,
    city: 'São Paulo',
    local: 'Clínica',
    date: '2023-11-10',
    userId: 'saddsafads'
  },
  {
    receivedId: 2,
    patientName: 'Ana',
    value: 200,
    city: 'São Paulo',
    local: 'Clínica',
    date: '2023-11-11',
    userId: 'saddsafads'
  },
  {
    receivedId: 3,
    patientName: 'Laura',
    value: 350,
    city: 'São Paulo',
    local: 'Clínica',
    date: '2023-11-15',
    userId: 'saasddsaddsafads'
  },
  {
    receivedId: 4,
    patientName: 'Joana',
    value: 220,
    city: 'São Paulo',
    local: 'Clínica',
    date: '2023-11-15',
    userId: 'saasddsaddsafads'
  }
]

const defaultReceived: Received = {
  receivedId: null,
  patientName: '',
  value: 0,
  city: '',
  local: '',
  date: '',
  userId: ''
}

const Receiveds = () => {
  const [receiveds, setReceiveds] = useState<Received[]>([])
  const [manipulatedReceived, setManipulatedReceived] = useState<Received>(receivedsMock[0])

  const { token } = useAuth()

  const repository = new ReceivedsRepository(token)

  const {
    isOpen: FormModalIsOpen, 
    onClose: FormModalIsClose,
    onOpen: FormModalonOpen
  } = useDisclosure()

  useEffect(() => {
    if (!token) return
    repository.getAll()
      .then(receiveds =>setReceiveds(receiveds))
  }, [token])

  const handleDelete = (receivedId: number) => {
    repository.delete(receivedId).then((res) => {
      const newReceiveds = receiveds.filter(received => received.receivedId !== receivedId)

      setReceiveds(newReceiveds)
    })
  }

  const handleEdit = (receivedId: number) => {
    const received = receiveds.find(received => received.receivedId === receivedId)

    setManipulatedReceived(received!)
    FormModalonOpen()
  }

  const handleAdd = () => {
    setManipulatedReceived(defaultReceived)
    FormModalonOpen()
  }

  const addReceived = (received: Received) => {
    repository.create(received).then((res) => {
      const newReceiveds = [...receiveds, received]
  
      setReceiveds(newReceiveds)
    })
  }

  const updateReceived = (received: Received) => {
    repository.update(received).then((res) => {
      const newReceiveds = receiveds.map(receivedItem => {
        if (receivedItem.receivedId === received.receivedId) {
          return received
        }
  
        return receivedItem
      })
  
      setReceiveds(newReceiveds)
    })
  }

  return (
    <AuthGuard>
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Pagamentos Recebidos</h1>
          <AddButton
            width={'2.5em'} 
            height={'2.5rem'}
            onClick={handleAdd}
          />
        </div>

        <div
          style={{ 
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '2em'
          }}
        >
          <ReceivedsTable 
            receiveds={receiveds} 
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>

        <ReceivedsFormModal
          key={manipulatedReceived.receivedId}
          isOpen={FormModalIsOpen}
          onClose={FormModalIsClose}
          received={manipulatedReceived}
          addReceived={addReceived}
          updateReceived={updateReceived}
        />
      </div>
    </AuthGuard>
  )
}

export default Receiveds
