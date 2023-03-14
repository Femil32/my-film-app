import { ImgTag } from '../designComponents/MicroComponents'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'

const ImageSliderWithoutOffer = ({ images }) => {
    return (
        <>
            <div className='position-relative rounded-10 max-h-300 overflow-hidden product-img mb-3 remove-position border'>
                {/* Image Slider */}
                <Splide
                    options={{
                        rewind: true,
                        gap: '1rem',
                        height: '250px',
                    }}
                >
                    {images?.map((img, index) => (
                        <SplideSlide key={index}>
                            <div className='position-relative h-100'>
                                <span className='gradient-black position-absolute bottom-0 w-100 h-25'></span>
                                <ImgTag src={img} alt='img' classes='object-fit-contain w-100 h-100' />
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </>
    )
}

export default ImageSliderWithoutOffer
