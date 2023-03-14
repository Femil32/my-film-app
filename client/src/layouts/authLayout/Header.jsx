import { Link, useLocation } from 'react-router-dom'
import { LogoIcon } from '../../components/AllSvgs'
import { ATag, ButtonTag } from '../../components/designComponents/MicroComponents'

const Header = () => {
    const loaction = useLocation()

    return (
        <div className='home-page'>
            <div className='container'>
                <div className='d-flex align-items-center justify-content-between mb-3 mt-2'>
                    <ATag >
                        <div className='sign-logo mb-4'>
                            Logo Icon
                            <LogoIcon width='80' />
                        </div>
                    </ATag>
                    {loaction.pathname === '/' && (
                        <div className='d-flex align-items-center'>
                            <Link to='/auth/signin'>
                                <ButtonTag className='btn btn-orange' value={'Signin'}></ButtonTag>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header
