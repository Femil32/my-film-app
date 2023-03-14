import React, { useEffect, useState } from 'react'
import { Provider } from './InventoryContext'
import { Stepper } from 'react-form-stepper'
import { BackButton } from '../../components/designComponents/MicroComponents'
import InventoryBasicDetail from './InventoryBasicDetail'
import InventoryProtfolioDetail from './InventoryProtfolioDetail'
import InventoryChargeDetails from './InventoryChargeDetails'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getInventorytypeApi } from '../../store/service/slice'

const Inventory = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { state } = useLocation()

    const basicDetailInitial = {}
    const chargeInitial = {}
    const protfolioInitial = {}

    const servicesData = useSelector(state => state.service)

    useEffect(() => {
        dispatch(getInventorytypeApi(state.categoryData.subSubCategoryId))
    }, [])

    const renderStep = step => {
        switch (step) {
            case 0:
                return <InventoryBasicDetail data={state} />
            case 1:
                return <InventoryProtfolioDetail data={state} />
            case 2:
                return <InventoryChargeDetails data={state} />
            default:
                return null
        }
    }
    const [basicDetailInitialState, setBasicDetailInitial] = useState(basicDetailInitial)
    const [protfolioInitialState, setProtfolioInitial] = useState(protfolioInitial)
    const [chargeInitialState, setChargeInitial] = useState(chargeInitial)
    const [currentStep, setCurrentStep] = useState(0)
    const [inventory, setInventory] = useState('')

    const next = () => {
        setCurrentStep(currentStep + 1)
    }
    const prev = () => setCurrentStep(currentStep - 1)
    return (
        <div className='container'>
            <Provider value={{ next, prev, inventory, setInventory }}>
                <BackButton
                    textClass={'fn-20'}
                    title={''}
                    onClick={() => {
                        navigate('/dashboard/added-inventories/', {
                            state: state,
                        })
                    }}
                />
                <div className='max-w-820 mx-auto'>
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
                </div>
            </Provider>
        </div>
    )
}

export default Inventory
