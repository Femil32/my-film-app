import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { AiFillHeart } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { OfferIcon } from '../../../assets/img';
import { indianAmount, toggleWishList } from '../../../helpers/functions';
import { useSearchContext } from '../../../hooks/useSearchContext';
import { setBookProfile } from '../../../store/requestavailability/slice';
import { Star } from '../../AllSvgs';
import { ButtonTag, ImgTag, PTag } from '../../designComponents/MicroComponents';
import BookDirectlyModel from '../models/BookDirectlyModel';

const Talent = ({ profile, index, otherProfile }) => {

    const dispatch = useDispatch()
    const { talentResult, otherProfilesFromSeller } = useSelector(store => store.search)
    const [bookNowModel, setBookNowModel] = useState(false)

    return (
        <div className='h-100'>
            <Link to={`/search/listing/talent`} state={{ profile }} className='card product-card rounded-16 p-3 h-100'>
                <div className='position-relative border rounded-10 overflow-hidden product-img mb-3 remove-position bg-secondary'>
                    {/* Offer Icon */}
                    {profile?.coupon?.couponTypeLabel &&
                        <div className='bg-dark-orange d-flex align-items-center rounded-3 position-absolute top-10 start-10 px-2 py-1'>
                            <ImgTag src={OfferIcon} alt='offer' />
                            <PTag texts={`${profile?.coupon?.couponValue}%  ${profile?.coupon?.couponTypeLabel}`} classes='text-white bold ms-2' />
                        </div>
                    }
                    {/* Heart Icon */}
                    <div className={` ${profile?.wishlistProfile && 'active'} like-box d-flex justify-content-center align-items-center pointer`} onClick={(e) => {
                        e.preventDefault()
                        toggleWishList(index, profile?.profileId, profile?.profileType, otherProfile ? otherProfilesFromSeller.otherProfiles : talentResult, "TALENT_DATA", dispatch, otherProfile)
                    }}>
                        {/* wishListsIds.includes(profile?.profileId) && 'red' */}
                        <AiFillHeart color={`${profile?.wishlistProfile ? 'red' : '#526276'}`} className={'Ai-Fill-Heart'} />
                    </div>
                    <div className='mx-auto h-100 w-100'>
                        <ImgTag src={profile?.profileImage?.imageUrl} alt={profile?.profileImage?.imageName} classes='object-fit-contain w-100 h-100' />
                    </div>
                </div>
                <div className='card-body p-0 d-flex flex-column'>
                    <div className='d-flex justify-content-between align-items-start mb-3'>
                        <div>
                            <PTag texts={profile?.userDetail?.firstName + " " + profile?.userDetail?.lastName} classes='text-dark-blue fn-17 fw-bold' />
                            <PTag texts={profile?.profileType.split('/')[2] || profile?.profileType.split('/')[1]} classes='text-dark-blue text-capitalize' />
                        </div>
                        <div className='bg-extra-lite-skyblue d-flex align-items-center justify-content-center rounded-2 px-2'>
                            <Star width={12} className='me-1 mb-1' />
                            <p className='text-dark-gray'>{profile?.profileRating}</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between align-items-start mt-auto'>
                        <div>
                            <PTag texts='Base Price' classes='text-dark-gray' />
                            {profile?.rates?.map((rate, i) => {
                                return (
                                    <div className='d-flex text-dark' key={i}>
                                        <small>{rate.rateLabel} :</small>
                                        <small>{' ₹' + rate.rate}</small>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='d-flex align-items-center'>
                            <MdLocationOn fontSize={25} fill={'rgb(135 146 160)'} />
                            <PTag texts={profile?.locationCityName ?? profile?.userDetail?.userLocation ?? 'NA'} classes='text-gray' />
                        </div>
                    </div>
                    <Row className='g-2 border-top pt-2 d-flex align-items-center justify-content-between mt-2 row'>
                        <ButtonTag
                            value='Book Directly'
                            classes='btn btn-orange samibold fn-12 rounded white-space-nowrap w-100'
                            onClick={(e) => {
                                e.preventDefault()
                                dispatch(setBookProfile(profile))
                                setBookNowModel(true)
                            }}
                        />
                    </Row>
                </div>
            </Link>

            <BookDirectlyModel isOpen={bookNowModel} setIsOpen={setBookNowModel} />
        </div>

    )
}

export default Talent