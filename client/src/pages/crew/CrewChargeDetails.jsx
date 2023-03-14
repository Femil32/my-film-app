import React, { useContext, useEffect, useRef, useState } from 'react'
import { Edit, Info } from '../../components/AllSvgs'
import {
    ATag,
    ButtonTag,
    Checkbox,
    InputTag,
    LabelTag,
    MultiLineInputTag,
    PTag,
} from '../../components/designComponents/MicroComponents'
import { Formik, Form, FieldArray, Field } from 'formik'
import * as Yup from 'yup'
import Select from 'react-select'
import InputError from '../../components/common/InputError'
import { useDispatch, useSelector } from 'react-redux'
import {
    crewRateTerm,
    crewRateTermsByProfileId,
    getCrewRateTerm,
    setCrew,
} from '../../store/crew/slice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import CustomLoader from '../../components/customLoader'
import { AllTaxes } from '../../store/masterdata/slice'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'
//icons
import { MdDelete } from 'react-icons/md'
import { commonMsg, crewMsg } from '../../components/common/ValidationConstants'

const CrewChargeDetails = ({ setLoading, data }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const masterData = useSelector(state => state.masterdata)
    const crew = useSelector(state => state.crew)

    const [taxes, setTaxes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [validation, setValidation] = useState({})
    const [dynamicVal, setDynamicVal] = useState({})
    const [dynamicRateandTerms, setDynamicRateandTerms] = useState([])

    // cancel policy states
    const [isSelectAddCancle, setIsSelectAddCancle] = useState(false)
    const [currentCancle, setCurrentCancle] = useState(null)

    // cancel policy states
    const [isSelectAddon, setIsSelectAddon] = useState(false)
    const [currentAddon, setCurrentAddon] = useState(null)

    useEffect(() => {
        Promise.all([
            dispatch(crewRateTermsByProfileId(data?.profile?.profileId)),
            dispatch(AllTaxes()),
        ]).finally(() => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        switch (masterData.status) {
            case 'succeed':
                switch (masterData.type) {
                    case 'GET_TAXES':
                        {
                            let temp = []
                            masterData?.taxes.map((data, index) => {
                                temp.push({
                                    label: data?.taxValue,
                                    value: data?.taxValue,
                                    id: data?.taxValue,
                                })
                            })
                            setTaxes(temp)
                        }
                        break
                }
                break
        }
    }, [masterData])

    useEffect(() => {
        switch (crew.status) {
            case 'failed':
                dispatch(setCrew())
            case 'succeed':
                switch (crew.type) {
                    case 'CREW_RATE_TERM':
                        dispatch(setCrew())
                        toast.success(crewMsg.crewChargeDetail)
                        navigate('/dashboard')
                        break
                    case 'RATE_TERM_LABLE':
                        // set validation
                        setDynamicRateandTerms(crew?.rateAndTermLabel)
                        let tmpErr = {}
                        crew?.rateAndTermLabel.map((data, index) => {
                            tmpErr[data.rateType] = Yup.number()
                                .required(`Enter ${data.rateType}`)
                                .moreThan(0, obj => {
                                    return `${obj.path} cannot be less than ${obj.more}`
                                })
                        })
                        setValidation(tmpErr)
                        dispatch(setCrew())
                        dispatch(getCrewRateTerm(data?.profile?.profileId))
                        break
                    case 'GET_CREW_RATE_TERM':
                        let tmpVal = {}
                        // initial value
                        crew?.rateAndTermLabel.map((data, index) => {
                            tmpVal[data.rateType] = crew.rateAndTerm[data.rateType] ?? ''
                        })
                        setDynamicVal(tmpVal)
                        dispatch(setCrew())
                        break
                }
                break
        }
    }, [crew])

    const onSubmitForm = values => {
        let payload = {
            taxes: values.taxes.value,
            onShotAmount: values.advncedPay,
            beforeShootAmount: values.ondelivery,
            creditDays: values.creditepriod,
            minConveyanceCharge: values.conveyancechargesmin,
            maxConveyanceCharge: values.conveyancechargesmax,
            nightShiftAllowance: values.nigntshiftallowns,
            terms: values.termandcondition,
        }

        // policies
        let policies = []
        values.collectionpolicy?.map((data, index) => {
            policies.push({
                refundpercent: data.refundpercent,
                days: data.days,
            })
        })
        payload['policies'] = policies

        // additionalCharges
        let additionalCharges = []
        values.addons?.map((data, index) => {
            additionalCharges.push({
                chargeDescription: data.chargeDescription,
                chargeCost: data.chargeCost,
                isMandatory: data.isMandatory,
            })
        })
        payload['additionalCharges'] = additionalCharges
        crew?.rateAndTermLabel.map((term, i) => {
            payload[term.rateType] = values[term.rateType]
        })

        dispatch(
            crewRateTerm({
                id: data?.profile?.profileId,
                payload,
            })
        )
    }

    const DeleteSocialProfileAlert = (index, arrayHelpers) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You won't be able to undo this!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(result => {
            if (result.isConfirmed) {
                arrayHelpers.remove(index)
            }
        })
    }

    return (
        <>
            {isLoading && <CustomLoader />}
            {!isLoading && (
                <div className='max-w-625 mx-auto'>
                    <PTag classes={'text-dark-blue fw-bold fn-16 mb-3'} texts={'Charge Details'} />
                    <PTag classes={'text-dark-blue fw-bold mb-2'} texts={'Add Charges'} />
                    <div className='d-flex align-items-center mb-2'>
                        <Info width={'20'} />
                        <PTag classes={'text-red ms-2'} texts={'Rates can be negotiated'} />
                    </div>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            taxes: crew?.rateAndTerm?.taxes
                                ? {
                                    label: crew?.rateAndTerm?.taxes ?? '',
                                    value: crew?.rateAndTerm?.taxes ?? '',
                                }
                                : '',
                            advncedPay: crew?.rateAndTerm?.onShotAmount ?? '',
                            ondelivery: crew?.rateAndTerm?.beforeShootAmount ?? '',
                            creditepriod: crew?.rateAndTerm?.creditDays ?? '',
                            conveyancechargesmax: crew?.rateAndTerm?.maxConveyanceCharge ?? '',
                            conveyancechargesmin: crew?.rateAndTerm?.minConveyanceCharge ?? '',
                            nigntshiftallowns: crew?.rateAndTerm?.nightShiftAllowance ?? '',
                            addons: crew?.rateAndTerm?.additionalCharges ?? [],
                            isaddons: false,
                            collectionpolicy: crew?.rateAndTerm?.policies ?? [],
                            termandcondition: crew?.rateAndTerm?.terms ?? '',
                            arrayDescription: crew?.rateAndTerm?.nightShiftAllowance ?? '',
                            arrayAmount: '',
                            arrayCollacationShoot: '',
                            refundpercent: '',
                            ...dynamicVal,
                        }}
                        validationSchema={Yup.object().shape({
                            rateFeatured: Yup.string(),
                            advncedPay: Yup.number()
                                .moreThan(0, obj => {
                                    return `Advanced payment cannot be less than ${obj.more}`
                                })
                                .lessThan(100, obj => {
                                    return `Advanced payment cannot be more than ${obj.less - 1}`
                                })
                                .required('Enter advanced payment'),
                            ondelivery: Yup.number()
                                .moreThan(0, obj => {
                                    return `On delivery cannot be less than ${obj.more}`
                                })
                                .lessThan(100, obj => {
                                    return `On delivery cannot be more than ${obj.less - 1}`
                                })
                                .required('Enter on delivery'),
                            creditepriod: Yup.number()
                                .moreThan(0, obj => {
                                    return `Credit period cannot be less than ${obj.more}`
                                })
                                .required('Enter Credit period pay'),
                            conveyancechargesmax: Yup.number(),
                            //    .moreThan(0, obj => {
                            //        return `${obj.path} cannot be less than ${obj.more}`
                            //    })
                            //    .required('Enter conveyance charges max'),
                            conveyancechargesmin: Yup.number(),
                            //    .moreThan(0, obj => {
                            //        return `${obj.path} cannot be less than ${obj.more}`
                            //    })
                            //    .required('Enter conveyance charges min'),
                            nigntshiftallowns: Yup.number(),
                            //    .moreThan(0, obj => {
                            //        return `${obj.path} cannot be less than ${obj.more}`
                            //    })
                            //    .required('Enter conveyance charges min'),
                            isaddons: Yup.boolean().required('addons required'),
                            addons: Yup.array().when('isaddons', (isaddons, schema) => {
                                if (isaddons === false) {
                                    return schema
                                } else {
                                    return schema
                                        .min(1, 'addons required')
                                        .required('addons required')
                                }
                            }),
                            taxes: Yup.object()
                                .shape({
                                    label: Yup.string().required('Enter texes'),
                                    value: Yup.string().required('Enter texes'),
                                })
                                .required('Enter texes'),
                            collectionpolicy: Yup.array(),
                            termandcondition: Yup.string()
                                .matches(/^(?!.*^\s*$)/, `can't be Empty.`)
                                .required('Enter term and condition'),
                            arrayDescription: Yup.string().matches(
                                /^(?!.*^\s*$)/,
                                `can't be Empty.`
                            ),
                            arrayAmount: Yup.number().moreThan(0, obj => {
                                return `${obj.path} cannot be less than ${obj.more}`
                            }),
                            refundpercent: Yup.number()
                                .moreThan(0, obj => {
                                    return `${obj.path} cannot be less than ${obj.more}`
                                })
                                .lessThan(101, obj => {
                                    return `${obj.path} cannot be more than ${obj.less - 1}`
                                }),
                            arrayCollacationShoot: Yup.number().moreThan(0, obj => {
                                return `${obj.path} cannot be less than ${obj.more}`
                            }),
                            ...validation,
                        })}
                        onSubmit={values => {
                            onSubmitForm(values)
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            setFieldValue,
                        }) => (
                            <Form
                                onSubmit={handleSubmit}
                                className='d-flex flex-column justify-content-between h-100'
                            >
                                <div className='row'>
                                    {dynamicRateandTerms.map((data, index) => (
                                        <div className='col-lg-6' key={index}>
                                            <div
                                                className={`sign-input ${errors[data.rateType] && touched[data.rateType]
                                                    ? `error-inputs `
                                                    : ``
                                                    }mb-3`}
                                            >
                                                <LabelTag
                                                    classes={'text-gray fn-12 mb-2'}
                                                    text={data.rateLabel}
                                                    For={data.rateType}
                                                />
                                                <div className='d-flex position-relative'>
                                                    <PTag
                                                        classes={
                                                            'text-dark-blue fw-bold fn-20 me-2 input-add-icon-left'
                                                        }
                                                        texts={'₹'}
                                                    />
                                                    <Field
                                                        className={
                                                            'w-100 form-control input-plachholder-paddingleft'
                                                        }
                                                        id={data.rateType}
                                                        placeholder={'Enter feature films '}
                                                        type='number'
                                                        name={data.rateType}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values[data.rateType]}
                                                        defaultValue={values[data.rateType]}
                                                    />
                                                </div>
                                                {errors[data.rateType] && touched[data.rateType] ? (
                                                    <div className='d-flex align-items-center mt-2'>
                                                        <InputError
                                                            className='input-error'
                                                            errorTitle={errors[data.rateType]}
                                                        />
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    ))}
                                    <div className='col-lg-6 couponselect'>
                                        <div
                                            className={`sign-input ${errors.taxes && touched.taxes ? `error-inputs ` : ``
                                                }mb-3`}
                                        >
                                            <LabelTag
                                                classes={'text-gray fn-12 mb-2'}
                                                text={'Taxes'}
                                                For={'taxes'}
                                            />
                                            <Select
                                                id={'taxes'}
                                                className='form-control p-0'
                                                options={taxes}
                                                name={'taxes'}
                                                placeholder='Select Taxes'
                                                value={values.taxes}
                                                defaultValue={taxes}
                                                onChange={e => {
                                                    if (e !== undefined) {
                                                        setFieldValue('taxes', {
                                                            label: e.label,
                                                            value: e.label,
                                                        })
                                                    }
                                                }}
                                                onBlur={handleBlur('taxes')}
                                            />
                                            {errors?.taxes?.label && touched?.taxes ? (
                                                <div className='d-flex align-items-center mt-2'>
                                                    <InputError
                                                        className='input-error'
                                                        errorTitle={errors?.taxes?.label}
                                                    />
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <PTag
                                        classes={'text-dark-blue fw-bold mt-3 mb-2'}
                                        texts={'Payment Terms'}
                                    />
                                    <div className='d-flex align-items-center mb-2'>
                                        <Info width={'20'} />
                                        <PTag
                                            classes={'text-red ms-2'}
                                            texts={'Payment Terms can be negotiated'}
                                        />
                                    </div>
                                    <div className='col-lg-6'>
                                        <div
                                            className={`sign-input ${errors.advncedPay && touched.advncedPay
                                                ? `error-inputs `
                                                : ``
                                                }mb-3`}
                                        >
                                            <LabelTag
                                                classes={'text-gray fn-12 mb-2'}
                                                text={'Advance to be paid'}
                                                For={'advncedPay'}
                                            />
                                            <div className='d-flex position-relative'>
                                                <InputTag
                                                    classes={
                                                        'w-100 form-control input-plachholder-paddingright'
                                                    }
                                                    type='number'
                                                    placeholder={'Enter advance to be paid'}
                                                    name={'advncedPay'}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur('advncedPay')}
                                                    value={values.advncedPay}
                                                />
                                                <PTag
                                                    classes={
                                                        'text-dark-blue white-space-nowrap fw-bold fn-20 me-2 input-add-icon-right'
                                                    }
                                                    texts={'%'}
                                                />
                                            </div>
                                            {errors.advncedPay && touched.advncedPay ? (
                                                <div className='d-flex align-items-center mt-2'>
                                                    <InputError
                                                        className='input-error'
                                                        errorTitle={errors.advncedPay}
                                                    />
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div
                                            className={`sign-input ${errors.ondelivery && touched.ondelivery
                                                ? ` error-inputs `
                                                : ``
                                                } mb-3`}
                                        >
                                            <LabelTag
                                                classes={'text-gray fn-12 mb-2'}
                                                text={'On Delivery'}
                                                For={'ondelivery'}
                                            />
                                            <div className='d-flex position-relative'>
                                                <InputTag
                                                    // readOnly
                                                    classes={
                                                        'w-100 form-control input-plachholder-paddingright'
                                                    }
                                                    type='number'
                                                    placeholder={'Enter on delivery'}
                                                    name={'ondelivery'}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.ondelivery}
                                                />
                                                <PTag
                                                    classes={
                                                        'text-dark-blue white-space-nowrap fw-bold fn-20 me-2 input-add-icon-right'
                                                    }
                                                    texts={'%'}
                                                />
                                            </div>
                                            {errors.ondelivery && touched.ondelivery ? (
                                                <div className='d-flex align-items-center mt-2'>
                                                    <InputError
                                                        className='input-error'
                                                        errorTitle={errors.ondelivery}
                                                    />
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`sign-input ${errors.creditepriod && touched.creditepriod
                                        ? ` error-inputs `
                                        : ``
                                        } mb-3 `}
                                >
                                    <LabelTag
                                        classes={'text-gray fn-12 mb-2'}
                                        text={'Credit Period'}
                                        For={'CreditPeriod'}
                                    />
                                    <div className='d-flex position-relative'>
                                        <InputTag
                                            classes={
                                                'w-100 form-control input-plachholder-paddingright'
                                            }
                                            id={'CreditPeriod'}
                                            placeholder={'Enter amount'}
                                            type='number'
                                            name={'creditepriod'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.creditepriod}
                                        />
                                        <PTag
                                            classes={
                                                'text-dark-blue white-space-nowrap fw-bold fn-20 me-2 input-add-icon-right'
                                            }
                                            texts={'days'}
                                        />
                                    </div>
                                    {errors.creditepriod && touched.creditepriod ? (
                                        <div className='d-flex align-items-center mt-2'>
                                            <InputError
                                                className='input-error'
                                                errorTitle={errors.creditepriod}
                                            />
                                        </div>
                                    ) : null}
                                </div>

                                <PTag
                                    classes={'text-dark-blue fw-bold mt-3 mb-2'}
                                    texts={'Additional Charges'}
                                />
                                <div className='row'>
                                    <LabelTag
                                        classes={'text-gray fn-12 mb-2'}
                                        text={'Conveyance Charges'}
                                    />
                                    <div className='col-6'>
                                        <div
                                            className={`sing-input mb-3`}
                                        >
                                            <div className='d-flex position-relative'>
                                                <PTag
                                                    classes={
                                                        'text-dark-blue white-space-nowrap fw-bold fn-20 me-2 input-add-icon-left'
                                                    }
                                                    texts={'₹'}
                                                />
                                                <InputTag
                                                    classes={
                                                        'text-dark-blue fw-bold fn-16 w-100 form-control input-plachholder-paddingleft'
                                                    }
                                                    type='number'
                                                    placeholder={'Minimum'}
                                                    name={'conveyancechargesmin'}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.conveyancechargesmin}
                                                />
                                            </div>
                                            {/* {errors.conveyancechargesmin &&
                                                touched.conveyancechargesmin ? (
                                                <div className='d-flex align-items-center mt-2'>
                                                    <InputError
                                                        className='input-error'
                                                        errorTitle={errors.conveyancechargesmin}
                                                    />
                                                </div>
                                            ) : null} */}
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div
                                            className={`sign-input mb-3`}
                                        >
                                            <div className='d-flex position-relative'>
                                                <PTag
                                                    classes={
                                                        'text-dark-blue white-space-nowrap fw-bold fn-20 me-2 input-add-icon-left'
                                                    }
                                                    texts={'₹'}
                                                />
                                                <InputTag
                                                    classes={
                                                        'text-dark-blue fw-bold fn-16 w-100 form-control input-plachholder-paddingleft'
                                                    }
                                                    type='number'
                                                    placeholder={'Maximum'}
                                                    name={'conveyancechargesmax'}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.conveyancechargesmax}
                                                />
                                            </div>
                                            {/* {errors.conveyancechargesmax &&
                                                touched.conveyancechargesmax ? (
                                                <div className='d-flex align-items-center mt-2'>
                                                    <InputError
                                                        className='input-error'
                                                        errorTitle={errors.conveyancechargesmax}
                                                    />
                                                </div>
                                            ) : null} */}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`sign-input  mb-3`}
                                >
                                    <LabelTag
                                        classes={'text-gray fn-12 mb-2'}
                                        text={'Night Shift Allowance'}
                                        For={'nightShift'}
                                    />
                                    <InputTag
                                        classes={'form-control'}
                                        type={'number'}
                                        value={values.nigntshiftallowns}
                                        id={'nightShift'}
                                        placeholder={'Enter night shift allowance'}
                                        name={'nigntshiftallowns'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {/* {errors.nigntshiftallowns && touched.nigntshiftallowns ? (
                                        <div className='d-flex align-items-center mt-2'>
                                            <InputError
                                                className='input-error'
                                                errorTitle={errors.nigntshiftallowns}
                                            />
                                        </div>
                                    ) : null} */}
                                </div>

                                <div className='d-flex justify-content-between mt-3 add-on-crew'>
                                    <PTag
                                        classes={'texts text-dark-blue fw-bold fn-16 mb-2'}
                                        texts={'Add on'}
                                    />
                                    <div className='mb-2'>
                                        <Checkbox
                                            Checkboxlabel={'Mandatory Charges'}
                                            id={'mandatoryCharges'}
                                            For={'mandatoryCharges'}
                                            name={'isaddons'}
                                            value={values.isaddons}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            classes={'px-0'}
                                        />
                                    </div>
                                </div>

                                <FieldArray
                                    name='addons'
                                    render={arrayHelpers => {
                                        const addonsArray = values.addons
                                        return (
                                            <>
                                                <div
                                                    className={`sign-input ${errors.arrayDescription &&
                                                        touched.arrayDescription
                                                        ? ` error-inputs `
                                                        : ``
                                                        } mb-3`}
                                                >
                                                    <LabelTag
                                                        classes={'text-gray fn-12 mb-2'}
                                                        text={'Description'}
                                                        For={'description'}
                                                    />
                                                    <MultiLineInputTag
                                                        id={'description'}
                                                        placeholder={'Enter description'}
                                                        name={'arrayDescription'}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.arrayDescription}
                                                        pattern='/^(?!.*^\s*$)/'
                                                    />
                                                    {errors.arrayDescription &&
                                                        touched.arrayDescription ? (
                                                        <div className='d-flex align-items-center mt-2'>
                                                            <InputError
                                                                className='input-error'
                                                                errorTitle={errors.arrayDescription}
                                                            />
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div
                                                    className={`sign-input ${errors.arrayAmount && touched.arrayAmount
                                                        ? ` error-inputs `
                                                        : ``
                                                        } mb-3`}
                                                >
                                                    <LabelTag
                                                        classes={'text-gray fn-12 mb-2'}
                                                        text={'Amount'}
                                                        For={'amount'}
                                                    />
                                                    <div className='d-flex position-relative'>
                                                        <PTag
                                                            classes={
                                                                'text-dark-blue fw-bold fn-20 me-2 input-add-icon-left'
                                                            }
                                                            texts={'₹'}
                                                        />
                                                        <InputTag
                                                            id={'amount'}
                                                            classes={
                                                                'w-100 form-control input-plachholder-paddingleft'
                                                            }
                                                            type='number'
                                                            placeholder={'Enter amount'}
                                                            name={'arrayAmount'}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.arrayAmount}
                                                        />
                                                    </div>
                                                    {errors.arrayAmount && touched.arrayAmount ? (
                                                        <div className='d-flex align-items-center mt-2'>
                                                            <InputError
                                                                className={'input-error'}
                                                                errorTitle={errors.arrayAmount}
                                                            />
                                                        </div>
                                                    ) : null}
                                                </div>
                                                {errors.addons && touched.addons ? (
                                                    <div className='d-flex align-items-center mb-2'>
                                                        <InputError
                                                            className={'input-error'}
                                                            errorTitle={errors.addons}
                                                        />
                                                    </div>
                                                ) : null}
                                                <div className='mb-4 text-center'>
                                                    <ButtonTag
                                                        classes={'btn-orange'}
                                                        value={isSelectAddon ? 'Update' : 'Add'}
                                                        onClick={e => {
                                                            e.preventDefault()
                                                            if (
                                                                values.arrayDescription &&
                                                                values.arrayAmount
                                                            ) {
                                                                if (isSelectAddon) {
                                                                    arrayHelpers.replace(
                                                                        currentAddon,
                                                                        {
                                                                            chargeDescription:
                                                                                values.arrayDescription,
                                                                            chargeCost:
                                                                                values.arrayAmount,
                                                                            isMandatory:
                                                                                values.isaddons,
                                                                        }
                                                                    )
                                                                } else {
                                                                    arrayHelpers.push({
                                                                        chargeDescription:
                                                                            values.arrayDescription,
                                                                        chargeCost:
                                                                            values.arrayAmount,
                                                                        isMandatory:
                                                                            values.isaddons,
                                                                    })
                                                                }
                                                                setFieldValue(
                                                                    'arrayDescription',
                                                                    ''
                                                                )
                                                                setFieldValue('arrayAmount', '')
                                                                setFieldValue('isaddons', false)
                                                                setCurrentAddon(null)
                                                            } else {
                                                                toast.error(commonMsg.validDetails)
                                                            }

                                                            isSelectAddon && setIsSelectAddon(false)
                                                        }}
                                                    />
                                                </div>

                                                {addonsArray.length > 0 && (
                                                    <PTag
                                                        classes={
                                                            'texts text-dark-blue fw-bold fn-16 mb-2'
                                                        }
                                                        texts={'All add on'}
                                                    />
                                                )}
                                                {addonsArray.map((element, index) => (
                                                    <div
                                                        className='mb-3 form-control p-3 overflow-hidden d-flex'
                                                        key={index}
                                                    >
                                                        <div className='flex-grow-1'>
                                                            <div className='d-flex flex-column justify-content-between'>
                                                                <p className='text-wrap'>
                                                                    <span className='text-dark-blue fw-bold'>
                                                                        Desciption :{' '}
                                                                    </span>
                                                                    <span
                                                                        style={{
                                                                            wordBreak: 'break-all',
                                                                        }}
                                                                    >
                                                                        {element.chargeDescription}
                                                                    </span>
                                                                </p>
                                                                <p className='text-wrap'>
                                                                    <span className='text-dark-blue fw-bold'>
                                                                        Amount :{' '}
                                                                    </span>
                                                                    <span
                                                                        style={{
                                                                            wordBreak: 'break-all',
                                                                        }}
                                                                    >
                                                                        {element.chargeCost}
                                                                    </span>
                                                                </p>
                                                                <p className='text-wrap text-capitalize'>
                                                                    <span className='text-dark-blue fw-bold'>
                                                                        Mandatory Charges :{' '}
                                                                    </span>
                                                                    <span
                                                                        style={{
                                                                            wordBreak: 'break-all',
                                                                        }}
                                                                    >
                                                                        {JSON.stringify(
                                                                            element.isMandatory
                                                                        )}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className='pr-4'>
                                                            <div className='d-flex align-items-center'>
                                                                <div className='me-2'>
                                                                    <ATag
                                                                        children={
                                                                            <Edit width={'24'} />
                                                                        }
                                                                        onClick={() => {
                                                                            setFieldValue(
                                                                                'arrayDescription',
                                                                                element.chargeDescription
                                                                            )
                                                                            setFieldValue(
                                                                                'arrayAmount',
                                                                                element.chargeCost
                                                                            )
                                                                            setFieldValue(
                                                                                'isaddons',
                                                                                element.isMandatory
                                                                            )
                                                                            setIsSelectAddon(true)
                                                                            setCurrentAddon(index)
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <ATag
                                                                        children={
                                                                            <MdDelete
                                                                                className={
                                                                                    'Md-Delete'
                                                                                }
                                                                                onClick={() =>
                                                                                    DeleteSocialProfileAlert(
                                                                                        index,
                                                                                        arrayHelpers
                                                                                    )
                                                                                }
                                                                            />
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        )
                                    }}
                                />

                                <PTag
                                    classes={'text-dark-blue fw-bold fn-16 my-2'}
                                    texts={'Cancellation Policy'}
                                />

                                <FieldArray
                                    name='collectionpolicy'
                                    render={arrayHelpers => {
                                        const collectionpolicyArray = values.collectionpolicy
                                        return (
                                            <>
                                                <div className='row'>
                                                    <div className='col-lg-6'>
                                                        <div
                                                            className={`sign-input ${errors.refundpercent &&
                                                                touched.refundpercent
                                                                ? ` error-inputs `
                                                                : ``
                                                                } mb-3`}
                                                        >
                                                            <LabelTag
                                                                classes={'text-gray fn-12 mb-2'}
                                                                text={'Refund'}
                                                                For={'Refund'}
                                                            />
                                                            <div className='d-flex position-relative'>
                                                                <InputTag
                                                                    classes={
                                                                        'w-100 form-control input-plachholder-paddingright'
                                                                    }
                                                                    id={'Refund'}
                                                                    placeholder={'Enter refund'}
                                                                    name={'refundpercent'}
                                                                    type='number'
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.refundpercent}
                                                                />
                                                                <PTag
                                                                    classes={
                                                                        'text-dark-blue fw-bold fn-20 me-2 input-add-icon-right'
                                                                    }
                                                                    texts={'%'}
                                                                />
                                                            </div>
                                                            {errors.refundpercent &&
                                                                touched.refundpercent ? (
                                                                <div className='d-flex align-items-center mt-2'>
                                                                    <InputError
                                                                        className={'input-error'}
                                                                        errorTitle={
                                                                            errors.refundpercent
                                                                        }
                                                                    />
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-6'>
                                                        <div
                                                            className={`sign-input ${errors.arrayCollacationShoot &&
                                                                touched.arrayCollacationShoot
                                                                ? ` error-inputs `
                                                                : ``
                                                                } mb-3`}
                                                        >
                                                            <LabelTag
                                                                classes={'text-gray fn-12 mb-2'}
                                                                text={
                                                                    'Cancellation Days Before shoot'
                                                                }
                                                                For={'arrayCollacationShootCrew'}
                                                            />
                                                            <InputTag
                                                                id={'arrayCollacationShootCrew'}
                                                                classes={'w-100 form-control'}
                                                                placeholder={'Cancellation Days'}
                                                                name={'arrayCollacationShoot'}
                                                                type='number'
                                                                onChange={e => {
                                                                    setFieldValue(
                                                                        'arrayCollacationShoot',
                                                                        e.target.value
                                                                    )
                                                                    handleChange
                                                                }}
                                                                onBlur={handleBlur}
                                                                value={values.arrayCollacationShoot}
                                                            />
                                                            {errors.arrayCollacationShoot &&
                                                                touched.arrayCollacationShoot ? (
                                                                <div className='d-flex align-items-center mt-2 '>
                                                                    <InputError
                                                                        className={'input-error'}
                                                                        errorTitle={
                                                                            errors.arrayCollacationShoot
                                                                        }
                                                                    />
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    {/* {errors.collectionpolicy &&
                                                        touched.collectionpolicy ? (
                                                        <div className='d-flex align-items-center mb-2'>
                                                            <InputError
                                                                className='input-error'
                                                                errorTitle={errors.collectionpolicy}
                                                            />
                                                        </div>
                                                    ) : null} */}
                                                </div>
                                                <div className='mb-4 text-center'>
                                                    <ButtonTag
                                                        classes={'btn-orange'}
                                                        value={isSelectAddCancle ? 'Update' : 'Add'}
                                                        onClick={e => {
                                                            e.preventDefault()
                                                            if (
                                                                values.arrayCollacationShoot !==
                                                                undefined &&
                                                                values.refundpercent !== ''
                                                            ) {
                                                                if (isSelectAddCancle) {
                                                                    arrayHelpers.replace(
                                                                        currentCancle,
                                                                        {
                                                                            days: values.arrayCollacationShoot,
                                                                            refundpercent:
                                                                                values.refundpercent,
                                                                        }
                                                                    )
                                                                } else {
                                                                    arrayHelpers.push({
                                                                        days: values.arrayCollacationShoot,
                                                                        refundpercent:
                                                                            values.refundpercent,
                                                                    })
                                                                }
                                                                setFieldValue('refundpercent', '')
                                                                setFieldValue(
                                                                    'arrayCollacationShoot',
                                                                    ''
                                                                )
                                                                setCurrentCancle(null)
                                                            } else {
                                                                toast.error(commonMsg.validDetails)
                                                            }

                                                            isSelectAddCancle &&
                                                                setIsSelectAddCancle(false)
                                                        }}
                                                    />
                                                </div>

                                                {collectionpolicyArray.length > 0 && (
                                                    <PTag
                                                        classes={
                                                            'text-dark-blue fw-bold fn-16 mb-2'
                                                        }
                                                        texts={'All Cancellation Policy'}
                                                    />
                                                )}
                                                {collectionpolicyArray.map((element, index) => (
                                                    <div
                                                        className='mb-3 form-control p-3 overflow-hidden d-flex'
                                                        key={index}
                                                    >
                                                        <div className='flex-grow-1'>
                                                            <div className='d-flex flex-column justify-content-between'>
                                                                <p className='text-wrap'>
                                                                    <span className='text-dark-blue fw-bold'>
                                                                        Refund :{' '}
                                                                    </span>
                                                                    <span
                                                                        style={{
                                                                            wordBreak: 'break-all',
                                                                        }}
                                                                    >
                                                                        {element.refundpercent}
                                                                    </span>
                                                                </p>
                                                                <p className='text-wrap'>
                                                                    <span className='text-dark-blue fw-bold'>
                                                                        Cancellation Days :{' '}
                                                                    </span>
                                                                    <span
                                                                        style={{
                                                                            wordBreak: 'break-all',
                                                                        }}
                                                                    >
                                                                        {element.days}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className='pr-4'>
                                                            <div className='d-flex align-items-center'>
                                                                <div className='me-2'>
                                                                    <ATag
                                                                        children={
                                                                            <Edit width={'24'} />
                                                                        }
                                                                        onClick={() => {
                                                                            setFieldValue(
                                                                                'refundpercent',
                                                                                element.refundpercent
                                                                            )
                                                                            setFieldValue(
                                                                                'arrayCollacationShoot',
                                                                                element.days
                                                                            )
                                                                            setIsSelectAddCancle(
                                                                                true
                                                                            )
                                                                            setCurrentCancle(index)
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <ATag
                                                                        children={
                                                                            <MdDelete
                                                                                className={
                                                                                    'Md-Delete'
                                                                                }
                                                                                onClick={() =>
                                                                                    DeleteSocialProfileAlert(
                                                                                        index,
                                                                                        arrayHelpers
                                                                                    )
                                                                                }
                                                                            />
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        )
                                    }}
                                />

                                <div
                                    className={`sign-input ${errors.termandcondition && touched.termandcondition
                                        ? ` error-inputs `
                                        : ``
                                        }mb-3`}
                                >
                                    <LabelTag
                                        classes={'text-gray fn-12 mb-2'}
                                        text={'Terms & Condition'}
                                        For={'termsCondition'}
                                    />
                                    <MultiLineInputTag
                                        id={'termsCondition'}
                                        placeholder={'Enter terms & condition'}
                                        name={'termandcondition'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.termandcondition}
                                    />

                                    {errors.termandcondition && touched.termandcondition ? (
                                        <div className='d-flex align-items-center mt-2'>
                                            <InputError
                                                className='input-error'
                                                errorTitle={errors.termandcondition}
                                            />
                                        </div>
                                    ) : null}
                                </div>

                                <div className='col-3 mx-auto mb-4'>
                                    <ButtonTag
                                        classes={'btn-orange w-100'}
                                        value={'Submit'}
                                        type={'submit'}
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            )}
        </>
    )
}

export default IsLoadingHOC(CrewChargeDetails)
