import React from 'react'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { SuccessfulIcon } from '../../components/AllSvgs'
import { ButtonTag, PTag } from '../../components/designComponents/MicroComponents'
//icons
import { MdClose } from 'react-icons/md'

export default function RecurringPaymentAdded({ show, setShow }) {

    const navigation = useNavigate()

    return (
        <>
            <Modal show={show}
                onHide={() => setShow(false)}
                dialogClassName='modal-dialog-scrollable'>
                <div
                    className='text-white fs-4 bg-navy-blue w50 h50 d-flex justify-content-center align-items-center rounded-circle pointer close-icon'
                    onClick={() => setEtershow(false)}
                >
                    <MdClose fontSize={30} className={'Md-Close'} />
                </div>
                <Modal.Body>
                    <div className="row">
                        <div className='d-flex justify-content-center'>
                            <SuccessfulIcon />
                        </div>
                        <div>
                            <PTag classes={'fw-bold text-dark-blue text-center mt-3 fn-18'} texts={'Recurring Payment Added of ₹5000'} />
                            <PTag classes={'text-center'} texts={'Every week on Wednesday at 11:00 am Starting from April'} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-lg-6 mt-3">
                            <ButtonTag classes={'btn-extra-lite-green w-100'} value={'Edit'}
                                onClick={() => setShow(false)}
                            />
                        </div>
                        <div className="col-lg-6 mt-3">
                            <ButtonTag classes={'btn-orange w-100'} value={'Continue'}
                                onClick={() => { navigation('/dashboard/resourcebooked/') }}
                            />
                        </div>
                    </div>

                </Modal.Body>
            </Modal>

        </>
    )
}
