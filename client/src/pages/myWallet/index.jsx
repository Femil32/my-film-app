import { Route, Routes } from 'react-router-dom'
import MyWallet from './MyWallet'
import { TransactionDetails } from './TransactionDetails'

const MyWalletRoute = () => {
    return (
        <Routes>
            <Route exact path='/' element={<MyWallet />} />
            <Route exact path='/transactionDetails' element={<TransactionDetails />} />
        </Routes>
    )
}

export default MyWalletRoute
