import styled from 'styled-components';
import pic1 from '../assets/images/1.jpg';
import pic2 from '../assets/images/2.jpg';
import pic3 from '../assets/images/3.jpg';
import pic4 from '../assets/images/4.jpg';
import pic5 from '../assets/images/5.jpg';
import pic6 from '../assets/images/6.jpg';
import pic7 from '../assets/images/7.jpg';
import pic8 from '../assets/images/8.jpg';
import pic9 from '../assets/images/9.jpg';

const Carousel = () => {
	return (
		<Container>
			<CarouselContainer>
				<Wrapper>
					<Image src={pic1} alt='bleach' />
				</Wrapper>
				<Wrapper>
					<Image src={pic2} alt='charizard' />
				</Wrapper>
				<Wrapper>
					<Image src={pic3} alt='demon_slayer' />
				</Wrapper>
				<Wrapper>
					<Image src={pic4} alt='jujutsu' />
				</Wrapper>
				<Wrapper>
					<Image src={pic5} alt='one_punch' />
				</Wrapper>
				<Wrapper>
					<Image src={pic6} alt='blue_lock' />
				</Wrapper>
				<Wrapper>
					<Image src={pic7} alt='zoro' />
				</Wrapper>
				<Wrapper>
					<Image src={pic8} alt='natsu' />
				</Wrapper>
				<Wrapper>
					<Image src={pic9} alt='goku' />
				</Wrapper>
			</CarouselContainer>
		</Container>
	);
};

export default Carousel;

const Container = styled.div`
	position: relative;
	width: 320px;
	margin: 0em auto;
	perspective: 1000px;
`;
const CarouselContainer = styled.div`
	width: 100%;
	height: 100%;
	transform-style: preserve-3d;
	animation: rotate360 35s infinite forwards linear;
`;
const Wrapper = styled.div`
    border: 3px solid white;
	position: absolute;
	width: 12em;
	height: 10em;
	top: 20px;
    border-radius: 10px;
    left: 15%; 
	background-color: black;
	background-size: cover;
	box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.5);
	display: flex;
	:nth-child(1) {
		transform: rotateY(0deg) translateZ(430px);
	}
	:nth-child(2) {
		transform: rotateY(40deg) translateZ(430px);
	}
	:nth-child(3) {
		transform: rotateY(80deg) translateZ(430px);
	}
	:nth-child(4) {
		transform: rotateY(120deg) translateZ(430px);
	}
	:nth-child(5) {
		transform: rotateY(160deg) translateZ(430px);
	}
	:nth-child(6) {
		transform: rotateY(200deg) translateZ(430px);
	}
	:nth-child(7) {
		transform: rotateY(240deg) translateZ(430px);
	}
	:nth-child(8) {
		transform: rotateY(280deg) translateZ(430px);
	}
	:nth-child(9) {
		transform: rotateY(320deg) translateZ(430px);
	}
`;
const Image = styled.img`
	margin: auto;
	width: 100%;
  height: 100%;
  border-radius: 10px;
  opacity: 1;
	@keyframes rotate360 {
		from {
			transform: rotateY(0deg);
		}
		to {
			transform: rotateY(-360deg);
		}
	}
`;