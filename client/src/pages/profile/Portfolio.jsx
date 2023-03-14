import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ProfilePictureTwo } from '../../assets/img'
import Services from '../../assets/img/base/Services.png'
import CertificatesAwards from '../../assets/img/base/CertificatesAwards.png'
import {
    Dash,
    Edit,
    Star,
} from '../../components/AllSvgs'
import {
    ATag,
    BackButton,
    ButtonTag,
    H3Tag,
    H6Tag,
    ImgTag,
    InputTag,
    PTag,
} from '../../components/designComponents/MicroComponents'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'
//icons
import { AiFillHeart } from 'react-icons/ai'
import { MdLocationOn } from 'react-icons/md'
import { FaMicrophone, FaPlay } from 'react-icons/fa'
import { FiChevronRight, FiPlus } from 'react-icons/fi'

const Portfolio = ({ setLoading }) => {
    const nevigation = useNavigate()

    const [key, setKey] = useState('Portfolio')

    useEffect(() => {
        setLoading(false)
    }, [])


    return (
        <div className='container'>
            <div className='row mb-5'>
                <BackButton
                    title={'My Profile'}
                    onClick={() => {
                        nevigation('/dashboard')
                    }}
                />
                <div className='col-xl-4 col-sm-5 col-12 mb-sm-0 mb-3'>
                    <div className='rounded-10 border p-sm-3 p-2 pt-sm-4'>
                        <div className='text-center mb-sm-3 mb-2'>
                            <div className='rounded-10 overflow-hidden object-fit-cover max-w-180 h-190 mx-auto'>
                                <ImgTag
                                    src={ProfilePictureTwo}
                                    alt={'profile'}
                                    classes={'img-fluid'}
                                />
                            </div>
                            <PTag
                                classes={'text-dark-blue fn-20 fn-xs-18 fw-bold mt-2'}
                                texts={'Kumar Biswas'}
                            />
                            <div className='d-flex align-items-center justify-content-center'>
                                <MdLocationOn fontSize={25} fill={'rgb(135 146 160)'} />
                                <PTag classes={'text-gray'} texts={'Mumbai'} />
                            </div>
                        </div>
                        <div>
                            <div className='border-bottom max-w-310 mx-auto pb-3'>
                                <PTag
                                    classes={'text-gray text-center'}
                                    texts={
                                        'Feugiat in ante metus dictum at tempor. Dui into faucibus in ornare quam viverra. lementum a facilisis leo vel Fringilla.'
                                    }
                                />
                            </div>
                            <div className='text-center pt-3'>
                                <PTag
                                    classes={'text-dark-gray fn-20 fn-xs-18 bold'}
                                    texts={'Profile Vists'}
                                />
                                <PTag
                                    classes={'text-orange bold fn-36 fn-xs-30 mt-0'}
                                    texts={'782'}
                                />
                            </div>
                        </div>
                    </div>
                </div >
                <div className='col-xl-8 col-sm-7 col-12 px-3 MyServices remove-extra-padding'>
                    <Tabs
                        id='controlled-tab-example'
                        activeKey={key}
                        onSelect={k => setKey(k)}
                        className='mb-3'
                    >
                        <Tab eventKey='Portfolio' title='Portfolio'>
                            <div className='row'>
                                <div className='col-xl-3 col-lg-4 col-6 p-2'>
                                    <div className='position-relative rounded-10'>
                                        <ImgTag src={Services} classes={'img-fluid'} />
                                        <div className='w-40 h-40 rounded-circle d-flex justify-content-center align-items-center bg-dark-orange shadow-sm position-absolute top-50 start-50 translate-middle'>
                                            <ATag children={<FaPlay />} />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-xl-3 col-lg-4 col-6 p-2'>
                                    <div className='position-relative rounded-10'>
                                        <ImgTag src={Services} classes={'img-fluid'} />
                                        <div className='w-40 h-40 rounded-circle d-flex justify-content-center align-items-center bg-dark-orange shadow-sm position-absolute top-50 start-50 translate-middle'>
                                            <ATag children={<FaPlay />} />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-xl-3 col-lg-4 col-6 p-2'>
                                    <div className='position-relative rounded-10'>
                                        <ImgTag src={Services} classes={'img-fluid'} />
                                        <div className='w-40 h-40 rounded-circle d-flex justify-content-center align-items-center bg-dark-orange shadow-sm position-absolute top-50 start-50 translate-middle'>
                                            <ATag children={<FaMicrophone />} />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-xl-3 col-lg-4 col-6 p-2'>
                                    <div className='position-relative rounded-10'>
                                        <ImgTag src={Services} classes={'img-fluid'} />
                                        <div className='w-40 h-40 rounded-circle d-flex justify-content-center align-items-center bg-dark-orange shadow-sm position-absolute top-50 start-50 translate-middle'>
                                            <ATag children={<FaPlay />} />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-xl-3 col-lg-4 col-6 p-2'>
                                    <div className='position-relative rounded-10'>
                                        <ImgTag src={Services} classes={'img-fluid'} />
                                        <div className='w-30 h-30 rounded-circle d-flex justify-content-center align-items-center bg-white shadow-sm position-absolute top-10 end-10'>
                                            <ATag children={<Dash />} />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-xl-3 col-lg-4 col-6 p-2'>
                                    <div className='position-relative rounded-10'>
                                        <ImgTag src={Services} classes={'img-fluid'} />
                                        <div className='w-30 h-30 rounded-circle d-flex justify-content-center align-items-center bg-white shadow-sm position-absolute top-10 end-10'>
                                            <ATag children={<Dash />} />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-xl-3 col-lg-4 col-6 p-2'>
                                    <div className='position-relative rounded-10'>
                                        <ImgTag src={Services} classes={'img-fluid'} />
                                        <div className='w-30 h-30 rounded-circle d-flex justify-content-center align-items-center bg-white shadow-sm position-absolute top-10 end-10'>
                                            <ATag children={<Dash />} />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-xl-3 col-lg-4 col-6 p-2'>
                                    <div className='position-relative rounded-10 max-h-180 w-100 h-100 bg-light border-dashed-2'>
                                        <div className='position-absolute top-50 start-50 translate-middle'>
                                            <FiPlus width={'50'} />
                                        </div>
                                    </div>
                                </div>
                                <div className='form-control position-relative d-flex justify-content-between align-items-center p-2 ps-3 pe-2 mb-sm-3 w-100'>
                                    <InputTag
                                        className={'uplode-input'}
                                        type={'file'}
                                        name={'fileSelect'}
                                    />

                                    <ATag
                                        classes={'text-dark bold'}
                                        children={<PTag texts={'Add Audios'} />}
                                    />
                                    <ATag
                                        classes={'btn btn-dark-gray bold'}
                                        children={<PTag texts={'Add'} />}
                                    />
                                </div>
                                <div className='form-control position-relative d-flex justify-content-between align-items-center p-2 ps-3 pe-2 mb-sm-3 w-100'>
                                    <InputTag
                                        type={'file'}
                                        name={'fileSelect'}
                                        className={'uplode-input'}
                                    />

                                    <ATag
                                        classes={'text-dark bold'}
                                        children={<PTag texts={'Add Videos'} />}
                                    />
                                    <ATag
                                        classes={'btn btn-dark-gray bold'}
                                        children={<PTag texts={'Add'} />}
                                    />
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey='Overview' title='Overview'>
                            <div className='px-3'>
                                <div className='d-flex justify-content-between align-items-center mb-3'>
                                    <div>
                                        <PTag
                                            classes={'text-dark-blue bold fn-18'}
                                            texts={'Vitals'}
                                        />
                                    </div>
                                    <div>
                                        <Edit width={'24'} />
                                    </div>
                                </div>
                                <div className='row border-bottom mb-3'>
                                    <div className='col-xl-3 col-lg-4 col-sm-6 mb-2'>
                                        <PTag classes={'text-dark-gray'} texts={'Height'} />
                                        <H3Tag classes={'text-dark-blue'} title={"5'9"} />
                                    </div>
                                    <div className='col-xl-3 col-lg-4 col-sm-6 mb-2'>
                                        <PTag classes={'text-dark-gray'} texts={'Weight'} />
                                        <H3Tag classes={'text-dark-blue'} title={"5'9"} />
                                    </div>
                                    <div className='col-xl-3 col-lg-4 col-sm-6 mb-2'>
                                        <PTag classes={'text-dark-gray'} texts={'Waist'} />
                                        <H3Tag classes={'text-dark-blue'} title={"5'9"} />
                                    </div>
                                    <div className='col-xl-3 col-lg-4 col-sm-6 mb-2'>
                                        <PTag classes={'text-dark-gray'} texts={'Eye Color'} />
                                        <H3Tag classes={'text-dark-blue'} title={"5'9"} />
                                    </div>
                                    <div className='col-xl-3 col-lg-4 col-sm-6 mb-2'>
                                        <PTag classes={'text-dark-gray'} texts={'Hip size'} />
                                        <H3Tag classes={'text-dark-blue'} title={"5'9"} />
                                    </div>
                                    <div className='col-xl-3 col-lg-4 col-sm-6 mb-2'>
                                        <PTag
                                            classes={'text-dark-gray'}
                                            texts={'Hair Colour'}
                                        />
                                        <H3Tag classes={'text-dark-blue'} title={"5'9"} />
                                    </div>
                                    <div className='col-xl-3 col-lg-4 col-sm-6 mb-2'>
                                        <PTag classes={'text-dark-gray'} texts={'Screen Age'} />
                                        <H3Tag classes={'text-dark-blue'} title={"5'9"} />
                                    </div>
                                    <div className='col-xl-3 col-lg-4 col-sm-6 mb-2'>
                                        <PTag classes={'text-dark-gray'} texts={'Chest/Bust'} />
                                        <H3Tag classes={'text-dark-blue'} title={"5'9"} />
                                    </div>
                                </div>
                                <div className='border-bottom mb-3'>
                                    <div className='d-flex justify-content-between align-items-center mb-3'>
                                        <div>
                                            <PTag
                                                classes={'text-dark-blue fn-18 bold'}
                                                texts={'Past Projects'}
                                            />
                                        </div>
                                        <div>
                                            <Edit width={'24'} />
                                        </div>
                                    </div>
                                    <div className='d-flex align-items-center mb-3'>
                                        <ATag classes={'fw-bold pe-3'} children={'Imdb link'} />
                                        <FiChevronRight width={'18'} height={'16'} />
                                    </div>
                                </div>
                                <div className='border-bottom mb-3'>
                                    <div className='d-flex justify-content-between align-items-center mb-3'>
                                        <div>
                                            <PTag
                                                classes={'text-dark-blue fn-18 bold'}
                                                texts={'Certificates & Awards'}
                                            />
                                        </div>
                                        <div>
                                            <Edit width={'24'} />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-xl-3 col-lg-6 col-sm-6 p-2'>
                                            <div className='rounded-10'>
                                                <ImgTag
                                                    src={CertificatesAwards}
                                                    classes={'img-fluid'}
                                                />
                                                <PTag
                                                    classes={'my-3 fn-16 text-dark-blue'}
                                                    texts={'Best Cameraman'}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-xl-3 col-lg-6 col-sm-6 p-2'>
                                            <div className='rounded-10'>
                                                <ImgTag
                                                    src={CertificatesAwards}
                                                    classes={'img-fluid'}
                                                />
                                                <PTag
                                                    classes={'my-3 fn-16 text-dark-blue'}
                                                    texts={'Best Cameraman'}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-xl-3 col-lg-6 col-sm-6 p-2'>
                                            <div className='rounded-10'>
                                                <ImgTag
                                                    src={CertificatesAwards}
                                                    classes={'img-fluid'}
                                                />
                                                <PTag
                                                    classes={'my-3 fn-16 text-dark-blue'}
                                                    texts={'Best Cameraman'}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-xl-3 col-lg-6 col-sm-6 p-2'>
                                            <div className='rounded-10'>
                                                <ImgTag
                                                    src={CertificatesAwards}
                                                    classes={'img-fluid'}
                                                />
                                                <PTag
                                                    classes={'my-3 fn-16 text-dark-blue'}
                                                    texts={'Best Cameraman'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between align-items-center mb-3'>
                                    <div>
                                        <PTag
                                            classes={'text-dark-blue fn-18'}
                                            texts={'Charges'}
                                        />
                                    </div>
                                    <div>
                                        <Edit width={'24'} />
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between py-2'>
                                    <div>
                                        <PTag classes={'text-dark-blue'} texts={'Base Price'} />
                                    </div>
                                    <div className='fw-bold text-center'>
                                        <PTag
                                            classes={'text-dark-blue'}
                                            texts={'₹1,00,000 (Feature Films)'}
                                        />
                                        <PTag
                                            classes={'text-dark-blue'}
                                            texts={'₹50,000 (TV / Web series)'}
                                        />
                                        <PTag
                                            classes={'text-dark-blue'}
                                            texts={'₹30,000 (Ads / Shorts Films)'}
                                        />
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between py-2 mb-3'>
                                    <div>
                                        <PTag classes={'text-dark-blue'} texts={'Taxes'} />
                                    </div>
                                    <div className='fw-bold'>
                                        <PTag classes={'text-dark-blue'} texts={'25%'} />
                                    </div>
                                </div>
                                <div className='border-bottom'>
                                    <div className='d-flex justify-content-between align-items-center my-3'>
                                        <div>
                                            <PTag
                                                classes={'text-dark-gray'}
                                                texts={'Payment Terms'}
                                            />
                                        </div>
                                        <div>
                                            <Edit width={'24'} />
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between py-2'>
                                        <div>
                                            <PTag texts={'Advance To be paid'} />
                                        </div>
                                        <div className='fw-bold'>
                                            <PTag classes={'text-dark-blue'} texts={'25%'} />
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between py-2'>
                                        <div>
                                            <PTag texts={'On Shoot %'} />
                                        </div>
                                        <div className='fw-bold'>
                                            <PTag classes={'text-dark-blue'} texts={'25%'} />
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between py-2 mb-3'>
                                        <div>
                                            <PTag texts={'Credit Period'} />
                                        </div>
                                        <div className='fw-bold'>
                                            <PTag
                                                classes={'text-dark-blue'}
                                                texts={'20 days'}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-5'>
                                    <div className='d-flex justify-content-between align-items-center my-3'>
                                        <div>
                                            <PTag
                                                classes={'text-dark-blue fn-18'}
                                                texts={'Cancelation Policy'}
                                            />
                                        </div>
                                        <div>
                                            <Edit width={'24'} />
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='py-2'>
                                            <PTag
                                                classes={'fw-bold text-dark-blue'}
                                                texts={'Refund %'}
                                            />
                                            <PTag
                                                classes={'text-dark-blue'}
                                                texts={
                                                    'Elementum a facilisis leo vel Fringilla.'
                                                }
                                            />
                                        </div>
                                        <div className='py-2'>
                                            <PTag
                                                classes={'fw-bold text-dark-blue'}
                                                texts={'Refund %'}
                                            />
                                            <PTag
                                                classes={'text-dark-blue'}
                                                texts={
                                                    'Elementum a facilisis leo vel Fringilla.'
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </Tab >
                        <Tab eventKey='Reviews' title='Reviews'>
                            <div className='row mb-5'>
                                <div className='border p-3 max-w-576 mx-auto rounded-10'>
                                    <div className='d-flex align-items-center'>
                                        <div className='w-80 h-80 rounded-10 overflow-hidden'>
                                            <ImgTag
                                                src={ProfilePictureTwo}
                                                alt={'profile'}
                                                classes={'img-fluid'}
                                            />
                                        </div>
                                        <div className='ms-3'>
                                            <div className='d-flex align-items-center mb-2'>
                                                <PTag
                                                    classes={'me-2'}
                                                    texts={<Star width={'14'} />}
                                                />
                                                <PTag
                                                    classes={'me-2 mt-0'}
                                                    texts={<Star width={'14'} />}
                                                />
                                                <PTag
                                                    classes={'me-2 mt-0'}
                                                    texts={<Star width={'14'} />}
                                                />
                                                <PTag
                                                    classes={'me-2 mt-0'}
                                                    texts={<Star width={'14'} />}
                                                />
                                            </div>
                                            <H6Tag title={'Antheny jame'} />
                                            <PTag texts={'4 mins ago'} />
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        <PTag
                                            texts={
                                                'when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
                                            }
                                        />
                                    </div>
                                    <div className='rounded-10 overflow-hidden max-w-576 max-h-450 mx-auto my-3'>
                                        <ImgTag
                                            src={ProfilePictureTwo}
                                            alt={'profile'}
                                            classes={'img-fluid'}
                                        />
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <PTag texts={<AiFillHeart />} />
                                        <PTag classes={'mt-0 ms-1'} texts={'129'} />
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <ButtonTag
                                            classes={'btn-dark-blue fn-14'}
                                            value={'Request A Review'}
                                        />
                                    </div>
                                </div >
                            </div >
                        </Tab >
                    </Tabs >
                </div >
            </div >
        </div >
    )
}

export default IsLoadingHOC(Portfolio)
