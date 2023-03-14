import React from 'react'
import { Modal, Table } from 'react-bootstrap'
//icons
import { MdClose } from 'react-icons/md'
import { ButtonTag, InputTag, PTag } from '../../components/designComponents/MicroComponents'

const BottomSheetDialog = ({ show, setShow }) => {
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
                <Modal.Body className='p-0'>
                    <div>
                        <div className='d-flex justify-content-between align-items-center px-4 py-3'>
                            <PTag classes={'text-dark-blue fw-bold'} texts={'Filter'} />
                            <PTag classes={'text-orange fw-bold pointer'} texts={'Clear All'} />
                        </div>
                        <Table bordered className='mb-0'>
                            <tr>
                                <td className='bg-lite-white border-end'>
                                    <div className='p-3'>
                                        <PTag
                                            classes={'text-dark-blue fn-12'}
                                            texts={'Categories'}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className='d-flex justify-content-between align-items-center '>
                                        <InputTag
                                            type={'text'}
                                            classes={'text-navy-blue fn-12'}
                                            value={'Under ₹2000'}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr className='border-top-0'>
                                <td className='bg-lite-white border-end'>
                                    <div className='p-3'>
                                        <PTag
                                            classes={'text-dark-blue bold fn-12'}
                                            texts={'Gender'}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className='p-3'>
                                        <InputTag
                                            type={'text'}
                                            classes={'text-dark-gray fn-12'}
                                            value={'₹2000 - ₹5000'}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr className='border-top-0'>
                                <td className='bg-lite-white border-end'>
                                    <div className='p-3'>
                                        <PTag
                                            classes={'text-dark-blue bold fn-12'}
                                            texts={'Location'}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className='p-3'>
                                        <InputTag
                                            type={'text'}
                                            classes={'text-dark-gray fn-12'}
                                            value={'₹5000 - ₹10,000'}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr className='border-top-0'>
                                <td className='border-end'>
                                    <div className='p-3'>
                                        <PTag
                                            classes={'text-navy-blue bold fn-12'}
                                            texts={'Location'}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className='p-3'>
                                        <InputTag
                                            type={'text'}
                                            classes={'text-dark-gray fn-12'}
                                            value={'₹10,000 & Above'}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr className='border-top-0'>
                                <td className='bg-lite-white border-end'>
                                    <div className='p-3'>
                                        <PTag
                                            classes={'text-dark-blue bold fn-12'}
                                            texts={'Spot Deals'}
                                        />
                                    </div>
                                </td>
                                <td></td>
                            </tr>
                        </Table>
                        <div className='box-shadow px-3 pb-2 pb-3 pt-3'>
                            <ButtonTag
                                classes={'btn-orange bold fn-12 w-100'}
                                value={'Apply Filters'}
                                onClick={() => setShow(false)}
                            />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default BottomSheetDialog
