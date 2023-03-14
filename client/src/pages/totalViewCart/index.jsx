import React from 'react'
import { PTag } from '../../components/designComponents/MicroComponents'
//icons
import { FiShoppingCart, FiChevronRight } from 'react-icons/fi'

export default function TotalViewCart(props) {
    return (
        <>
            <div className="card bg-dark-blue rounded-10 text-white pointer p-3">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <div className="me-4">
                            <FiShoppingCart fontSize={37} color={'#ffffff'} strokeWidth={'1.2'} />
                        </div>
                        <div className="">
                            <PTag classes={''} texts={'Total'} />
                            <PTag classes={'fw-bold fn-20'} texts={'₹60,000'} />
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <PTag classes={'px-4'} texts={props.texts} />
                        <FiChevronRight fontSize={27} stroke='#ffffff' />
                    </div>
                </div>
            </div>
        </>
    )
}
