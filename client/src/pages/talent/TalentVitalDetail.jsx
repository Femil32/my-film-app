import React, { useContext, useEffect, useState } from 'react'

import { FormikProvider, FieldArray, useFormik } from 'formik'
import * as Yup from 'yup'
import {
    ButtonTag,
    InputTag,
    LabelTag,
    PTag,
} from '../../components/designComponents/MicroComponents'
import Select from 'react-select'
import InputError from '../../components/common/InputError'

import TalentContext from './TalentContext'
import { useDispatch, useSelector } from 'react-redux'
import {
    vitalDetailsApi,
    setTalent,
    getVitalDetailsApi,
    getHairColors,
    getEyeColors,
    getHairTypes,
} from '../../store/talent/slice'
import { toast } from 'react-toastify'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'

// icons
import { MdClose } from 'react-icons/md'
import { FiTag } from 'react-icons/fi'
import { commonMsg, talentMsg } from '../../components/common/ValidationConstants'
import { minInputRange, setDropOptions } from '../../helpers/functions'

const TalantVitalDetail = ({ setLoading, data }) => {
    const { next } = useContext(TalentContext)
    const [isLoading, setIsLoading] = useState(false)
    const [dynamicFields, setDynamicFields] = useState([])
    const [dynamicValidation, setDynamicValidation] = useState({})

    const [hairType, setHairType] = useState([])
    const [hairColor, setHairColor] = useState([])
    const [eyeColor, setEyeColor] = useState([])

    const dispatch = useDispatch()

    const talentProfile = useSelector(store => store.talent)

    useEffect(() => {
        Promise.allSettled([
            dispatch(getHairColors()),
            dispatch(getEyeColors()),
            dispatch(getHairTypes()),
        ])
            .then(() => {
                setDynamicFields(talentProfile?.dynamicFields?.credentials)
                let tmpValidation = {}
                talentProfile?.dynamicFields?.credentials.map((data, index) => {
                    if (data.isMandatory) {
                        data.fieldType === 'string' &&
                            (tmpValidation[data.fieldName] = Yup.string().required(
                                `Please enter ${data.fieldName}`
                            ))
                        data.fieldType === 'number' &&
                            (tmpValidation[data.fieldName] = minInputRange(data.fieldName, 0))
                        data.fieldType === 'array' &&
                            (tmpValidation[data.fieldName] = Yup.array()
                                .min(1)
                                .required(`Please enter ${data.fieldName}`))
                        data.fieldType === 'multitags' &&
                            (tmpValidation[data.fieldName] = Yup.array()
                                .min(1)
                                .required(`Please enter ${data.fieldName}`))
                    }
                })
                setDynamicValidation(tmpValidation)

                dispatch(setTalent())
                dispatch(getVitalDetailsApi(data?.profile?.profileId))
            })
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        switch (talentProfile.status) {
            case 'succeed':
                switch (talentProfile.type) {
                    case 'VITAL_API':
                        dispatch(setTalent())
                        toast.success(talentMsg.vitalDetail)
                        next()
                        break
                    case 'GET_HAIR_TYPES':
                        setHairType(talentProfile?.hairTypes?.map(data => setDropOptions(data, 'hairType', 'hairType')))
                        break
                    case 'GET_HAIR_COLORS':
                        setHairColor(talentProfile?.hairColors?.map(data => setDropOptions(data, 'hairColor', 'hairColor')))
                        break
                    case 'GET_EYE_COLORS':
                        setEyeColor(talentProfile?.eyeColors?.map(data => setDropOptions(data, 'eyeColor', 'eyeColor')))
                        break
                    case 'GET_VITAL_DETAIL':
                        dynamicFields.map(data => {
                            if (data.fieldType === 'string' || data.fieldType === 'number') {
                                formik.setFieldValue(
                                    data?.fieldName,
                                    talentProfile?.vitalDetails[data?.fieldName] ?? ''
                                )
                            } else if (data.fieldType === 'array') {
                                let temp = []
                                talentProfile?.vitalDetails[data?.fieldName].map((x, i) =>
                                    temp.push({ label: x, value: x })
                                )
                                formik.setFieldValue(data?.fieldName, temp.length > 0 ? temp : [])
                            } else if (data.fieldType === 'multitags') {
                                formik.setFieldValue(
                                    data?.fieldName,
                                    talentProfile?.vitalDetails[data?.fieldName] ?? []
                                )
                            }
                        })
                        break
                }
                break
        }
    }, [talentProfile])

    const formik = useFormik({
        initialValues: {
            ...dynamicFields,
        },
        validationSchema: Yup.object().shape({
            ...dynamicValidation,
        }),
        onSubmit: values => {
            onSubmitForm(values)
        },
    })

    const onSubmitForm = values => {
        const payload = {}
        dynamicFields?.map(data => {
            if (data?.fieldType === 'string' || data?.fieldType === 'number') {
                payload[data.fieldName] = values[data.fieldName]
            } else if (data?.fieldType === 'array') {
                let temp = []
                values[data.fieldName].map((name) => {
                    temp.push(name.value)
                })
                payload[data.fieldName] = temp
            } else if (data?.fieldType === 'multitags') {
                payload[data.fieldName] = values[data.fieldName]
            }
        })



        dispatch(vitalDetailsApi({ id: data?.profile?.profileId, data: payload }))
    }

    return (
        <div className='max-w-625 mx-auto'>
            {/* Vital Details */}
            <PTag classes={'text-dark-blue fw-bold fn-16 mb-3'} texts={'Vitals'} />
            <form
                onSubmit={formik.handleSubmit}
                className='d-flex flex-column justify-content-between h-100'
            >
                <div className='row'>
                    {dynamicFields?.map(data =>
                        (() => {
                            if (data.fieldType === 'string') {
                                return (
                                    <div
                                        className={`col-sm-6 sign-input ${formik.errors[data.fieldName] && formik.touched[data.fieldName] ? `error-inputs ` : ``
                                            }mb-3`}
                                        key={data?.fieldOrder}
                                    >
                                        <LabelTag
                                            classes={'text-gray fn-12 mb-2'}
                                            text={data.fieldLabel}
                                            For={data.fieldName}
                                        />
                                        <InputTag
                                            classes={'form-control mb-2'}
                                            placeholder={`Enter ${data.fieldLabel}`}
                                            id={data.fieldName}
                                            name={data.fieldName}
                                            type={data.fieldType}
                                            value={formik.values[data.fieldName]}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors[data.fieldName] && formik.touched[data.fieldName] && (
                                            <div className='d-flex align-items-center mt-2'>
                                                <InputError
                                                    className='input-error'
                                                    errorTitle={formik.errors[data.fieldName]}
                                                />
                                            </div>
                                        )}
                                    </div>
                                )
                            } else if (data.fieldType === 'number') {
                                return (
                                    <div
                                        className={`col-sm-6 mb-3 sign-input ${formik.errors[data.fieldName] && formik.touched[data.fieldName] ? `error-inputs ` : ``
                                            }mb-3`}
                                        key={data?.fieldOrder}
                                    >
                                        <LabelTag
                                            classes={'text-gray fn-12 mb-2'}
                                            text={data.fieldLabel}
                                            For={data.fieldName}
                                        />
                                        <InputTag
                                            classes={'form-control mb-2'}
                                            placeholder={`Enter ${data.fieldLabel}`}
                                            id={data.fieldName}
                                            name={data.fieldName}
                                            type={data.fieldType}
                                            value={formik.values[data.fieldName]}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors[data.fieldName] && formik.touched[data.fieldName] && (
                                            <div className='d-flex align-items-center mt-2'>
                                                <InputError
                                                    className='input-error'
                                                    errorTitle={formik.errors[data.fieldName]}
                                                />
                                            </div>
                                        )}
                                    </div>
                                )
                            } else if (data.fieldType === 'array') {
                                return (
                                    <FormikProvider value={formik} key={data.fieldOrder}>
                                        <FieldArray
                                            name={data.fieldName}
                                            render={arrayHelpers => {
                                                const temp = formik.values[data.fieldName]
                                                return (
                                                    <>
                                                        <div
                                                            className={`sign-input col-sm-6 ${formik.errors[data.fieldName] && formik.touched[data.fieldName]
                                                                ? ` error-inputs `
                                                                : ``
                                                                } mb-3`}
                                                        >
                                                            <LabelTag
                                                                classes={'text-gray fn-12 mb-2'}
                                                                text={data.fieldLabel}
                                                            />
                                                            <Select
                                                                className='form-control p-0'
                                                                options={
                                                                    data.fieldName === 'eyeColor'
                                                                        ? eyeColor
                                                                        : data.fieldName ===
                                                                            'hairColor'
                                                                            ? hairColor
                                                                            : hairType
                                                                }
                                                                name={data.fieldName}
                                                                isSearchable={false}
                                                                value={
                                                                    formik.values[data.fieldName]
                                                                }
                                                                onBlur={formik.handleBlur(
                                                                    data.fieldName
                                                                )}
                                                                onChange={e => {
                                                                    if (e !== undefined) {
                                                                        arrayHelpers.remove(e)
                                                                        arrayHelpers.push(e)
                                                                    }
                                                                }}
                                                            />
                                                            {formik.errors[data.fieldName] && formik.touched[data.fieldName] && (
                                                                <InputError
                                                                    className='input-error mt-2'
                                                                    errorTitle={
                                                                        formik.errors[
                                                                        data.fieldName
                                                                        ]
                                                                    }
                                                                />
                                                            )}
                                                        </div>
                                                    </>
                                                )
                                            }}
                                        />
                                    </FormikProvider>
                                )
                            } else if (data.fieldType === 'multitags') {
                                return (
                                    <FormikProvider value={formik} key={data.fieldOrder}>
                                        <FieldArray
                                            name={data.fieldName}
                                            render={arrayHelpers => {
                                                const tempArray = formik.values[data.fieldName]
                                                return (
                                                    <div className='col-sm-6'>
                                                        <div
                                                            className={`sign-input ${formik.errors[data.fieldName] && formik.touched[data.fieldName]
                                                                ? `error-inputs `
                                                                : ``
                                                                }mb-3`}
                                                        >
                                                            <LabelTag
                                                                classes={'text-gray fn-12 mb-2'}
                                                                text={data.fieldName}
                                                                For={data.fieldLabel}
                                                            />
                                                            <div className='d-flex position-relative'>
                                                                <FiTag
                                                                    fontSize={20}
                                                                    className={
                                                                        'me-2 input-add-icon-left Fi-Tag'
                                                                    }
                                                                />
                                                                <InputTag
                                                                    placeholder={`Enter ${data.fieldName}`}
                                                                    classes={
                                                                        'form-control input-plachholder-paddingleft'
                                                                    }
                                                                    id={data.fieldName}
                                                                    name={data.fieldName}
                                                                    onBlur={formik.handleBlur(
                                                                        data.fieldName
                                                                    )}
                                                                    onKeyDown={e => {
                                                                        if (e.key === 'Enter') {
                                                                            e.preventDefault()
                                                                            if (
                                                                                e.target.value != ''
                                                                            ) {
                                                                                arrayHelpers.push(
                                                                                    e.target.value
                                                                                )
                                                                                e.target.value = ''
                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                            {formik.errors[data.fieldName] && formik.touched[data.fieldName] && (
                                                                <div className='d-flex align-items-center mt-2'>
                                                                    <InputError
                                                                        className='input-error'
                                                                        errorTitle={
                                                                            formik.errors[
                                                                            data.fieldName
                                                                            ]
                                                                        }
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className='d-flex flex-wrap'>
                                                            {tempArray !== undefined &&
                                                                tempArray.map((element, index) => {
                                                                    return (
                                                                        <div
                                                                            className='btn-dark-blue  me-2 rounded px-3 py-2 mb-2'
                                                                            key={index}
                                                                        >
                                                                            <div
                                                                                className={
                                                                                    'd-flex w-100'
                                                                                }
                                                                            >
                                                                                <PTag
                                                                                    classes={
                                                                                        'bold me-1'
                                                                                    }
                                                                                    texts={element}
                                                                                />
                                                                                <span
                                                                                    onClick={() => {
                                                                                        arrayHelpers.remove(
                                                                                            index
                                                                                        )
                                                                                    }}
                                                                                    role='button'
                                                                                >
                                                                                    <MdClose
                                                                                        fontSize={
                                                                                            20
                                                                                        }
                                                                                        className={
                                                                                            'Md-Close'
                                                                                        }
                                                                                    />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                        </div>
                                                    </div>
                                                )
                                            }}
                                        />
                                    </FormikProvider>
                                )
                            }
                        })()
                    )}
                </div>
                <div className='col-3 mb-3 mx-auto'>
                    <button type='submit' className='btn-orange w-100 btn'>
                        Next
                    </button>
                </div>
            </form>
        </div>
    )
}

export default IsLoadingHOC(TalantVitalDetail)
