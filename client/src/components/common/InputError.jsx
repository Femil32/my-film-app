import { Info } from '../../components/AllSvgs'
import { PTag } from '../designComponents/MicroComponents'

const InputError = props => {
    return (
        <div className={`d-flex text-capitalize align-items-center ${props.className}`}>
            <Info className='error-icon' width={'20'} />
            <PTag classes={'ms-1 fn-12 text-red'} texts={props.errorTitle} />
        </div>
    )
}

export default InputError
