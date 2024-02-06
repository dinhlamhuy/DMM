import React, { ReactNode, useEffect } from 'react'
import Modal from 'react-modal'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  DarkMode: boolean
}

const ModalDetail: React.FC<ModalProps> = ({ isOpen, onClose, children,DarkMode }) => {
  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);
  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel='Modal'

      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        content: {
          maxWidth: '60vw',
          minWidth: '40vw',
          maxHeight: '60vh',
          minHeight: '20vh',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
        //   justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid #ccc',
          borderRadius: '4px',
          overflow:"auto",
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          padding: '10px',
          backgroundColor: DarkMode ? 'white': 'white'
        }
      }}
    >{children}</Modal>
  )
}

export default ModalDetail
