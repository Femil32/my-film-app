import React, { useState, useEffect } from 'react'
import { Provider } from './LocationContext'
import { Stepper } from 'react-form-stepper'
import { BackButton } from '../../components/designComponents/MicroComponents'
import LocationBasicDetail from './LocationBasicDetail'
import LocationAddressDetail from './LocationAddressDetail'
import LocationProtfolioDetail from './LocationProtfolioDetail'
import LocationChargeDetails from './LocationChargeDetails'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    getLocationAddressById,
    countriesApi,
    stateApi,
    cityApi,
    setLocation,
    getLocationProfileBasicDetails,
} from '../../store/location/slice'
import { useDispatch, useSelector } from 'react-redux'
import {
    AllTaxes,
    amenitiesApi,
    getCategoryAndSubCategoryByLink,
} from '../../store/masterdata/slice'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'

const DetailLocation = ({ setLoading }) => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const dispatch = useDispatch()

    const addressApi = useSelector(store => store.location)
    const masterData = useSelector(state => state.masterdata)

    const basicDetailInitial = {
        categoryId: '',
        subCategoryId: '',
        subSubCategoryId: '',
        property: '',
        description: '',
        amenities: [],
        latest_projects: '',
        keywords: [],
    }

    const [defaultCountryArray, setDefaultCountryArray] = useState([])
    const [defaultLocationHubArray, setDefaultLocationHubArray] = useState([])
    const [defaultStateArray, setDefaultStateArray] = useState([])
    const [defaultcityArray, setDefaultCityArray] = useState([])
    const [defaultCountry, setDefaultCountry] = useState({})
    const [defaultState, setDefaultState] = useState({})
    const [defaultCity, setDefaultCity] = useState({})
    const [defaultAddress, setDefaultAddress] = useState('')
    const [defaultPinCode, setDefaultPinCode] = useState('')

    const [addressIdData, setAddressIdData] = useState({})

    const [aminityArray, setAminityArray] = useState([])

    const [defaultCountryIsSet, setDefaultCountryIsSet] = useState(false)
    const [defaultStateIsSet, setDefaultStateIsSet] = useState(false)
    const [defaultCityIsSet, setDefaultCityIsSet] = useState(false)

    const [basicDetailInitialState, setBasicDetailInitial] = useState(basicDetailInitial)
    const [locationProfileInitialState, setLocationProfileInitial] = useState(state)
    const [currentStep, setCurrentStep] = useState(0)

    useEffect(() => {
        Promise.all([
            dispatch(getLocationProfileBasicDetails(state?.profile?.profileId)),
            dispatch(getCategoryAndSubCategoryByLink(state?.profile?.profileType)),
            dispatch(countriesApi()),
        ]).then(() => {
            setLocationProfileInitial(state)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (
            masterData.status === 'succeed' &&
            masterData.type === 'CATEGORY_AND_SUBCATEGORY_BY_PRAMILINK_API'
        ) {
            dispatch(
                amenitiesApi({
                    categoryId: masterData?.categoryAndSubCategory?.categoryId,
                    subCategoryId: masterData?.categoryAndSubCategory?.subCategoryId,
                    subSubCategoryId: masterData?.categoryAndSubCategory?.subSubCategoryId,
                })
            )
        }
        if (masterData.status === 'succeed' && masterData.type === 'AMENITIES_API') {
            const data =
                masterData.amenities.amenities.length > 0
                    ? masterData.amenities.amenities.map(data => {
                        return { ...data, label: data.name }
                    })
                    : []
            setAminityArray(data)
        }
    }, [masterData])

    useEffect(() => {
        if (addressApi.status === 'succeed') {
            dispatch(setLocation())
            if (addressApi.type === 'GET_LOCATION_BASIC_DETAILS') {
                const countryId = addressApi?.locationBasicDetails?.locationAddress?.countryId
                const stateId = addressApi?.locationBasicDetails?.locationAddress?.stateId
                const cityId = addressApi?.locationBasicDetails?.locationAddress?.cityId
                if (countryId !== undefined && stateId !== undefined && cityId !== undefined) {
                    setAddressIdData({ countryId, stateId, cityId })
                    const addressData = { countryId, stateId, cityId }
                    dispatch(getLocationAddressById(addressData))
                }
                setDefaultPinCode(addressApi?.locationBasicDetails?.locationAddress?.pincode)
                setDefaultAddress(addressApi?.locationBasicDetails?.locationAddress?.address)
            }

            if (addressApi.type === 'GET_LOCATION_ADDRESS_DETAILS') {
                Promise.all([dispatch(setLocation()), dispatch(countriesApi())]).then(() => {
                    setLoading(false)
                })
            }
        }

        if (
            defaultCountryIsSet === false &&
            addressApi.status === 'succeed' &&
            addressApi.type === 'COUNTRIES_API' &&
            addressApi.country.length > 0
        ) {
            dispatch(setLocation())
            let data = addressApi.country.map((x, index) => ({ ...x, label: x.name }))
            let countryData = data.find(
                data =>
                    data.countryId === addressApi?.locationBasicDetails?.locationAddress?.countryId
            )
            setDefaultCountryArray(data)
            setDefaultCountry(countryData)
            if (countryData !== undefined) {
                dispatch(stateApi(countryData.countryId))
            }
            setDefaultCountryIsSet(true)
        }

        if (
            defaultStateIsSet === false &&
            addressApi.status === 'succeed' &&
            addressApi.type === 'STATES_API' &&
            addressApi.state.length > 0
        ) {
            dispatch(setLocation())
            let data = addressApi.state.map((x, index) => ({ ...x, label: x.name }))
            const stateId = addressApi.locationBasicDetails.locationAddress?.stateId
            let stateData = data.find(data => {
                return data.stateId === stateId
            })
            setDefaultState(stateData)
            setDefaultStateArray(data)
            if (stateId !== undefined) {
                dispatch(cityApi(stateId))
            }
            setDefaultStateIsSet(true)
        }

        if (
            defaultCityIsSet === false &&
            addressApi.status === 'succeed' &&
            addressApi.type === 'CITIES_API' &&
            addressApi.city.length > 0
        ) {
            dispatch(setLocation())
            let data = addressApi.city.map((x, index) => ({ ...x, label: x.name }))
            const cityId = addressApi?.locationBasicDetails?.locationAddress?.cityId
            let cityData = data.find(data => {
                return data.cityId === cityId
            })
            setDefaultCity(cityData)
            setDefaultCityArray(data)
            setDefaultCityIsSet(true)
        }
    }, [addressApi])

    const renderStep = step => {
        switch (step) {
            case 0:
                return <LocationBasicDetail data={state} />
            case 1:
                return <LocationAddressDetail data={state} />
            case 2:
                return <LocationProtfolioDetail data={state} />
            case 3:
                return <LocationChargeDetails data={state} />
            default:
                return null
        }
    }

    const next = () => {
        setCurrentStep(currentStep + 1)
    }
    const prev = () => setCurrentStep(currentStep - 1)
    return (
        <>
            <div className='container'>
                <BackButton
                    onClick={() => {
                        navigate('/dashboard')
                    }}
                />
                <div className='max-w-730 mx-auto'>
                    <Provider
                        value={{
                            next,
                            prev,
                            basicDetailInitialState,
                            setBasicDetailInitial,
                            locationProfileInitialState,
                            defaultCountry,
                            defaultState,
                            defaultCity,
                            defaultCountryArray,
                            defaultStateArray,
                            defaultcityArray,
                            defaultCountryIsSet,
                            defaultStateIsSet,
                            defaultCityIsSet,
                            defaultAddress,
                            defaultPinCode,
                            defaultLocationHubArray,
                            aminityArray,
                            addressIdData,
                        }}
                    >
                        <Stepper
                            steps={[
                                { label: 'Basic details' },
                                { label: 'Address details' },
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
        </>
    )
}

export default IsLoadingHOC(DetailLocation)
