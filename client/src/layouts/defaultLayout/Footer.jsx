import { LogoIcon } from '../../components/AllSvgs'
import { FaFacebookSquare, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import {
    ATag,
    PTag,
    ULTag,
    LITag,
} from '../../components/designComponents/MicroComponents'

const Footer = () => {
    return (
        <footer className='bg-light'>
            <div className='container '>
                <div className='row py-5 border-bottom m-0'>
                    <div className='col-lg-4 col-12 mb-5 ps-0'>
                        {/* Logo */}
                        <LogoIcon width={100} />
                        <PTag
                            texts='In at iaculis lorem. Praesent tempor dictum tellus ut molestie. Sed sedullamcorper lorem, id odio.'
                            classes='text-dark-gray my-4 max-w-310'
                        />
                        <div className='d-flex gap-4'>
                            <div className='social-bg-icon pointer mx-2'>
                                <FaFacebookSquare className="fa-2x" />
                            </div>
                            <div className='social-bg-icon pointer mx-2'>
                                <FaLinkedinIn className="fa-2x" />
                            </div>
                            <div className='social-bg-icon pointer mx-2'>
                                <FaTwitter className="fa-2x" />
                            </div>
                            {/* {[faFacebookSquare, faLinkedinIn, faTwitter].map((x, index) => (
                                <SocialLogin
                                    key={index}
                                    socialiconclass={<FontAwesomeIcon icon={x} />}
                                />
                            ))} */}
                        </div>
                    </div>
                    <div className='col-lg-2 col-6 '>
                        {/* Service Provider Container */}
                        <ULTag>
                            <LITag
                                classes='text-dark-gray bold mb-3 fn-18'
                                children='Service Provider'
                            />
                            <LITag>
                                <ATag classes='text-gray'>
                                    <PTag texts='Register' classes='pointer mb-4' />
                                </ATag>
                            </LITag>
                            <LITag>
                                <ATag classes='text-gray'>
                                    <PTag texts='Login' classes='pointer mb-4' />
                                </ATag>
                            </LITag>
                            <LITag>
                                <ATag classes='text-gray'>
                                    <PTag texts='FAQs' classes='pointer mb-4' />
                                </ATag>
                            </LITag>
                            <LITag>
                                <ATag classes='text-gray'>
                                    <PTag texts='Support' classes='pointer mb-4' />
                                </ATag>
                            </LITag>
                        </ULTag>
                    </div>
                    <div className='col-lg-2 col-6'>
                        {/* Company Container */}
                        <ULTag>
                            <LITag classes='text-dark-gray bold mb-3 fn-18' children='Company' />
                            <LITag>
                                <ATag classes='text-gray'>
                                    <PTag texts='Who we are' classes='pointer mb-4' />
                                </ATag>
                            </LITag>
                            <LITag>
                                <ATag classes='text-gray'>
                                    <PTag texts='Blog' classes='pointer mb-4' />
                                </ATag>
                            </LITag>
                            <LITag>
                                <ATag classes='text-gray'>
                                    <PTag texts='Careers' classes='pointer mb-4' />
                                </ATag>
                            </LITag>
                            <LITag>
                                <ATag classes='text-gray'>
                                    <PTag texts='Report Fraud' classes='pointer mb-4' />
                                </ATag>
                            </LITag>
                            <LITag>
                                <ATag classes='text-gray'>
                                    <PTag texts='Contact' classes='pointer mb-4' />
                                </ATag>
                            </LITag>
                        </ULTag>
                    </div>
                    <div className='col-lg-2 col-6'>
                        {/* Nearby Container */}
                        <ULTag>
                            <LITag classes='text-dark-gray bold mb-3 fn-18' children='Nearby' />
                            <LITag>
                                <ATag classes='text-gray'>
                                    <PTag texts='Mumbai' classes='pointer mb-4' />
                                </ATag>
                            </LITag>
                            <LITag>
                                <ATag classes='text-gray'>
                                    <PTag texts='Lucknow' classes='pointer mb-4' />
                                </ATag>
                            </LITag>
                            <LITag>
                                <ATag classes='text-gray'>
                                    <PTag texts='Jaipur' classes='pointer mb-4' />
                                </ATag>
                            </LITag>
                            <LITag>
                                <ATag classes='text-gray'>
                                    <PTag texts='Gangtok' classes='pointer mb-4' />
                                </ATag>
                            </LITag>
                            <LITag>
                                <ATag classes='text-gray'>
                                    <PTag texts='Delhi' classes='pointer mb-4' />
                                </ATag>
                            </LITag>
                        </ULTag>
                    </div>

                    <div className='col-lg-2 col-6 '>
                        {/* For You Container */}
                        <ULTag>
                            <LITag classes='text-dark-gray bold mb-3 fn-18' children='For You' />
                            <LITag>
                                <ATag classes='text-gray'>
                                    <PTag texts='Privacy' classes='pointer mb-4' />
                                </ATag>
                            </LITag>
                            <LITag>
                                <ATag classes='text-gray'>
                                    <PTag texts='Terms' classes='pointer mb-4' />
                                </ATag>
                            </LITag>
                            <LITag>
                                <ATag classes='text-gray'>
                                    <PTag texts='Security' classes='pointer mb-4' />
                                </ATag>
                            </LITag>
                            <LITag>
                                <ATag classes='text-gray'>
                                    <PTag texts='Sitemap' classes='pointer mb-4' />
                                </ATag>
                            </LITag>
                        </ULTag>
                    </div>
                </div>
                <PTag
                    texts='By continuing past this page, you agree to our Terms of Service, Cookie Policy,
                    Privacy Policy and Content Policies. All trademarks are properties of their
                    respective owners. 2021 © MyFilmApp™ Pvt Ltd. All rights reserved.'
                    classes='text-dark-gray text-center fn-14 p-4 max-w-750 mx-auto fn-12 pointer'
                />
            </div>
        </footer>
    )
}

export default Footer
