import React, { useState } from 'react'

const index = ({ children, onClick, onKeyDown, ...res }) => {

    const [inputValue, setInputValue] = useState(null)

    return (
        <div className={`searchBox ${inputValue && 'active'}`}>
            <input
                className="searchInput"
                type="text"
                name=""
                placeholder="Search"
                onKeyDown={onKeyDown}
                onChange={(e) => {
                    setInputValue(e.target.value && true)
                }}
                onFocus={() => {
                    setInputValue(true)
                }}
                {...res}
            />
            <button
                className="searchButton"
                href="#"
                onClick={onClick}>
                {children}
            </button>
        </div>
    )
}

export default index