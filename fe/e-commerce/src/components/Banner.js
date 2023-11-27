import React from 'react'

const Banner = () => {
    return (
        <div className='container w-50 mt-1'>
            <div id="carouselExampleCaptions" className="carousel slide">

                <div className="carousel-inner">
                    <div className="carousel-item active ">
                        <img src="https://assets.ajio.com/medias/sys_master/root/20230602/Dtgx/64795c65d55b7d0c633c7821/-473Wx593H-462323964-white-MODEL.jpg" className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-block bg-secondary rounded " style={{ opacity: .25 }}>
                            <h5>Nike</h5>

                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://assets.ajio.com/medias/sys_master/root/20230621/YA67/649279bcd55b7d0c638e627d/-473Wx593H-464034617-grey-MODEL.jpg" className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-block bg-secondary rounded " style={{ opacity: .25 }}>
                            <h5>Puma</h5>

                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://assets.ajio.com/medias/sys_master/root/20230623/BbG2/649555e6eebac147fcd18547/-473Wx593H-464918983-blue-MODEL.jpg" className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-block bg-secondary rounded " style={{ opacity: .25 }}>
                            <h5>Adidas</h5>

                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

export default Banner