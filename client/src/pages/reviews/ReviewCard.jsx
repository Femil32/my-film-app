import { FiPhone } from 'react-icons/fi'
import { MdLocationOn } from 'react-icons/md'
import { Card } from 'react-bootstrap'
import {
    ButtonTag,
    ImgTag,
    PTag,
} from '../../components/designComponents/MicroComponents'
import { Star } from '../../components/AllSvgs'


const ReviewCard = ({ profile, profileName, location, description, image, className }) => {
    return (
        <Card className={`border product-card rounded-16 position-relative p-3 mb-3`}>
            <div className='position-absolute top-15 end-15'>
                <ButtonTag
                    classes={'btn-extra-lite-green'}
                    value={<FiPhone fontSize={19} />}
                />
            </div>
            <div className='d-flex mb-2'>
                <div className='max-w-80 w-100 h-80 rounded-10 overflow-hidden me-2'>
                    <ImgTag
                        classes={'img-fluid h-100'}
                        src={profile}
                    />
                </div>
                <div className='w-100'>
                    <div>
                        <div className='d-flex mb-2'>
                            <Star width={14} className={'me-2'} />
                            <Star width={14} className={'me-2'} />
                            <Star width={14} className={'me-2'} />
                            <Star
                                width={14}
                                fill={'#DEE4EB'}
                                className={'me-2'}
                            />
                            <Star
                                width={14}
                                fill={'#DEE4EB'}
                                className={'me-2'}
                            />
                        </div>
                        <PTag
                            texts={profileName}
                            classes={
                                'text-dark-blue fn-17 fw-bold mb-1'
                            }
                        />
                    </div>
                    <div className='d-flex align-items-center'>
                        <MdLocationOn fontSize={25} fill={'rgb(135 146 160)'} />
                        <PTag
                            classes={'text-gray'}
                            texts={location}
                        />
                    </div>
                </div>
            </div>
            <PTag
                classes={'text-dark-gray mb-3'}
                texts={description}
            />
            <div className='max-h-260 rounded-10 overflow-hidden'>
                <ImgTag
                    classes={'img-fluid w-100 h-100'}
                    src={image}
                />
            </div>
        </Card>);

}

export default ReviewCard