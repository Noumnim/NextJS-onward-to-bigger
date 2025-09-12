import { useEffect, useState } from 'react';
import MeetupList from './../components/meetups/MeetupList';

const DUMMY_MEETUPS=[
    {
        id:'m1',
        title:'A First Meetup',
        image:'https://d2zp5xs5cp8zlg.cloudfront.net/image-79322-800.jpg',
        address:'Some address 5, 12345 Some City',
        description: 'This is a first meetup'
    },
    {
        id:'m2',
        title:'A Second Meetup',
        image:'https://d2zp5xs5cp8zlg.cloudfront.net/image-79322-800.jpg',
        address:'Some address 10, 12345 Some City',
        description: 'This is a second meetup'
    }
]
function HomePage(props) {
    return(
        
            <MeetupList meetups={props.meetups}/>  
        
    )
}
export async function getStaticProps(){
return{
    props:{
        meetups:DUMMY_MEETUPS
    }
};
}
export default HomePage;