import React, { useEffect, useState } from 'react'
import { Provider } from './CrewContext'
import { Stepper } from 'react-form-stepper'
import { BackButton } from '../../components/designComponents/MicroComponents'
import CrewBasicDetail from './CrewBasicDetail'
import CrewProtfolioDetail from './CrewProtfolioDetail'
import CrewChargeDetails from './CrewChargeDetails'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const DetailsCrew = () => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const dispatch = useDispatch()

    const basicDetailInitial = {}
    const chargeInitial = {}
    const protfolioInitial = {}
    const categoryInitial = {}

    const renderStep = step => {
        switch (step) {
            case 0:
                return <CrewBasicDetail data={state} />
            case 1:
                return <CrewProtfolioDetail data={state} />
            case 2:
                return <CrewChargeDetails data={state} />
            default:
                return null
        }
    }
    const [basicDetailInitialState, setBasicDetailInitial] = useState(basicDetailInitial)
    const [protfolioInitialState, setProtfolioInitial] = useState(protfolioInitial)
    const [chargeInitialState, setChargeInitial] = useState(chargeInitial)
    const [categoryInitialState, setCategoryInitial] = useState(categoryInitial)
    const [currentStep, setCurrentStep] = useState(0)
    const [profileId, setProfileId] = useState(state)

    const next = () => {
        setCurrentStep(currentStep + 1)
    }
    const prev = () => setCurrentStep(currentStep - 1)

    return (
        <div className='container'>
            <BackButton
                onClick={() => {
                    // if (currentStep > 0) {
                    //     prev()
                    // } else {
                    navigate('/dashboard')
                    // }
                }}
            />
            <div className='max-w-820 mx-auto'>
                <Provider
                    value={{
                        next,
                        prev,
                        categoryInitialState,
                        setCategoryInitial,
                        chargeInitialState,
                        setChargeInitial,
                        protfolioInitialState,
                        setProtfolioInitial,
                        basicDetailInitialState,
                        setBasicDetailInitial,
                        profileId,
                    }}
                >
                    <Stepper
                        steps={[
                            { label: 'Basic details' },
                            { label: 'Portfolio details' },
                            { label: 'Charge details' },
                        ]}
                        activeStep={currentStep}
                        className='mt-2'
                    />
                    <main>{renderStep(currentStep)}</main>
                </Provider>
            </div>
        </div>
    )
}

export default DetailsCrew
