import React from 'react'
import { Modal } from 'react-bootstrap'
import {
    ButtonTag,
    InputTag,
    LabelTag,
    PTag,
} from '../../components/designComponents/MicroComponents'
//icons
import { MdClose } from 'react-icons/md'

const CancelOrder = ({ show, setOpen }) => {
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
                <Modal.Header>
                    <div className=''>
                        <PTag classes={'text-dark-blue fw-bold'} texts={'Cancel Order'} />
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className='form-check d-flex align-items-center mb-3'>
                            <InputTag
                                classes={'form-check-input w-20 h-20'}
                                type={'radio'}
                                name={'iaculisLorem'}
                                id={'iaculisLorem'}
                            />
                            <LabelTag
                                classes={'form-check-label text-dark-blue ms-3'}
                                For={'iaculisLorem'}
                                text={'Iaculis Lorem'}
                            />
                        </div>
                        <div className='form-check d-flex align-items-center mb-3'>
                            <InputTag
                                classes={'form-check-input w-20 h-20'}
                                type={'radio'}
                                name={'iaculisLorem'}
                                id={'iaculisLorem1'}
                            />
                            <LabelTag
                                classes={'form-check-label text-dark-blue ms-3'}
                                For={'iaculisLorem1'}
                                text={'Iaculis Lorem'}
                            />
                        </div>
                        <div className='form-check d-flex align-items-center mb-3'>
                            <InputTag
                                classes={'form-check-input w-20 h-20'}
                                type={'radio'}
                                name={'iaculisLorem'}
                                id={'iaculisLorem2'}
                            />
                            <LabelTag
                                classes={'form-check-label text-dark-blue ms-3'}
                                For={'iaculisLorem2'}
                                text={'Iaculis Lorem'}
                            />
                        </div>
                        <div className='form-check d-flex align-items-center mb-3'>
                            <InputTag
                                classes={'form-check-input w-20 h-20'}
                                type={'radio'}
                                name={'iaculisLorem'}
                                id={'iaculisLorem3'}
                            />
                            <LabelTag
                                classes={'form-check-label text-dark-blue ms-3'}
                                For={'iaculisLorem3'}
                                text={'Iaculis Lorem'}
                            />
                        </div>
                        <div className='form-check d-flex align-items-center mb-3'>
                            <InputTag
                                classes={'form-check-input w-20 h-20'}
                                type={'radio'}
                                name={'iaculisLorem'}
                                id={'iaculisLorem4'}
                            />
                            <LabelTag
                                classes={'form-check-label text-dark-blue ms-3'}
                                For={'iaculisLorem4'}
                                text={'Iaculis Lorem'}
                            />
                        </div>
                        <div className='form-check d-flex align-items-center mb-3'>
                            <InputTag
                                classes={'form-check-input w-20 h-20'}
                                type={'radio'}
                                name={'iaculisLorem'}
                                id={'iaculisLorem5'}
                            />
                            <LabelTag
                                classes={'form-check-label text-dark-blue ms-3'}
                                For={'iaculisLorem5'}
                                text={'Iaculis Lorem'}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='border-top-0 p-0'>
                    <div className='box-shadow w-100 px-3 pb-2 pb-3 pt-3'>
                        <ButtonTag
                            classes={'btn-dark-blue bold fn-12 w-100'}
                            value={'Cancel Order'}
                            onClick={() => setOpen(false)}
                        />
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CancelOrder
