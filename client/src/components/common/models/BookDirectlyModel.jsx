import React from 'react'
import { Modal } from 'react-bootstrap'
import { MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setBookProfile } from '../../../store/requestavailability/slice'

const BookDirectlyModel = ({ isOpen, setIsOpen }) => {

    const dispatch = useDispatch()
    const { bookProfile } = useSelector(store => store.requestavailability)
    return (
        <Modal
            show={isOpen}
            onHide={() => {
                setIsOpen(false)
                dispatch(setBookProfile(null))
            }}
            dialogClassName='max-w-400'
            centered
        >
            <div
                className='text-white fs-4 bg-navy-blue w50 h50 d-flex justify-content-center align-items-center rounded-circle pointer close-icon'
                onClick={() => {
                    setIsOpen(false)
                }}
            >
                <MdClose fontSize={30} className={'Md-Close'} />
            </div>
            <Modal.Body className='p-0 '>
                <div className={'px-4'}>
                    <div className='py-4 border-bottom'>
                        <h6 className='mb-2 fw-bold'>Select Project</h6>
                        <p className=''>Check availability before booking.Charges and
                            terms can be negotiated once seller indicates
                            availability.</p>
                    </div>
                    <div className='py-4 border-bottom'>
                        <h6 className='mb-2 fw-bold'>Check Availability</h6>
                        <p className=''>
                            Check availability against specific booking
                            dates</p>
                        <Link to='/dashboard/orders/check-availability' state={{ bookProfile }} className='btn btn-dark-blue w-100 mt-3'>
                            Check Availability
                        </Link>
                    </div>
                    <div className='py-4'>
                        <h6 className='mb-2 fw-bold'>Book Directly</h6>
                        <p className=''>
                            Are you sure on availability,cancellation charges
                            will be applicable.</p>
                        <Link to='/dashboard/orders/book-directly' state={{ bookProfile }} className='btn btn-dark-blue w-100 mt-3'>
                            Book Now
                        </Link>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default BookDirectlyModel