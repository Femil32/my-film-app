import React, { useState } from 'react'

const TabScroll = ({ tabs, children }) => {
    const [currentTab, setCurrentTab] = useState(0)
    return (
        <div className='border-teb mb-3'>
            <nav className='navbar pb-0'>
                <ul className='nav nav-pills'>
                    {tabs.map((tab, i) => {
                        return (
                            <li className='nav-item' key={tab.id} onClick={() => {
                                setCurrentTab(i)
                            }}>
                                <a className={`nav-link ${currentTab === i && 'active'}`} href={`#${tab.id}`}>
                                    {tab.lable}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <div className='scrollspy px-2 mt-2'>
                {children}
            </div>
        </div>
    )
}

export default TabScroll


{/* <div className='scrollspy px-2 mt-2'>
                {tabData.map(data => {
                    return (
                        <div id={data.id} key={data.id}>
                            {data.content}
                        </div>
                    )
                })}
            </div> */}