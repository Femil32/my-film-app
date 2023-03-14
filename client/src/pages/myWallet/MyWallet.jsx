import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ProfilePictureTwo } from '../../assets/img'
import { BackButton, ButtonTag, PTag } from '../../components/designComponents/MicroComponents'
import { TransferMoney } from './TransferMoney'
import WalletCard from './WalletCard'
//icons
import { MdOutlineFilterList } from 'react-icons/md'
import { getWallet, getWalletTransactions } from '../../store/wallet/slice'
import { useDispatch, useSelector } from 'react-redux'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'

const MyWallet = ({ setLoading }) => {
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const wallet = useSelector(state => state.wallet)

    useEffect(() => {
        Promise.all([dispatch(getWallet()), dispatch(getWalletTransactions())]).finally(() => {
            setLoading(false)
        })
    }, [])


    const walletCard = [
        {
            UserImg: ProfilePictureTwo,
            UserName: 'Aakash Shah',
            DateTime: 'Mar 23, 11:30 am',
            TransactionId: '1448',
            StustsTransferred: 'Pending Money Transferred To Aakash',
            UpDown: '+ ₹3000',
            Balance: '₹5448',
        },
        {
            UserImg: ProfilePictureTwo,
            UserName: 'Aakash Shah',
            DateTime: 'Mar 23, 11:30 am',
            TransactionId: '1448',
            StustsTransferred: 'Pending Money Transferred To Aakash',
            UpDown: '+ ₹3000',
            Balance: '₹5448',
        },
        {
            UserImg: ProfilePictureTwo,
            UserName: 'Aakash Shah',
            DateTime: 'Mar 23, 11:30 am',
            TransactionId: '1448',
            StustsTransferred: 'Pending Money Transferred To Aakash',
            UpDown: '+ ₹3000',
            Balance: '₹5448',
        },
        {
            UserImg: ProfilePictureTwo,
            UserName: 'Aakash Shah',
            DateTime: 'Mar 23, 11:30 am',
            TransactionId: '1448',
            StustsTransferred: 'Pending Money Transferred To Aakash',
            UpDown: '+ ₹3000',
            Balance: '₹5448',
        },
        {
            UserImg: ProfilePictureTwo,
            UserName: 'Aakash Shah',
            DateTime: 'Mar 23, 11:30 am',
            TransactionId: '1448',
            StustsTransferred: 'Pending Money Transferred To Aakash',
            UpDown: '+ ₹3000',
            Balance: '₹5448',
        },
    ]
    return (
        <>
            <div className='container my-5'>
                <div>
                    <div className='d-sm-flex justify-content-between'>
                        <BackButton
                            textClass={'fn-20'}
                            title={'My Wallet'}
                            onClick={() => {
                                navigate('/dashboard')
                            }}
                        />
                        <div className='shadow-sm max-w-37 d-sm-flex justify-content-between align-items-center text-center rounded-10 p-3 gap-lg-0 gap-3'>
                            <div className='me-lg-5 d-flex flex-column'>
                                <PTag
                                    classes={
                                        'text-dark-gray semibold order-xs-1 mt-md-0 mb-md-0 mt-2 mb-3'
                                    }
                                    texts={'Current Balance'}
                                />
                                <PTag
                                    classes={'text-dark-blue fn-20 fw-bold mt-0 order-xs-0'}
                                    texts={`₹${wallet?.wallet?.walletAmount}`}
                                />
                            </div>
                            <div>
                                <ButtonTag
                                    onClick={() => setShow(true)}
                                    classes={'btn-extra-lite-green rounded bold px-5'}
                                    value={'Transfer'}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='d-flex align-items-center justify-content-between mt-xl-3 my-3'>
                            <div className=''>
                                <PTag
                                    classes={'text-dark-blue fw-bold fn-16'}
                                    texts={'Transaction Activity'}
                                />
                            </div>
                            <div
                                className='d-flex align-items-center pointer filter-button'
                            >
                                <MdOutlineFilterList fontSize={22} />
                                <PTag classes={'text-dark-blue mx-2'} texts={'Filter'} />
                                <PTag
                                    classes={
                                        'bg-navy-blue text-white rounded-circle w-30 h-30 d-flex justify-content-center align-items-center mt-0'
                                    }
                                    texts={'2'}
                                />
                            </div>
                        </div>
                        <Row>
                            {wallet?.walletTransactions?.transactions?.map((transition, index) => {
                                return (
                                    <Col lg={12} sm={6} key={index}>
                                        <WalletCard
                                            UserImg={transition.userDetail?.profileImageUrl}
                                            UserName={transition.userDetail?.firstName + ' ' + transition.userDetail?.lastName}
                                            DateTime={transition.transactionDate}
                                            TransactionId={transition.transactionId}
                                            StustsTransferred={transition.status}
                                            UpDown={transition.amount}
                                            Balance={transition.walletBalance}
                                        />
                                    </Col>
                                )
                            })}
                            {!wallet?.walletTransactions?.transactions?.length && <div className="w-100 d-flex align-items-center justify-content-center" style={{ height: '250px' }}><p classNames="text-gray ">No data found</p></div>}
                        </Row>
                    </div>
                </div>
                <TransferMoney show={show} setShow={setShow} />
            </div>
        </>
    )
}

export default IsLoadingHOC(MyWallet)