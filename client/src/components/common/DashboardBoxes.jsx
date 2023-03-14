import { ATag, PTag } from '../designComponents/MicroComponents'
import { ProgressBar } from 'react-bootstrap'
import { RightChevron } from '../AllSvgs'

const DashboardBoxes = ({ title, titlePercentage, now, type, ...rest }) => {
    const boxType = type === 'up' ? 'text-green' : type === 'down' ? 'text-orange' : 'text-primary'
    const boxProgress = type === 'up' ? 'success' : type === 'down' ? 'warning' : 'primary'

    return (
        <div className='col-sm-4 col-6 mb-4' {...rest}>
            <div className='box w-100 border dashboard-boxs p-4'>
                <div className='d-flex justify-content-between mb-3'>
                    <PTag classes={'text-dark-blue bold text-capitalize'} texts={title} />
                    <PTag classes={`${boxType} fw-bold`} texts={titlePercentage} />
                </div>
                <div className='service-offered-bar mb-3'>
                    <ProgressBar variant={boxProgress} now={now} />
                </div>
                <div className='mt-2'>
                    <div
                        className='d-flex align-items-center justify-content-center '
                    >
                        <PTag classes={'text-navy-blue semibold text-capitalize'} texts={'Complete Profile'} />
                        <RightChevron width={'24'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardBoxes
