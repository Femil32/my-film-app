import { ImgTag, PTag } from '../designComponents/MicroComponents'
import { OfferIcon } from '../../assets/img'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'
//icons
import { AiFillHeart } from 'react-icons/ai'

const ImageSlider = ({ images }) => {
    return (
        <div className='position-relative rounded-10 max-h-300 overflow-hidden product-img mb-3 remove-position'>
            {/* Image Slider */}
            <Splide
                options={{
                    rewind: true,
                    gap: '1rem',
                }}
            >
                {images.map((img, index) => (
                    <SplideSlide key={index}>
                        <ImgTag src={img} alt='img' classes='img-fluid w-100 h-100' />
                    </SplideSlide>
                ))}
            </Splide>

            {/* Offer Icon */}
            <div className='bg-dark-orange d-flex align-items-center rounded-3 position-absolute top-10 start-10 px-2 py-1'>
                <ImgTag src={OfferIcon} alt='offer' />
                <PTag texts='20% OFF' classes='text-white bold ms-2' />
            </div>

            {/* Heart Icon */}
            <div className='like-box Ai-Fill-Heart-parent d-flex justify-content-center align-items-center pointer'>
                <AiFillHeart className={'Ai-Fill-Heart'} />
            </div>
        </div>
    )
}

export default ImageSlider