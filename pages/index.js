import { Fragment, useEffect, useState } from 'react';
import MeetupList from './../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

// const DUMMY_MEETUPS=[
//     {
//         id:'m1',
//         title:'A First Meetup',
//         image:'https://d2zp5xs5cp8zlg.cloudfront.net/image-79322-800.jpg',
//         address:'Some address 5, 12345 Some City',
//         description: 'This is a first meetup'
//     },
//     {
//         id:'m2',
//         title:'A Second Meetup',
//         image:'https://d2zp5xs5cp8zlg.cloudfront.net/image-79322-800.jpg',
//         address:'Some address 10, 12345 Some City',
//         description: 'This is a second meetup'
//     }
// ]
function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name='description' content='Browse a hug list of highly active React meetups'/>
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>


    )
}
// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//     //fetch data from an API
//     return{
//         props:{
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }
export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://a:3ylJ8v8pKALkG3g5@cluster0.7kyvmdj.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();
    client.close();

    return {
        props: {
            meetups: meetups.map(meetups => ({
                title: meetups.title,
                address: meetups.address,
                image: meetups.image,
                id: meetups._id.toString()
            }))
        },
        revalidate: 10 //The web page will automatically update. After the specified time
    };
}
export default HomePage;