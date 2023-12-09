import { 
  Table, 
  TableContainer, 
  Thead, 
  Tr, 
  Th, 
  Td, 
  Tbody,
  Icon,
  useDisclosure
} from "@chakra-ui/react"
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md"
import { Received } from "../../../../../../core/models"
import { DeleteConfirmationModal } from ".."

interface ReceivedsTableProps {
  receiveds: Received[]
  onEdit: (receivedId: number) => void
  onDelete: (receivedId: number) => void
}

export const ReceivedsTable = ({
  receiveds,
  onEdit,
  onDelete
}: ReceivedsTableProps) => {
  const { 
    isOpen: DeleteConfirmationModalIsOpen,
    onClose: DeleteConfirmationModalOnClose,
    onOpen: DeleteConfirmationModalOnOpen
   } = useDisclosure()

  return (
    <>
      <TableContainer w={'100%'}>
        <Table variant='striped' colorScheme='pink'>
          <Thead>
            <Tr>
              <Th>Paciente</Th>
              <Th>Valor</Th>
              <Th>Cidade</Th>
              <Th>Local</Th>
              <Th>Data</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              receiveds?.map(({
                receivedId,
                patientName,
                value,
                city,
                local,
                date
              }) => (
                <Tr key={receivedId}>
                  <Td>{patientName}</Td>
                  <Td>{value}</Td>
                  <Td>{city}</Td>
                  <Td>{local}</Td>
                  <Td>{date}</Td>
                  <Td>
                    <Icon 
                      as={MdOutlineEdit}
                      w={8}
                      h={8}
                      cursor={'pointer'}
                      _hover={{ color: 'pink.500' }}
                      onClick={() => onEdit(receivedId)}
                    />
                  </Td>
                  <Td>
                    <Icon 
                      as={MdDeleteOutline}
                      w={8}
                      h={8}
                      cursor={'pointer'}
                      _hover={{ color: 'red.500' }}
                      onClick={() => DeleteConfirmationModalOnOpen()}
                    />
                  </Td>
                  <DeleteConfirmationModal
                    isOpen={DeleteConfirmationModalIsOpen}
                    onClose={DeleteConfirmationModalOnClose}
                    onDelete={() => onDelete(receivedId)}
                  />
                </Tr>
              ))
            }
            <Tr>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

    </>
  )
}
