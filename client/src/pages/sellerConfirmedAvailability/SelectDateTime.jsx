import React from 'react'
import { Form } from 'react-bootstrap'
import { BackButton, ButtonTag, PTag } from '../../components/designComponents/MicroComponents'

const SelectDateTime = () => {
    return (
        <>
            <BackButton title={'Select Date & Time'} />
            <div className='mb-3'>
                <PTag classes={'fn-18 fw-bold text-dark-blue mb-3'} texts={'Select Month'} />
                <div className='d-flex g-5 flex-wrap'>
                    <ButtonTag classes={'btn-lite-white me-2 mb-2 px-2'} value={'Jan'} />
                    <ButtonTag classes={'btn-lite-white me-2 mb-2 px-2'} value={'Feb'} />
                    <ButtonTag classes={'btn-lite-white me-2 mb-2 px-2'} value={'Mar'} />
                    <ButtonTag classes={'btn-lite-white active me-2 mb-2 px-2'} value={'Apr'} />
                    <ButtonTag classes={'btn-lite-white me-2 mb-2 px-2'} value={'May'} />
                    <ButtonTag classes={'btn-lite-white me-2 mb-2 px-2'} value={'Jun'} />
                    <ButtonTag classes={'btn-lite-white me-2 mb-2 px-2'} value={'Jul'} />
                    <ButtonTag classes={'btn-lite-white me-2 mb-2 px-2'} value={'Aug'} />
                    <ButtonTag classes={'btn-lite-white me-2 mb-2 px-2'} value={'Sep'} />
                    <ButtonTag classes={'btn-lite-white me-2 mb-2 px-2'} value={'Oct'} />
                    <ButtonTag classes={'btn-lite-white me-2 mb-2 px-2'} value={'Nov'} />
                    <ButtonTag classes={'btn-lite-white me-2 mb-2 px-2'} value={'Dec'} />
                </div>
            </div>
            <div>
                <PTag classes={'fn-18 fw-bold text-dark-blue mb-3'} texts={'Select Date'} />
            </div>
            <div>
                <PTag classes={'fn-18 fw-bold text-dark-blue mb-3'} texts={'Set Time'} />
                <div className='border p-3 rounded-16 d-flex align-items-center'>
                    <Form.Select
                        id={'hours'}
                        className='w-auto fw-bold bg-img-none bg-lite-white shadow-none fn-20 py-2 px-3 me-2'
                    >
                        <option value='00 h'>00 h</option>
                        <option value='01 h'>01 h</option>
                        <option value='02 h'>02 h</option>
                        <option value='03 h'>03 h</option>
                        <option value='04 h'>04 h</option>
                        <option value='05 h'>05 h</option>
                        <option value='06 h'>06 h</option>
                        <option value='07 h'>07 h</option>
                        <option value='08 h'>08 h</option>
                        <option value='09 h'>09 h</option>
                        <option value='10 h'>10 h</option>
                        <option value='11 h'>11 h</option>
                        <option value='12 h'>12 h</option>
                    </Form.Select>
                    <PTag classes={'fw-bold fn-20 me-2'} texts={':'} />
                    <Form.Select
                        id={'minutes'}
                        className='w-auto fw-bold bg-img-none shadow-none bg-lite-white fn-20 py-2 px-3 me-3'
                    >
                        <option value='00 m'>00 m</option>
                        <option value='01 m'>01 m</option>
                        <option value='02 m'>02 m</option>
                        <option value='03 m'>03 m</option>
                        <option value='04 m'>04 m</option>
                        <option value='05 m'>05 m</option>
                        <option value='06 m'>06 m</option>
                        <option value='07 m'>07 m</option>
                        <option value='08 m'>08 m</option>
                        <option value='09 m'>09 m</option>
                        <option value='10 m'>10 m</option>
                        <option value='11 m'>11 m</option>
                        <option value='12 m'>12 m</option>
                        <option value='13 m'>13 m</option>
                        <option value='14 m'>14 m</option>
                        <option value='15 m'>15 m</option>
                        <option value='16 m'>16 m</option>
                        <option value='17 m'>17 m</option>
                        <option value='18 m'>18 m</option>
                        <option value='19 m'>19 m</option>
                        <option value='20 m'>20 m</option>
                    </Form.Select>
                    <Form.Select
                        id={'time'}
                        className='w-auto fw-bold bg-img-none shadow-none bg-lite-white fn-20 py-2 px-3'
                    >
                        <option value='AM'>AM</option>
                        <option value='PM'>PM</option>
                    </Form.Select>
                </div>
            </div>
        </>
    )
}

export default SelectDateTime
