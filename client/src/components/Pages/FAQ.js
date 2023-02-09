import Faq from "react-faq-component";
import styled from "styled-components";
import {AiOutlinePlus} from "react-icons/ai";
import {AiOutlineMinus} from "react-icons/ai";

//array of object to display questions(title) and answer(content)
const data = {
    title: "FAQ (Frequently Asked Questions)",
    rows: [
        {
            title: "What is Find your Food?",
            content: `Don't you have enough time to cook? Are you tired of fast food/ restaurants? Find your trusted home cooks in your neighbourhoods! 'Find your Food' is a homemade Iranian food marketplace that connects you to talented home cooks in your neighbourhood.`,
              
        },
        {
            title: "How does this platform work?",
            content:
                "In this platform, you can surf meals with authentic recipes made from fresh ingredients and get connected with the cook",
        },
        {
            title: "What types of foods are posted?",
            content: `This platform covers every type of Iranian food including appetizers, main courses and desserts. You can select your favourite ones and send a message to cook to pickup the food directly`,
        },
        {
            title: "What information are provided about the foods?",
            content: "Some useful data are provided in the food details section including food type, name, cook's name, phone and address (shown on google map), ingredients, price, and some details about the food if is needed",
        },
        {
            title: "What features this platform provides?",
            content: `If the user is not loged in, he can see all the posts in homepage however, in order to be able to add a post to favorite list or make a new post and edit/delete it or send a message to cook, the user needs to be loged in`,
        },
        {
            title: "How is the coverage of this platform?",
            content:
                " 'Find your Food' is currently operating in Great Montreal. If you are a talented home cook in great Montreal, we'd love for you to join us as a partner cook!",
        },
        {
            title: "Why do people like homemade food?",
            content: " Home cooked food is healthier than fast food or takeout. The nutritional value of the produce used will be maintained when you cook at home. Usually, the takeout that you order will have a lot of oil, butter and spices which might not be healthy, especially when eaten on a daily basis.",
        },
    ],
};
//little styling for title 
const styles = {
    titleTextColor: '#480987',
    rowTitleColor: 'purple',
    rowContentTextSize: '19px',
    rowContentPaddingBottom: '15px',
    rowContentPaddingLeft: '30px',  
};

const config = {
    animate: true,
    arrowIcon: "V",
    openOnload: 0,
    expandIcon: <AiOutlinePlus />,
    collapseIcon: <AiOutlineMinus />,
};
//returns the question and answer for the FAQ page
const FAQ = () => {
    return (
        <Div>
            <Wrapper>
            <Faq 
                data={data}
                styles={styles}
                config={config}
            />
           
            </Wrapper>
            
        </Div>
    );
}
const Wrapper = styled.div`
   margin:40px 100px;
   box-shadow:rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    border-radius: 20px;
    text-align: justify;
    padding:25px;
    background:white;
    @media (max-width: 750px) {
        margin:40px 20px;
}

&:hover:enabled {
    cursor: pointer;
    transition: all 0.5s ease;
    transform: scale(1.05);
}
`;
 const Div = styled.div`
    
 `;
export default FAQ;