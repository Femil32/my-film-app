import React, { useMemo, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Star } from '../../components/AllSvgs'
import PropTypes from 'prop-types'
import {
    ButtonTag,
    InputTag,
    LabelTag,
    MultiLineInputTag,
    PTag,
} from '../../components/designComponents/MicroComponents'
//iconssetISOpen
import { MdClose } from 'react-icons/md'
import * as Yup from 'yup';
import InputError from '../../components/common/InputError'
import { useSelector } from 'react-redux'


const AddReview = ({ show, setIsOpen, inventoryCount, sellerCount, color }) => {

    const review = useSelector(store => store.review)

    const [hoverRatingInventory, setHoverRatingInventory] = useState(0)
    const [hoverRatingSeller, setHoverRatingSeller] = useState(0)
    const [inventoryRating, setInventoryRating] = useState(2)
    const [sellerRating, setSellerRating] = useState(2)

    const [reviewMsg, setReviewMsg] = useState(null)
    const [reviewMsgError, setReviewMsgError] = useState(null)

    const getColor = (index, type) => {
        switch (type) {
            case 0:
                if (hoverRatingInventory >= index) {
                    return color.filled
                } else if (!hoverRatingInventory && inventoryRating >= index) {
                    return color.filled
                }
                break;
            case 1:
                if (hoverRatingSeller >= index) {
                    return color.filled
                } else if (!hoverRatingSeller && sellerRating >= index) {
                    return color.filled
                }
                break;

            default:
                break;
        }


        return color.unfilled
    }

    const inventoryRatingCompo = useMemo(() => {
        return Array(inventoryCount).fill(0).map((_, i) => i + 1).map(idx =>
            <div className='me-2' key={idx} onClick={() => setInventoryRating(idx)}>
                <Star width={25} fill={getColor(idx, 0)} onMouseEnter={() => { setHoverRatingInventory(idx) }} onMouseLeave={() => { setHoverRatingInventory(0) }} />
            </div>
        )
    }, [inventoryCount, inventoryRating, hoverRatingInventory])

    const sellerRatingCompo = useMemo(() => {
        return Array(sellerCount).fill(0).map((_, i) => i + 1).map(idx =>
            <div className='me-2' key={idx} onClick={() => setSellerRating(idx)}>
                <Star width={25} fill={getColor(idx, 1)} onMouseEnter={() => { setHoverRatingSeller(idx) }} onMouseLeave={() => { setHoverRatingSeller(0) }} />
            </div>
        )
    }, [sellerCount, sellerRating, hoverRatingSeller])

    let schema = Yup.object().shape({
        reviewMessage: Yup.string().required().matches(
            /^(?!.*^\s*$)/,
            `can't be Empty.`
        )
    });

    const sendReview = () => {
        let payload = {
            talentProfileId: 8669,
            sellerRating: sellerRating,
            inventoryRating: inventoryRating,
            reviewMessage: reviewMsg,
            ...review?.reviewData
        }
        // setIsOpen(false)
    }


    return (
        <>
            <Modal
                show={show}
                onHide={() => setISOpen(false)}
                dialogClassName='modal-dialog-scrollable max-w-400'
            >
                <div
                    className='text-white fs-4 bg-navy-blue w50 h50 d-flex justify-content-center align-items-center rounded-circle pointer close-icon'
                    onClick={() => setISOpen(false)}
                >
                    <MdClose fontSize={30} className={'Md-Close'} />
                </div>
                <Modal.Header>
                    <div className='text-center w-100'>
                        <PTag classes={'text-dark-blue fw-bold'} texts={'Add Review'} />
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className='mb-4'>
                            <PTag
                                classes={'text-dark-blue fn-18 fw-bold mb-2'}
                                texts={'Rate inventory'}
                            />
                            <div className='d-flex'>
                                <div className='me-2'>
                                    <Star width={25} />
                                </div>
                                <div className='me-2'>
                                    <Star width={25} />
                                </div>
                                <div className='me-2'>
                                    <Star width={25} fill={'#DEE4EB'} />
                                </div>
                                <div className='me-2'>
                                    <Star width={25} fill={'#DEE4EB'} />
                                </div>
                                <div className='me-2'>
                                    <Star width={25} fill={'#DEE4EB'} />
                                </div>
                            </div>
                        </div>
                        <div className='mb-4'>
                            <PTag
                                classes={'text-dark-blue fn-18 fw-bold mb-2'}
                                texts={'Rate Seller'}
                            />
                            <div className='d-flex'>
                                <div className='me-2'>
                                    <Star width={25} />
                                </div>
                                <div className='me-2'>
                                    <Star width={25} />
                                </div>
                                <div className='me-2'>
                                    <Star width={25} fill={'#DEE4EB'} />
                                </div>
                                <div className='me-2'>
                                    <Star width={25} fill={'#DEE4EB'} />
                                </div>
                                <div className='me-2'>
                                    <Star width={25} fill={'#DEE4EB'} />
                                </div>
                            </div>
                        </div>
                        <div className={`sign-input ${reviewMsgError &&
                            ` error-inputs`} mb-3`}>
                            <MultiLineInputTag
                                classes={'form-control'}
                                placeholder={'Write your review'}
                                onBlur={(e) => {
                                    schema.validate({
                                        reviewMessage: e.target.value
                                    }).then(res => {
                                        setReviewMsg(e.target.value)
                                        setReviewMsgError(null)
                                    }).catch(err => {
                                        setReviewMsgError(err.errors)
                                    })
                                }}
                            />
                            {reviewMsgError &&
                                <InputError className={'input-error mt-2'} errorTitle={reviewMsgError} />
                            }
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='border-top-0 p-0'>
                    <div className='box-shadow w-100 px-3 pb-2 pb-3 pt-3'>
                        <ButtonTag
                            classes={'btn-orange bold fn-12 w-100'}
                            value={'Continue'}
                            onClick={() => {
                                sendReview()
                            }}
                        />
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}


AddReview.propTypes = {
    show: PropTypes.bool,
    inventoryCount: PropTypes.number,
    sellerCount: PropTypes.number,
    rating: PropTypes.number,
    color: PropTypes.object,
    // functions
    onRating: PropTypes.func,
    setIsOpen: PropTypes.func,
}

AddReview.defaultProps = {
    show: false,
    inventoryCount: 5,
    sellerCount: 5,
    rating: 0,
    color: {
        filled: "#ffc107",
        unfilled: "#DEE4EB",
    },
}

export default AddReview
