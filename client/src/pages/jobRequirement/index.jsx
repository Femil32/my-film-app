import { Navigate, Route, Routes } from 'react-router-dom'
import JobRequiremnt from './JobRequiremnt'

const CreateProfile = () => {
    return (
        <Routes>
            <Route exact path='/' element={<JobRequiremnt />} />
            <Route
                path="*"
                element={<Navigate to="/" replace={true} />}
            ></Route>
        </Routes>
    )
}

export default CreateProfile
