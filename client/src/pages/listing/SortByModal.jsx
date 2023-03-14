import { FaCheck } from 'react-icons/fa'
import React from 'react'
import { Modal } from 'react-bootstrap'
import { PTag } from '../../components/designComponents/MicroComponents'
//icons
import { MdClose } from 'react-icons/md'

const SortByModal = ({ show, setOpen }) => {
    const sort = [
        { classes: 'active', sortText: 'New' },
        { sortText: 'Popluar' },
        { sortText: 'Price Low To High' },
        { sortText: 'Price High To Low' },
        { sortText: 'Ratings - High To Low' },
        { sortText: 'Ratings - High To Low' },
    ]
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
                    <div>
                        <div className='mb-3'>
                            <PTag classes={'text-dark-blue fw-bold'} texts={'Sort By'} />
                        </div>
                        <div className='text-gray'>
                            {sort.map((data, index) => (
                                <div key={index}
                                    className={`d-flex justify-content-between align-items-center border-bottom sort pb-3 mb-3 ${data.classes ?? ''}`}
                                >
                                    <PTag classes={'bold'} texts={data.sortText} />
                                    <FaCheck />
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default SortByModal
