import React, { useState } from 'react'
import { Accordion, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MiniLoader from '../../components/customLoader/MiniLoader'
import { BackButton, CurrentDirectorylink, PTag } from '../../components/designComponents/MicroComponents'
import { FilterSubCategory, FilterSubSubCategory } from '../../store/category/slice'

const Search = ({ }) => {
    const dispatch = useDispatch()
    const navigation = useNavigate()
    const [isMiniSubLoading, setIsMiniSubLoading] = useState(false)
    const [isMiniSubSubLoading, setIsMiniSubSubLoading] = useState(false)

    const [locationSubCategory, setLocationSubCategory] = useState([])
    const [serviceSubCategory, setServiceSubCategory] = useState([])
    const [talentSubcategory, setTalentSubcategory] = useState([])
    const [crewSubcategory, setCrewSubcategory] = useState([])

    const [subSubCategory, setSubSubCategory] = useState([])
    const [currentCategory, setCurrentCategory] = useState(null)


    const fetchSubcategory = (categoryId) => {
        setIsMiniSubLoading(true)
        setCurrentCategory(categoryId)
        Promise.all([dispatch(FilterSubCategory(categoryId))]).then(res => {
            switch (categoryId) {
                case 1:
                    !talentSubcategory.length && setTalentSubcategory(res[0].payload)
                    break;
                case 2:
                    !crewSubcategory.length && setCrewSubcategory(res[0].payload)
                    break;
                case 3:
                    !serviceSubCategory.length && setServiceSubCategory(res[0].payload)
                    break;
                case 4:
                    !locationSubCategory.length && setLocationSubCategory(res[0].payload)
                    break;
                default:
                    break;
            }
        }).finally(() => {
            setIsMiniSubLoading(false)
        })
    }

    const fetchSubSubcategory = (categoryId, subCategoryId) => {
        setIsMiniSubSubLoading(true)
        setSubSubCategory([])
        Promise.all([dispatch(FilterSubSubCategory({
            categoryId, subCategoryId
        }))]).then(res => {
            setSubSubCategory(res[0].payload)
        }).finally(() => {
            setIsMiniSubSubLoading(false)
        })
    }

    return (
        <>
            <Container className='search'>
                <BackButton
                    title={'All Categories'}
                    classes={'mb-3'}
                    onClick={() => {
                        navigation('/', {
                            replace: true,
                            state: {
                                keyword: "crew", keywordId: 2
                            }
                        })
                    }}
                />
                <CurrentDirectorylink className={'my-3'} routeData={[
                    {
                        name: 'Home',
                        link: '/'
                    },
                    {
                        name: 'search',
                        link: '/'
                    }
                ]} />
                <div className='shadow-accordion center-item chat-window accordion-down-arrow'>
                    <Accordion className='mb-3' flush onSelect={(categoryId) => { categoryId && fetchSubcategory(categoryId) }}>
                        {/* Location */}
                        <Accordion.Item eventKey={4} className='border-0'>
                            <Accordion.Header>
                                <PTag
                                    classes={
                                        'text-dark-blue bolder fn-16 py-3 px-3'
                                    }
                                    texts={"Locations"}
                                />
                            </Accordion.Header>
                            <Accordion.Body className='px-0 py-3 mx-3 search-accoedian gap-2'>
                                {isMiniSubLoading ? <MiniLoader /> :
                                    <Accordion onSelect={(subCategoryId) => { subCategoryId && fetchSubSubcategory(currentCategory, subCategoryId) }} className='d-flex flex-column'>
                                        {locationSubCategory?.map((subCat, i) =>
                                            subCat.subSubCategoryAvailable ?
                                                <Accordion.Item eventKey={subCat?.subCategoryId} className='border-0'>
                                                    <Accordion.Header>
                                                        <PTag
                                                            classes={
                                                                'text-dark-blue bold fn-16 py-2 px-2'
                                                            }
                                                            texts={subCat?.subCategoryName}
                                                        />
                                                    </Accordion.Header>
                                                    <Accordion.Body className='d-flex flex-column h-auto mx-3 my-0' as={'ul'}>
                                                        {isMiniSubSubLoading ? <MiniLoader /> : (
                                                            subSubCategory?.map(subSubCat => {
                                                                return (
                                                                    <li key={subSubCat.subSubCategoryId} className="mx-3">
                                                                        <span>{subSubCat.subSubCategoryName}</span>
                                                                    </li>
                                                                )
                                                            })
                                                        )}
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                : <li key={subCat?.subCategoryId}>{subCat?.subCategoryName}</li>
                                        )}
                                    </Accordion>
                                }
                            </Accordion.Body>
                        </Accordion.Item>
                        {/* Services */}
                        <Accordion.Item eventKey={3} className='border-0'>
                            <Accordion.Header>
                                <PTag
                                    classes={
                                        'text-dark-blue bolder fn-16 py-3 px-3'
                                    }
                                    texts={"Services"}
                                />
                            </Accordion.Header>
                            <Accordion.Body className='px-0 py-3 mx-3 search-accoedian gap-2'>
                                {isMiniSubLoading ? <MiniLoader /> :
                                    <Accordion onSelect={(subCategoryId) => { subCategoryId && fetchSubSubcategory(currentCategory, subCategoryId) }} className='d-flex flex-column'>
                                        {serviceSubCategory?.map((subCat, i) =>
                                            subCat.subSubCategoryAvailable ?
                                                <Accordion.Item eventKey={subCat?.subCategoryId} className='border-0'>
                                                    <Accordion.Header>
                                                        <PTag
                                                            classes={
                                                                'text-dark-blue bold fn-16 py-2 px-2'
                                                            }
                                                            texts={subCat?.subCategoryName}
                                                        />
                                                    </Accordion.Header>
                                                    <Accordion.Body className='d-flex flex-column h-auto mx-3 my-0' as={'ul'}>
                                                        {isMiniSubSubLoading ? <MiniLoader /> : (
                                                            subSubCategory?.map(subSubCat => {
                                                                return (
                                                                    <li key={subSubCat.subSubCategoryId} className="mx-3">
                                                                        <span>{subSubCat.subSubCategoryName}</span>
                                                                    </li>
                                                                )
                                                            })
                                                        )}
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                : <li key={subCat?.subCategoryId}>{subCat?.subCategoryName}</li>
                                        )}
                                    </Accordion>
                                }
                            </Accordion.Body>
                        </Accordion.Item>
                        {/* crew */}
                        <Accordion.Item eventKey={2} className='border-0'>
                            <Accordion.Header>
                                <PTag
                                    classes={
                                        'text-dark-blue bolder fn-16 py-3 px-3'
                                    }
                                    texts={"Crew"}
                                />
                            </Accordion.Header>
                            <Accordion.Body className='px-0 py-3 mx-3 search-accoedian gap-2'>
                                {isMiniSubLoading ? <MiniLoader /> :
                                    <Accordion onSelect={(subCategoryId) => { subCategoryId && fetchSubSubcategory(currentCategory, subCategoryId) }} className='d-flex flex-column'>
                                        {crewSubcategory?.map((subCat, i) =>
                                            subCat.subSubCategoryAvailable ?
                                                <Accordion.Item eventKey={subCat?.subCategoryId} className='border-0'>
                                                    <Accordion.Header>
                                                        <PTag
                                                            classes={
                                                                'text-dark-blue bold fn-16 py-2 px-2'
                                                            }
                                                            texts={subCat?.subCategoryName}
                                                        />
                                                    </Accordion.Header>
                                                    <Accordion.Body className='d-flex flex-column h-auto mx-3 my-0' as={'ul'}>
                                                        {isMiniSubSubLoading ? <MiniLoader /> : (
                                                            subSubCategory?.map(subSubCat => {
                                                                return (
                                                                    <li key={subSubCat.subSubCategoryId} className="mx-3">
                                                                        <span>{subSubCat.subSubCategoryName}</span>
                                                                    </li>
                                                                )
                                                            })
                                                        )}
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                : <li key={subCat?.subCategoryId}>{subCat?.subCategoryName}</li>
                                        )}
                                    </Accordion>
                                }
                            </Accordion.Body>
                        </Accordion.Item>
                        {/* Talent */}
                        <Accordion.Item eventKey={1} className='border-0'>
                            <Accordion.Header>
                                <PTag
                                    classes={
                                        'text-dark-blue bolder fn-16 py-3 px-3'
                                    }
                                    texts={"Talent"}
                                />
                            </Accordion.Header>
                            <Accordion.Body className='px-0 py-3 mx-3 search-accoedian gap-2'>
                                {isMiniSubLoading ? <MiniLoader /> :
                                    <Accordion onSelect={(subCategoryId) => { subCategoryId && fetchSubSubcategory(currentCategory, subCategoryId) }} className='d-flex flex-column'>
                                        {talentSubcategory?.map((subCat, i) =>
                                            subCat.subSubCategoryAvailable ?
                                                <Accordion.Item eventKey={subCat?.subCategoryId} className='border-0'>
                                                    <Accordion.Header>
                                                        <PTag
                                                            classes={
                                                                'text-dark-blue bold fn-16 py-2 px-2'
                                                            }
                                                            texts={subCat?.subCategoryName}
                                                        />
                                                    </Accordion.Header>
                                                    <Accordion.Body className='d-flex flex-column h-auto mx-3 my-0' as={'ul'}>
                                                        {isMiniSubSubLoading ? <MiniLoader /> : (
                                                            subSubCategory?.map(subSubCat => {
                                                                return (
                                                                    <li key={subSubCat.subSubCategoryId} className="mx-3">
                                                                        <span>{subSubCat.subSubCategoryName}</span>
                                                                    </li>
                                                                )
                                                            })
                                                        )}
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                : <li key={subCat?.subCategoryId}>{subCat?.subCategoryName}</li>
                                        )}
                                    </Accordion>
                                }
                            </Accordion.Body>
                        </Accordion.Item>

                    </Accordion>
                </div>
            </Container>
        </>
    )
}

export default Search