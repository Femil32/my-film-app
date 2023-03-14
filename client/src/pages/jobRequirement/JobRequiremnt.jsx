import React, { useState, usEffect, useEffect } from 'react'
import { Provider } from './MultiStepFormContext'
import BasicDetail from './BasicDetail'
import Addressdetail from './AddressDetails'
import SocialDetails from './SocialDetails'
import SelectCategory from './SelectCategory'
import { Stepper } from 'react-form-stepper'
import { BackButton, H1Tag, PTag } from '../../components/designComponents/MicroComponents'
import { MOBILE_NO } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo, setAuth } from '../../store/auth/slice'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'

const JobRequiremnt = ({ setLoading }) => {
    const auth = useSelector(state => state.auth)

    const detailsInitialState = {
        firstName: '',
        lastName: '',
        dob: '',
        mobile: localStorage.getItem(MOBILE_NO),
        whatsAppno: '',
        email: '',
        gender: 'male',
        categories: [],
        sameasabove: false,
    }

    const catgoeryInitialState = {
        selectedCategories: [],
    }

    const addressInitialState = {
        country: '',
        pincode: '',
        state: '',
        city: '',
        address: '',
        countryArray: [],
        stateArray: [],
        cityArray: [],
    }

    const socialInitialState = {
        address1: '',
        address2: '',
        city: '',
    }

    const renderStep = step => {

        switch (step) {
            case 0:
                return <BasicDetail />
            case 1:
                return <Addressdetail />
            case 2:
                return <SocialDetails />
            default:
                return null
        }
    }
    const [basicdetail, setBasicDetails] = useState(detailsInitialState)
    const [addressdetail, setAddressDetail] = useState(addressInitialState)
    const [socialdetail, setSocialDetail] = useState(socialInitialState)
    const [catgoeryState, setCatgoery] = useState(catgoeryInitialState)
    const [currentStep, setCurrentStep] = useState(1)

    const dispatch = useDispatch()

    useEffect(() => {
        Promise.all([
            dispatch(getUserInfo()),
            dispatch(setAuth())
        ]).finally(() => {
            setLoading(false)
        })
    }, [])

    const next = () => {
        setCurrentStep(currentStep + 1)
    }

    const prev = () => {
        setCurrentStep(currentStep - 1)
    }
    return (
        <div className='container max-w-820 mx-auto'>
            <div className='my-3 text-center'>
                <H1Tag
                    classes={
                        'text-dark-blue fn-md-20 fn-26 fw-bold border-bottom border-2 border-dark d-inline text-capitalize'
                    }
                    title={`Welcome! ${auth.userInfo.firstName ? auth.userInfo.firstName : 'User'}`}
                />
                <PTag
                    classes={'text-dark-blue fn-18 line-height-1 mt-sm-2'}
                    texts={'Update your profile to get listed'}
                />
            </div>
            <Provider
                value={{
                    basicdetail,
                    setBasicDetails,
                    catgoeryState,
                    setCatgoery,
                    next,
                    prev,
                    addressdetail,
                    setAddressDetail,
                    socialdetail,
                    setSocialDetail,
                }}
            >
                <Stepper
                    steps={[
                        { label: 'Basic details' },
                        { label: 'Address details' },
                        { label: 'Social details' },
                    ]}
                    activeStep={currentStep}
                    className='mt-2'
                />

                <main>{renderStep(currentStep)}</main>
            </Provider>
        </div>
    )
}
export default IsLoadingHOC(JobRequiremnt)
