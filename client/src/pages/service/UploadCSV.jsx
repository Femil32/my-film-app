import React from 'react'
import { Modal } from 'react-bootstrap'
import { PTag, ButtonTag, InputTag } from '../../components/designComponents/MicroComponents'
//icons
import { MdClose } from 'react-icons/md'
import { FiUploadCloud } from 'react-icons/fi'

const UploadCSV = ({ show, setOpen }) => {

    return (
        <>
            <Modal
                show={show}
                onHide={() => setOpen(false)}
                dialogClassName='modal-dialog-scrollable max-w-400'
            >
                <div
                    className='text-white fs-4 bg-navy-blue w50 h50 d-flex justify-content-center align-items-center rounded-circle pointer close-icon'
                    onClick={() => setOpen(false)}
                >
                    <MdClose fontSize={30} className={'Md-Close'} />
                </div>

                <Modal.Body>
                    <div className='mb-3'>
                        <PTag classes={'text-dark-blue fw-bold'} texts={'Upload CSV'} />
                        <PTag
                            classes={'text-dark-gray'}
                            texts={'Download CSV Template or Upload CSV'}
                        />
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <ButtonTag
                                classes={'semibold rounded btn-orange w-100'}
                                value={'Download'}
                            />
                        </div>
                        <div className='col-6'>
                            <ButtonTag
                                classes={
                                    'd-flex justify-content-center align-items-center btn-dashed-border-1 bg-lite-white rounded position-relative w-100'
                                }
                                value={
                                    <>
                                        <InputTag
                                            className={'uplode-input w-100 h-100'}
                                            type={'file'}
                                            name={'fileSelect'}
                                        />
                                        <FiUploadCloud className={'Fi-UploadCloud'} color={'#427CC3'} />
                                        <PTag
                                            classes={'text-navy-blue bold ms-2'}
                                            texts={'Upload File'}
                                        />
                                    </>
                                }
                                onClick={() => setOpen(true)}
                            />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UploadCSV
