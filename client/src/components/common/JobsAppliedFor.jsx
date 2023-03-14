import { ImgTag, PTag } from '../designComponents/MicroComponents'

const JobsAppliedFor = ({ image, talentName, date, projectTitle, Status, Waiting }) => {
    return (
        <div className='d-flex align-items-center mb-3'>
            <div className='mini-profile-box bg-dark-gray me-2'>
                <ImgTag src={image} alt={'profile'} classes={'img-fluid'} />
            </div>
            <div className='w-100'>
                <div className='d-flex justify-content-between mb-2'>
                    <div className='max-w-120'>
                        <PTag classes={'text-dark-blue bold'} texts={talentName} />
                        <PTag classes={'text-gray'} texts={projectTitle} />

                    </div>
                    <div className='max-w-120'>
                        <PTag classes={'text-dark-blue bold'} texts={Status} />
                        <PTag classes={'text-gray'} texts={Waiting} />

                    </div>
                    <PTag classes={'text-dark-gray'} texts={date} />
                </div>
            </div>
        </div>
    )
}

export default JobsAppliedFor
