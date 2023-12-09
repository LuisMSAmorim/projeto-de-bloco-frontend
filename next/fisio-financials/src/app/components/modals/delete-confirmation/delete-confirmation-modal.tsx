import { 
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalHeader, 
  ModalOverlay,
  ModalFooter,
  Button,
  Text
} from "@chakra-ui/react"
import { ModalsBaseInterface } from "../modals-base-interface"

interface DeleteConfirmationModalProps extends ModalsBaseInterface {
  onDelete: () => void
}

export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onDelete
}: DeleteConfirmationModalProps) => {

  const handleDelete = () => {
    onDelete()
    onClose()
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Excluir Registro</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Tem certeza que deseja excluir este registro?</Text>
          </ModalBody>

          <ModalFooter>
            <Button 
              colorScheme='pink' 
              mr={3} 
              onClick={handleDelete}
            >
              Excluir
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
