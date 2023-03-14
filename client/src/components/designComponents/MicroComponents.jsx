import { Fragment, useContext } from 'react'
//icons
import { FiArrowLeft } from 'react-icons/fi'
import { FaMicrophone, FaPlay } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import MicroComponentsContext, { Consumer } from './MicroComponentsContext'
import { MdOutlineFilterList } from 'react-icons/md'
import { BiChevronRight } from 'react-icons/bi'
import { Sort } from '../AllSvgs'
import PhoneInput from 'react-phone-number-input'

// heading tag
export const H1Tag = ({ classes, title }) => {
    return <h1 className={`heading__h1 ${classes}`}>{title}</h1>
}

export const H2Tag = ({ classes, title }) => {
    return <h2 className={`heading__h2 ${classes}`}>{title}</h2>
}

export const H3Tag = ({ classes, title }) => {
    return <h3 className={`heading__h3 ${classes}`}>{title}</h3>
}

export const H4Tag = ({ classes, title }) => {
    return <h4 className={`heading__h4 ${classes}`}>{title}</h4>
}

export const H5Tag = ({ classes, title }) => {
    return <h5 className={`heading__h5 ${classes}`}>{title}</h5>
}

export const H6Tag = ({ classes, title }) => {
    return <h6 className={`heading__h6 ${classes}`}>{title}</h6>
}

// paragraph tag (p)
export const PTag = ({ texts, classes }) => {
    return <p className={`${classes}`}>{texts}</p>
}

// anchor tag (a)
export const ATag = ({ classes, src, children, ...rest }) => {
    return (
        <a href={src} className={`${classes}`} {...rest}>
            {children}
        </a>
    )
}

// list tag
export const ULTag = ({ classes, children }) => {
    return <ul className={`unorderedList  ${classes}`}>{children}</ul>
}

export const LITag = ({ children, classes }) => {
    return <li className={`listItem ${classes}`}>{children}</li>
}

// input
export const InputTag = ({ classes, placeholder, type, name, disabled, autoComplete, id, ...rest }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            autoComplete={autoComplete ?? 'off'}
            className={`input ${classes}`}
            id={id}
            disabled={disabled}
            onChange={e => {
                e.preventDefault()
            }}
            onKeyDown={e => {
                if (e.key === 'Enter') {
                    e.preventDefault()
                }
            }}
            {...rest}
        />
    )
}

// textarea
export const MultiLineInputTag = ({ classes, placeholder, ...rest }) => {
    return (
        <textarea
            className={`form-control ${classes}`}
            placeholder={placeholder}
            rows='4'
            {...rest}
        ></textarea>
    )
}

// button
export const ButtonTag = ({ classes, value, type, ...rest }) => {
    return (
        <button type={type} className={`btn ${classes}`} {...rest}>
            {value}
        </button>
    )
}

// img tag
export const ImgTag = ({ src, alt, classes, ...rest }) => {
    return <img src={src} className={classes} alt={alt} {...rest} />
}

// em tag
export const Emtag = ({ classes, text }) => {
    return <em className={classes}>{text}</em>
}

// label tag
export const LabelTag = ({ For, classes, text, ...rest }) => {
    return (
        <label htmlFor={For} className={`${classes} user-select-none`} {...rest}>
            {text}
        </label>
    )
}

// back button
export const BackButton = ({ src, title, textClass, classes, ...rest }) => {
    return (
        <div className='d-flex align-items-center'>
            <ATag src={src} classes={`d-flex align-items-center text-capitalize pointer ${classes}`} {...rest}>
                <div className='back-right-arrow'>
                    <FiArrowLeft className={'Fi-ArrowLeft'} fontSize={30} />
                </div>
                <PTag classes={`text-dark-blue fn-17 fw-bold ms-2 ${textClass}`} texts={title} />
            </ATag>
        </div>
    )
}

// SocialLogin
export const SocialIcon = ({ src, socialiconclass }) => {
    return (
        <ATag
            src={src}
            classes={`mx-3 img-fluid`}
            children={<div className='social-icon'>{socialiconclass}</div>}
        />
    )
}

