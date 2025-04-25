import { ExclamationTriangleFill } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";

function Error() {

    const error = useLocation().state || { code: 0, message: 'Unknown error'};

    return (
        <>
            <div className='row'>
                <div className='col-4 d-none d-lg-block'></div>
                <div className='error col-lg-4'>
                    <h1>
                        <ExclamationTriangleFill className='error-sign'></ExclamationTriangleFill>
                    </h1>
                    <h1>{error.code}</h1>
                    <h2 className='error-message'>{error.message}</h2>
                </div>
                <div className='col-4 d-none d-lg-block'></div>
            </div>
        </>
    )

}

export default Error;