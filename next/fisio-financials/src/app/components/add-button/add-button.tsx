import { Button, Icon } from "@chakra-ui/react"
import { MdAdd } from "react-icons/md"

interface AddButtonProps {
  width: string
  height: string
  onClick: () => void
}

export const AddButton = ({
  height,
  width,
  onClick
}: AddButtonProps) => {
  return (
    <>
      <Button 
        w={width} 
        h={height} 
        colorScheme={'pink'}
        onClick={onClick}
      >
        <Icon as={MdAdd} />
      </Button>
    </>
  )
}
