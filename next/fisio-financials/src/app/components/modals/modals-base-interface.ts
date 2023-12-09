export interface ModalsBaseInterface {
  onClose: () => void
  onOpen?: () => void
  isOpen: boolean
}