// checkbox
export const Checkbox = ({ id, For, Checkboxlabel, classes, name, value, ...rest }) => {
    return (
        <div className={` form-check checkbox d-flex align-items-center ${classes}`}>
            <InputTag
                type={'checkbox'}
                classes={'form-check-input pointer m-0 '}
                id={id}
                name={name}
                checked={value}
                {...rest}
                readOnly
            />
            <LabelTag
                classes='form-check-label text-navy-blue pointer ms-2'
                For={For}
                text={Checkboxlabel}
            />
        </div>
    )
}
// PlayButton
export const PlayButton = ({ classes, ...rest }) => {
    return (
        <div
            className={`position-absolute control-box d-flex justify-content-center align-items-center ${classes}`}
            {...rest}
        >
            <FaPlay fontSize={20} color={'#fff'} className={'ms-1'} />
        </div>
    )
}
// Microphone
export const MicrophoneButton = ({ classes, ...rest }) => {
    return (
        <div
            className={`position-absolute control-box d-flex justify-content-center align-items-center ${classes}`}
            {...rest}
        >
            <FaMicrophone fontSize={20} color={'#fff'} />
        </div>
    )
}

export const RedirectCard = ({ className, text, link, label, state }) => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center w-100 my-4'>
            <h4 className='mb-2'>{text}</h4>
            <Link className={`btn semibold btn-dark-blue ${className}`} to={link} state={state}>
                {label}
            </Link>
        </div>

    )
}

export const FilterSortMenu = () => {
    const {
        setShowFilter,
        setShowSort } = useContext(MicroComponentsContext)
    return (
        <div className='d-flex justify-content-between align-item-center'>
            <div
                className='d-flex justify-content-center align-items-center border-end pe-3 pointer'
                onClick={() => setShowFilter(true)}
            >
                <MdOutlineFilterList fontSize={22} />
                <PTag classes={'text-dark-blue mx-2'} texts={'Filter'} />
                <PTag
                    classes={
                        'bg-navy-blue text-white rounded-circle w-30 h-30 d-flex mt-0 justify-content-center align-items-center'
                    }
                    texts={'2'}
                />
            </div>
            <div
                className='d-flex justify-content-center align-items-center pointer ps-3'
                onClick={() => setShowSort(true)}
            >
                <Sort width={'24'} />
                <PTag classes={'text-dark-blue mx-2'} texts={'Sort'} />
            </div>
        </div>
    )
}

export const CurrentDirectorylink = ({ routeData, className }) => {
    return (
        <ul className={`categories m-0 d-flex align-items-center ${className}`} >
            {routeData?.map((data, i) =>
                <li key={i}>
                    <div className='categories user-select-none'>
                        <div className='d-flex align-items-center text-capitalize'>
                            {routeData.length !== (i + 1) ?
                                <>
                                    <Link to={data.link} state={data?.state ?? {}} className={`text-black ${routeData.length !== (i + 1)}`}>{data.name}</Link>
                                    <BiChevronRight />
                                </> : <p title='current page'>{data.name}</p>}
                        </div>
                    </div>
                </li>
            )}
        </ul >
    )
}

export const ToogleCheckBox = ({ id, onChange }) => {
    return (
        <div className='ToogleCheckBox'>
            <input type="checkbox" className="checkbox" id={id} onChange={onChange} />
            <label className="switch" htmlFor={id}>
                <span className="circle" id="circle"></span>
            </label >
        </div >
    )
}

export const LinkBtn = ({ className, to, value, ...rest }) => {
    return (
        <Link to={to} className={`btn ${className}`} {...rest}>
            {value}
        </Link>
    )
}


// Phone input with default country
// const { nationalNumber, countryCallingCode } = parsePhoneNumber(values.mobile)
export const DefaultPhoneInput = ({ value, onChange, defaultCountry = "IN", ...res }) => {
    return <PhoneInput
        international
        countryCallingCodeEditable={false}
        defaultCountry={defaultCountry}
        value={value}
        onChange={onChange}
        {...res}
    />
}
