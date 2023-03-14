import React, { useEffect, useState } from 'react'
import { Provider } from './TalentContext'
import { Stepper } from 'react-form-stepper'
import { BackButton } from '../../components/designComponents/MicroComponents'
import TalentBasicDetail from './TalentBasicDetail'
import TalentVitalDetail from './TalentVitalDetail'
import TalentProtfolioDetail from './TalentProtfolioDetail'
import TalentChargesDetails from './TalentChargesDetails'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { allGenres, getAllInterests, AllTaxes } from '../../store/masterdata/slice'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'
import { getTalentDynamicFields } from '../../store/talent/slice'

const Talentdetails = ({ setLoading }) => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const dispatch = useDispatch()

    const basicDetailInitial = {}
    const vitalDetailInitial = {}
    const chargeInitial = {}
    const protfolioInitial = {}

    useEffect(() => {
        dispatch(getTalentDynamicFields(state?.profile?.profileId))
        setLoading(false)
    }, [])

    const renderStep = step => {
        switch (step) {
            case 0:
                return <TalentBasicDetail data={state} />
            case 1:
                return <TalentVitalDetail data={state} />
            case 2:
                return <TalentProtfolioDetail data={state} />
            case 3:
                return <TalentChargesDetails data={state} />
            default:
                return null
        }
    }
    const [basicDetailInitialState, setBasicDetailInitial] = useState(basicDetailInitial)
    const [vitalDetailInitialState, setVitalDetailInitial] = useState(vitalDetailInitial)
    const [chargeInitialState, setChargeInitial] = useState(chargeInitial)
    const [protfolioInitialState, setProtfolioInitial] = useState(protfolioInitial)
    const [currentStep, setCurrentStep] = useState(0)

    const next = () => {
        if (currentStep === 0) {
            setBasicDetailInitial(basicDetailInitialState)
            setVitalDetailInitial(vitalDetailInitialState)
            setProtfolioInitial(protfolioInitialState)
            setChargeInitial(chargeInitialState)
        }
        setCurrentStep(currentStep + 1)
    }
    const prev = () => setCurrentStep(currentStep - 1)
    return (
        <>
            <div className='container'>
                <BackButton
                    onClick={e => {
                        e.preventDefault()
                        // if (currentStep > 0) {
                        //     prev()
                        // } else {
                        navigate('/dashboard')
                        // }
                    }}
                />
                <div className='max-w-730 mx-auto'>
                    <Provider value={{ next, prev }}>
                        <Stepper
                            steps={[
                                { label: 'Basic details' },
                                { label: 'Vital details' },
                                { label: 'Portfolio details' },
                                { label: 'Charge details' },
                            ]}
                            activeStep={currentStep}
                            className='mt-2'
                        />
                        <main>
                            <div className='container'>{renderStep(currentStep)}</div>
                        </main>
                    </Provider>
                </div>
            </div>
        </>
    )
}

export default IsLoadingHOC(Talentdetails)
