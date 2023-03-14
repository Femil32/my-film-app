import React, { useState, useEffect, useContext } from 'react'
import { Accordion } from 'react-bootstrap'
import {
    BackButton,
    ButtonTag,
    Checkbox,
    PTag,
} from '../../components/designComponents/MicroComponents'
import { useDispatch, useSelector } from 'react-redux'
import { allCategoryApi, allsubCategoriesApi } from '../../store/category/slice'
import MultiStepFormContext from './MultiStepFormContext'

const SelectCategory = () => {
    const dispatch = useDispatch()

    const { basicdetail, setBasicDetails, prev, next } = useContext(MultiStepFormContext)

    const [selectedCategory, setSelectedCategory] = useState([])
    const [categoryArray, setCategoryArray] = useState([])

    const { categories, allsubCategories } = useSelector(store => {
        return {
            categories: store.category.category, //category api data
            allsubCategories: store.category.subCategory,
        }
    })

    useEffect(() => {
        dispatch(allCategoryApi())
        dispatch(allsubCategoriesApi())
    }, [])

    useEffect(() => {
        if (allsubCategories.length > 0) {
            dataSetSubcategory()
        }
    }, [allsubCategories])

    const dataSetSubcategory = () => {
        if (categories.length != categoryArray.length) {
            categories.map((category, index) => {
                categoryArray.push({
                    id: category.categoryId,
                    name: category.name,
                    subcategories: [],
                })
            })

            categoryArray.map((category, categoryIndex) => {
                categoryArray[categoryIndex].subcategories = allsubCategories.filter(
                    x => x.categoryId === category.id
                )
            })

            setCategoryArray([...categoryArray])

            categoryArray.map((category, categoryIndex) => {
                category.subcategories.map((subcategory, subCategoryIndex) => {
                    categoryArray[categoryIndex].subcategories[subCategoryIndex] = {
                        ...categoryArray[categoryIndex].subcategories[subCategoryIndex],
                        isSelect: false,
                    }
                })
            })
            setCategoryArray([...categoryArray])

            categoryArray.map((category, categoryIndex) => {
                category.subcategories.map((subcategory, subCategoryIndex) => {
                    let obj = basicdetail.categories.find(
                        data => data.subCategoryId === subcategory.subCategoryId
                    )
                    if (obj !== undefined) {
                        categoryArray[categoryIndex].subcategories[subCategoryIndex].isSelect = true
                        selectedCategory.push(obj)
                    }
                })
            })
            setCategoryArray([...categoryArray])
            setSelectedCategory([...selectedCategory])
        }
    }

    const clickCheckSubcategory = (e, index, element, subCategoriesIndex) => {
        if (e.target.checked === true) {
            selectedCategory.push(element)
        } else {
            const obj = selectedCategory.filter(x => x.subCategoryId === element.subCategoryId)[0]
            selectedCategory.splice(selectedCategory.indexOf(obj), 1)
        }

        categoryArray[index].subcategories[subCategoriesIndex].isSelect = e.target.checked

        setSelectedCategory([...selectedCategory])
        setCategoryArray([...categoryArray])
    }

    const subCategories = (subCategoriesData, categoryIndex) => (
        <Accordion.Body className='px-2 pb-0'>
            {subCategoriesData.map((element, index) => (
                // value={element.isSelect}
                <div
                    className='d-flex justify-content-between align-items-center border-bottom pb-2 mb-2'
                    key={index}
                >
                    <PTag
                        classes={'text-dark-gray white-space-nowrap w-100 ms-2'}
                        texts={element.subCategoryName}
                    />
                    <Checkbox
                        classes={'justify-content-end me-2'}
                        value={element.isSelect}
                        onChange={e => clickCheckSubcategory(e, categoryIndex, element, index)}
                    />
                </div>
            ))}
        </Accordion.Body>
    )

    return (
        <>
            <div className='max-w-625 mx-auto container'>
                <BackButton
                    title={'Select Category'}
                    classes={'mb-4'}
                    onClick={e => {
                        e.preventDefault()
                        prev(false, true)
                    }}
                />
                <div className='shadow-accordion accordion-down-arrow mb-3 '>
                    <div className='row'>
                        <div className='col-12'>
                            {categoryArray.length > 0 &&
                                categoryArray.map((element, index) => (
                                    <Accordion defaultChecked='0' className='mb-3' key={index}>
                                        <Accordion.Item eventKey='0' className='border-0'>
                                            <Accordion.Header>
                                                <PTag
                                                    classes={'text-dark-blue bold fn-16 py-3 px-3'}
                                                    texts={element.name}
                                                />
                                            </Accordion.Header>
                                            {subCategories(element.subcategories, index)}
                                        </Accordion.Item>
                                    </Accordion>
                                ))}
                        </div>
                    </div>
                </div>
                <div className='w-100 d-flex align-items-center justify-content-center mb-5 mt-3'>
                    <ButtonTag
                        classes={'btn-orange'}
                        value={'continue'}
                        onClick={() => {
                            setBasicDetails({
                                firstName: basicdetail.firstName,
                                lastName: basicdetail.lastName,
                                dob: basicdetail.dob,
                                mobile: basicdetail.mobile,
                                whatsAppno: basicdetail.whatsAppno,
                                email: basicdetail.email,
                                gender: basicdetail.gender,
                                categories: selectedCategory,
                                sameasabove: basicdetail.sameasabove,
                            })
                            prev(false, true)
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default SelectCategory
