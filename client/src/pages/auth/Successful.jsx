import { SuccessfulIcon } from '../../components/AllSvgs'
import { H1Tag, ButtonTag, BackButton } from '../../components/designComponents/MicroComponents'
import { useNavigate } from 'react-router-dom';

const Successful = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className='container'>
                <div className='successful-page'>
                    <div className='d-flex align-items-center justify-content-between mb-3'></div>

                    {/* Back Button Container */}
                    <BackButton src='/auth/signin' title='Successful' />

                    <div className='pb-4'>
                        <div className='text-center'>
                            <SuccessfulIcon />
                            <H1Tag
                                title='Password Reset Successful'
                                classes='page-heading text-dark-blue fw-bolder mt-3'
                            />
                        </div>

                        {/* Button */}
                        <ButtonTag classes='btn btn-orange w-100 mt-4' value='Continue' onClick={() => { navigate('/auth/signin') }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Successful
