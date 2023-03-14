// import packages
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    ATag,
    ButtonTag,
    H1Tag,
    PTag,
    BackButton,
} from '../../components/designComponents/MicroComponents'

const Verify = () => {
    const navigate = useNavigate()

    // states
    const [otp, setOtp] = useState('')
    const [formIsValid, setFormIsValid] = useState(false)

    // methods
    const handleChange = otp => {
        setOtp(otp)
        setFormIsValid(otp.length == 6)
    }

    const onSubmitForm = event => {
        event.preventDefault()
        if (otp == '123456') {
            navigate('/auth/createPassword')
        } else {
            alert('Enter vaild otp')
        }
    }

    // render
    return (
        <div className='container h-100'>
            <div className='otp-page d-flex flex-column justify-content-between h-100'>
                {/*Back Button*/}
                <BackButton title={'Verify'} src={'/auth/resetPassword'} />

                <div className='mt-4'>
                    <H1Tag classes='page-heading text-dark-blue fw-bolder' title={'Verify'} />
                    <PTag
                        classes={'text-dark-gray'}
                        texts={'We have sent the verification code to your mobile number'}
                    />
                </div>

                <div className='mt-4 mb-2 d-flex align-items-center'>
                    <PTag classes={'text-dark-blue semibold fs-4'} texts={'9876543210'} />
                </div>

                <form
                    onSubmit={onSubmitForm}
                    className='d-flex flex-column justify-content-between h-100'
                >
                    <div>
                        {/* <OtpInput
                            value={otp}
                            onChange={handleChange}
                            numInputs={6}
                            inputStyle='w-100 px-3 otp-control bd-highlight card me-2 heightBox'
                            className='mt-3'
                        /> */}

                        <PTag
                            classes={'text-dark-blue mt-3'}
                            texts={
                                <div className='d-flex flex-row'>
                                    <PTag texts={"Didn't receive code?"} />{' '}
                                    <ATag

                                        classes={'text-navy-blue ms-2'}
                                        children={'Request again'}
                                    />
                                </div>
                            }
                        />
                    </div>

                    <ButtonTag
                        classes={'btn btn-orange w-100 mt-3'}
                        value={'Continue'}
                        disabled={!formIsValid}
                    />
                </form>
            </div>
        </div>
    )
}

export default Verify
