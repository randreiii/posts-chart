import React from "react";
import { usePosts } from "../../hooks/usePosts";
import Histogram from '../histogram/Histogram'

const convertDate = (date) => {
    return new Date(parseInt(date))
};

let months = [];

const PostsList = () => {
    const {data, loading, error} = usePosts()
    console.log({data, loading, error});

    const getMonthFromDate = () => {
        data?.allPosts.map((post) => {
            let month = convertDate(post.createdAt).getMonth() + 1;
            months.push(month)
        })
    }

    console.log(data.allPosts)
    getMonthFromDate();

    let monthsFreq = months.reduce((acc, curr) => {
        if (typeof acc[curr] === 'undefined') {
          acc[curr] = 1;
        } else {
          acc[curr] += 1;
        }
        return acc;
      }, {});
        

    if (loading) return <p>loading...</p>
    if (error) return <p>something went wrong</p>

    return (
        <div>
        <Histogram data={monthsFreq}/>
        </div>
    )
}

export default PostsList;