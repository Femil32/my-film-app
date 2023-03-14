import React from 'react'
import { H1Tag, ImgTag, PTag } from '../../components/designComponents/MicroComponents'
import filmreelimg from '../../assets/img/base/film-reel.png'

export default function CameraHome({ title, texts }) {
    return (
        <div>
            <div className='row g-0 homePageimg d-flex align-items-center px-4 mb-4'>
                <div className='col-lg-5 col-12 my-4'>
                    <div className='max-w-450 mx-auto'>
                        <ImgTag src={filmreelimg} classes={'w-100 h-100'} />
                    </div>
                </div>
                <div className='col-lg-7 col-12 ps-5'>
                    <div>
                        <H1Tag
                            classes={
                                'text-dark-blue fn-md-20 fn-40 fw-bold border-bottom border-1 border-success d-inline'
                            }
                            title={`Don't Let Your talent`}
                        />
                    </div>
                    <div>
                        <H1Tag
                            classes={
                                'text-dark-blue fn-md-20 fn-40 fw-bold border-bottom border-1 border-success d-inline '
                            }
                            title={`Get Wasted`}
                        />
                    </div>
                    <div>
                        <PTag
                            classes={'text-dark-blue fn-10 line-height-1 mt-sm-2 mx-auto py-2 mb-5'}
                            texts={title}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
