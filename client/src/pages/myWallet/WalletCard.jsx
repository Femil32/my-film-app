import React from 'react'
import { ImgTag, PTag } from '../../components/designComponents/MicroComponents'
//icons
import { IoDocumentTextOutline } from 'react-icons/io5'
import { indianAmount } from '../../helpers/functions'
import moment from 'moment'

const WalletCard = ({
    UserImg,
    UserName,
    DateTime,
    TransactionId,
    StustsTransferred,
    UpDown,
    Balance,
}) => {
    return (
        <>
            <div className='bg-lite-white wallet-card rounded-16 p-3 mb-3'>
                <div className='d-lg-flex justify-content-between align-items-center flex-wrap transaction-row'>
                    <div className={'d-lg-none align-items-center flex'}>
                        <div className='w-24 icon-wrapper'>
                            <IoDocumentTextOutline fontSize={20} className={'Io-Document-TextOutline'} />
                        </div>
                        <PTag
                            classes={'text-dark-blue semibold ms-2'}
                            texts={`Transaction Id - ${TransactionId}`}
                        />
                    </div>
                    <div className='d-flex align-items-center justify-content-between my-lg-0 my-2 gap-3'>
                        <div className='d-flex align-items-center'>
                            <div className='max-w50 max-h50 w-100 h-100 rounded-10 overflow-hidden'>
                                <ImgTag src={UserImg} classes={'img-fluid'} />
                            </div>
                            <div className='ms-3'>
                                <PTag classes={'text-dark-blue semibold'} texts={UserName} />
                                <PTag classes={'text-gray mt-lg-2 mt-1'} texts={moment(DateTime).format('LLL')} />
                            </div>
                        </div>
                        <div className='text-end d-lg-none d-block'>
                            <PTag classes={`text-green semibold`} texts={UpDown} />
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <PTag
                                        classes={'text-dark-blue mt-lg-2 mt-1'}
                                        texts={`Balance : ${Balance}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'d-lg-flex align-items-center d-none'}>
                        <IoDocumentTextOutline fontSize={23} className={'Io-Document-TextOutline'} />
                        <PTag
                            classes={'text-dark-blue semibold ms-2'}
                            texts={`Transaction Id - ${TransactionId}`}
                        />
                    </div>
                    <div className='max-w-260'>
                        <PTag classes={'text-gray text-capitalize'} texts={StustsTransferred} />
                    </div>
                    <div className='d-lg-block d-none'>
                        <PTag classes={`semibold ${StustsTransferred === 'approved' ? 'text-green' : (StustsTransferred === 'pending' ? "text-warning" : "text-danger")}`} texts={indianAmount(UpDown)} />
                    </div>
                    <div className='d-lg-flex justify-content-between d-none'>
                        <PTag classes={'text-dark-blue mt-0'} texts={`Balance : ${indianAmount(Balance)}`} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default WalletCard
