import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    PTag,
    BackButton,
    CurrentDirectorylink,
    FilterSortMenu,
} from '../../components/designComponents/MicroComponents'
import { ImageOne, ProfilePictureOne } from '../../assets/img'
import Card from '../../components/common/Card'
import { Col, Row } from 'react-bootstrap'
import { Sort } from '../../components/AllSvgs'
//icons
import { MdOutlineFilterList } from 'react-icons/md'
import { Provider } from '../../components/designComponents/MicroComponentsContext'
import FilterModal from '../listing/FilterModal'
import SortByModal from '../listing/SortByModal'

const CategoriesDetails = () => {
    const navigation = useNavigate()

    const [showSort, setShowSort] = useState(false)
    const [showFilter, setShowFilter] = useState(false)

    const listCard = [
        {
            gallery: [ImageOne, ImageOne, ImageOne, ImageOne],
            PackageName: [
                'Lorem ipsum dolor sit amet',
                'Duis aute irure dolor',
                'Sed ut perspiciatis unde',
                'Ut enim ad minima',
                'Sed ut perspiciatis unde',
            ],
            UserName: 'Nikon Camera',
            Category: 'Sub Category',
            review: '4.5',
            BasePrice: '₹1,00,000',
            location: 'Mumbai',
            ProfileImg: ProfilePictureOne,
            Services: 'Venna Services',
        },
        {
            gallery: [ImageOne, ImageOne, ImageOne, ImageOne],
            PackageName: [
                'Lorem ipsum dolor sit amet',
                'Duis aute irure dolor',
                'Sed ut perspiciatis unde',
                'Ut enim ad minima',
                'Sed ut perspiciatis unde',
            ],
            UserName: 'Nikon Camera',
            Category: 'Sub Category',
            review: '4.5',
            BasePrice: '₹1,00,000',
            location: 'Mumbai',
            ProfileImg: ProfilePictureOne,
            Services: 'Venna Services',
        },
        {
            gallery: [ImageOne, ImageOne, ImageOne, ImageOne],
            PackageName: [
                'Lorem ipsum dolor sit amet',
                'Duis aute irure dolor',
                'Sed ut perspiciatis unde',
                'Ut enim ad minima',
                'Sed ut perspiciatis unde',
            ],
            UserName: 'Nikon Camera',
            Category: 'Sub Category',
            review: '4.5',
            BasePrice: '₹1,00,000',
            location: 'Mumbai',
            ProfileImg: ProfilePictureOne,
            Services: 'Venna Services',
        },
    ]
    return (
        <>
            <div className='container'>
                {/* Back Button */}
                <div className='d-flex justify-content-between align-items-center'>
                    <BackButton
                        classes={'mb-4'}
                        textClass={'fn-20'}
                        title={'Listing'}
                        onClick={() => {
                            navigation('/dashboard')
                        }}
                    />
                </div>
                <div className='d-flex justify-content-between align-item-center my-3'>
                    <CurrentDirectorylink
                        routeData={[
                            {
                                name: 'home',
                                link: '/'
                            },
                            {
                                name: 'search',
                                link: '/'
                            },
                            {
                                name: 'All Categories',
                                link: '/search/listing'
                            },
                        ]}
                    />
                    <Provider value={{
                        showFilter,
                        showSort,
                        setShowFilter,
                        setShowSort
                    }}>
                        <FilterSortMenu />
                    </Provider>
                </div>
                {/* Card Container */}
                <Row>
                    {listCard.map((data, index) => (
                        <Col xl={4} sm={6} key={index}>
                            <Card
                                gallery={data.gallery}
                                PackageName={data.PackageName}
                                UserName={data.UserName}
                                Category={data.Category}
                                review={data.review}
                                BasePrice={data.BasePrice}
                                location={data.location}
                                ProfileImg={data.ProfileImg}
                                Services={data.Services}
                            />
                        </Col>
                    ))}
                </Row>
                {/* <FilterModal show={showFilter} setShow={setShowFilter} filterData={filterData} />
                <SortByModal show={showSort} setOpen={setShowSort} /> */}
            </div>
        </>
    )
}

export default CategoriesDetails
