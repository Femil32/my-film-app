import DatePicker from 'react-multi-date-picker'
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import "react-multi-date-picker/styles/layouts/mobile.css"
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import moment from 'moment';



export const CustomDatePicker = ({ range = false, multiple = false, minDate = null, maxDate = null, value, format = 'DD-MM-YYYY', ...res }) => {
    let minDateVal, maxDateVal;
    switch (minDate) {
        case 'beforeToday':
            minDateVal = moment().toDate()
            break;
        default:
            minDateVal = new Date(minDate)
            break;
    }
    switch (maxDate) {
        case 'afterToday':
            maxDateVal = moment().toDate()
            break;
        default:
            maxDateVal = new Date(maxDate)
            break;
    }
    return (
        <DatePicker
            range={range}
            multiple={multiple}
            plugins={[<DatePanel />]}
            minDate={minDate && minDateVal}
            maxDate={maxDate && maxDateVal}
            value={value}
            format={format}
            {...res}
        />
    )
}


export const SingleDatePicker = ({ minDate = null, maxDate = null, value, format = 'DD-MM-YYYY', ...res }) => {
    let minDateVal, maxDateVal;
    switch (minDate) {
        case 'beforeToday':
            minDateVal = moment().toDate()
            break;
        default:
            minDateVal = new Date(minDate)
            break;
    }
    switch (maxDate) {
        case 'afterToday':
            maxDateVal = moment().toDate()
            break;
        default:
            maxDateVal = new Date(maxDate)
            break;
    }
    return (
        <DatePicker
            minDate={minDate && minDateVal}
            maxDate={maxDate && maxDateVal}
            value={value}
            format={format}
            {...res}
        />
    )
}

export const CustomTimePicker = ({ ...res }) => {
    return (
        <DatePicker
            disableDayPicker
            format="HH:mm:ss"
            plugins={[
                <TimePicker />
            ]}
            inputClass={'border-none'}
            containerClassName={'w-100 form-control'}
            {...res}
        />
    )
}