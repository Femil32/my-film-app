import { FaceBookIcon, GoogleIcon, TwitterIcon } from '../AllSvgs'
//icons
import { FaLinkedinIn } from "react-icons/fa";

const SocialLogin = props => {
    return (
        <div className='text-center'>
            <p className='text-dark-blue mb-3'>Or login with</p>
            <div className='d-flex justify-content-center'>
                {props.GoogleIcon && (
                    <a href='#' className='social-bg-icon mx-3'>
                        <div className='social-icon'>
                            <GoogleIcon width='30' fill='#ffffff' />
                        </div>
                    </a>
                )}
                {props.FaceBookIcon && (
                    <a href='#' className='social-bg-icon mx-3'>
                        <div className='social-icon'>
                            <FaceBookIcon width='30' fill='#ffffff' />
                        </div>
                    </a>
                )}
                {props.LinkedinIcon && (
                    <a href='#' className='social-bg-icon mx-3'>
                        <div className='social-icon'>
                            <FaLinkedinIn className={'Fa-LinkedinIn'} />
                        </div>
                    </a>
                )}
                {props.TwitterIcon && (
                    <a href='#' className='social-bg-icon mx-3'>
                        <div className='social-icon'>
                            <TwitterIcon width='30' fill='#ffffff' />
                        </div>
                    </a>
                )}
            </div>
        </div>
    )
}

export default SocialLogin
