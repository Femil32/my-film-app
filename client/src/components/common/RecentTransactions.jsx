import { ImgTag, PTag } from '../designComponents/MicroComponents'

const RecentTransactions = ({ image, name, amount, date }) => {
    return (
        <div className='d-flex align-items-center mb-3'>
            <div className='mini-profile-box me-2'>
                <ImgTag src={image} classes={'img-fluid w-100 rounded-10'} />
            </div>
            <div className='w-100'>
                <div className='d-flex justify-content-between mb-2'>
                    <PTag classes={'text-dark-blue bold'} texts={name} />
                    <PTag classes={'text-red fw-bold'} texts={amount} />
                </div>
                <PTag classes={'text-gray'} texts={date} />
            </div>
        </div>
    )
}

export default RecentTransactions
