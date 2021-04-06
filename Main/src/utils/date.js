import moment from 'moment'
const dateUtil = {
    dateTime: (date) => {
        return date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : ''
    },
    date: (date) => {
        return date ? moment(date).format('YYYY-MM-DD') : ''
    },
    year: (date) => {
        return date ? moment(date).format('YYYY') : ''
    }
}

export default dateUtil
