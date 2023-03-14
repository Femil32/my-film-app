import React, { useState } from 'react';
import CustomLoader from '../customLoader';

export const IsLoadingHOC = (WrappedComponent) => {
    function HOC(props) {
        const [isLoading, setLoading] = useState(true);
        const setLoadingState = isComponentLoading => {
            setLoading(isComponentLoading);
        };

        return (
            <>
                {isLoading && <CustomLoader message={'We are loading your data!'} />}
                <WrappedComponent {...props} setLoading={setLoadingState} />
            </>
        );
    }
    return HOC;
};
export default IsLoadingHOC;