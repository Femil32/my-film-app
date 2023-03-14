import React from 'react'
import { LoaderSvg } from '../AllSvgs'

const MiniLoader = ({className , style,width,height}) => {
    return (
        <div className={`${className || 'w-100 h-100'} d-flex justify-content-center align-items-center`} style={style}>
            <LoaderSvg width={width || '100'} height={height || '100'} />
        </div>
    )
}

export default MiniLoader
