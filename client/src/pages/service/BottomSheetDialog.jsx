import React, { useEffect } from 'react'
import { ButtonTag, PTag } from '../../components/designComponents/MicroComponents'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
//icons
import { MdClose } from 'react-icons/md'

const BottomSheetDialog = ({ show, setShow, state }) => {
    const navigate = useNavigate()
    return (
        <>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName='modal-dialog-scrollable max-w-400'
            >
                <div
                    className='text-white fs-4 bg-navy-blue w50 h50 d-flex justify-content-center align-items-center rounded-circle pointer close-icon'
                    onClick={() => setShow(false)}
                >
                    <MdClose fontSize={30} className={'Md-Close'} />
                </div>
                <Modal.Body>
                    <div className='d-flex mb-3'>
                        <PTag classes={'text-dark-blue fw-bold'} texts={'Add Inventory'} />
                    </div>
                    <div className='box-shadow mb-2'>
                        <ButtonTag
                            classes={'btn-orange bold fn-12 w-100'}
                            value={'Add Inventory'}
                            onClick={() => {
                                navigate('/dashboard/added-inventories/add-inventory')
                            }}
                        />
                    </div>
                    <div className='box-shadow'>
                        <ButtonTag
                            classes={'btn-orange bold fn-12 w-100'}
                            value={'Create Packages'}
                            onClick={() => {
                                navigate('/dashboard/added-inventories/add-pakcage')
                            }}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default BottomSheetDialog
