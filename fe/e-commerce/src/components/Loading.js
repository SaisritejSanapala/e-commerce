import React from 'react'

const Loading = (props) => {
    return (
        <>
            {props.loading ? <div className='col-md-12 mt-3 text-center'>
                < div className="spinner-border text-primary" role="status" >
                    <span className="visually-hidden">Loading...</span>
                </div >
            </div >: "" }
        </>
    )
}

export default Loading