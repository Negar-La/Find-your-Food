import styled from 'styled-components';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import pic1 from '../assets/images/1.jpg';
import pic2 from '../assets/images/2.jpg';
import pic3 from '../assets/images/3.jpg';
import pic4 from '../assets/images/4.jpg';
import pic5 from '../assets/images/5.jpg';
import pic6 from '../assets/images/6.jpg';
import pic7 from '../assets/images/7.jpg';
import pic8 from '../assets/images/8.jpg';
import pic9 from '../assets/images/9.jpg';

const Slider = () => {

	const responsive = {
		superLargeDesktop: {
		  // the naming can be any, depends on you.
		  breakpoint: { max: 4000, min: 3000 },
		  items: 5
		},
		desktop: {
		  breakpoint: { max: 3000, min: 800 },
		  items: 3
		},
		tablet: {
		  breakpoint: { max: 800, min: 464 },
		  items: 2
		},
		mobile: {
		  breakpoint: { max: 464, min: 0 },
		  items: 1
		}
	  };



	return (
		<Carousel responsive={responsive}   
				  showDots={true} 
				  autoPlay={true}  
				  containerClass="carousel-container" 
				  swipeable={true}
				  rewind={true}
				  rewindWithAnimation={true}
		> 
			<Div><Img  src={pic1} alt='bleach' /></Div>
			<Div><Img  src={pic2} alt='bleach' /></Div>
			<Div><Img  src={pic3} alt='bleach' /></Div>
			<Div><Img  src={pic4} alt='bleach' /></Div>
			<Div><Img  src={pic5} alt='bleach' /></Div>
			<Div><Img  src={pic6} alt='bleach' /></Div>
			<Div><Img  src={pic7} alt='bleach' /></Div>
			<Div><Img src={pic8} alt='bleach' /></Div>
			<Div><Img src={pic9} alt='bleach' /></Div>
	    </Carousel>
	);
};

export default Slider;

const Div = styled.div`
	width: 230px;
	margin: auto;
`

const Img = styled.img`
  width: 100%;
  height: 290px;
  border-radius: 5px;
  object-fit: cover;
`;