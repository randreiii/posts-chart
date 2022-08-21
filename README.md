# Number of posts chart

This project was bootstrapped with React JS.

## Run in dev mode 

### `npm start`

The process of making this application consists of several steps: 

1. Creating a new repo on Github and connecting it to my local files
2. Doing a research about the technologies that will be used, namely, visx, d3, graphql and data visualization
3. Connecting our React application to the graphql server, with its endpoint https://fakerql.goosfraba.ro/graphql
For this I have chosen Apollo client framework. 
4. Create a query in order to fetch the required data. Since graphql is used for api communication, I could specify the type of data that needs to be fetch (allPosts -> createdAt). I needed to convert the date for createdAt with new Date object since the data that I was getting represented a UTF-8 character sequence, which is a free-form human readable text. 
5. Afterwards, a query hook was created in order to avoid duplicate code within the project. 
6. Now that we have the required data, we could begin making the histogram, which will display the number of posts for each month of year 2019. 
For this, I have decided to use visx with d3 js. 

Challanges faced during the process: 

-> make the bars pop up for each month on the histogram <br/>
-> position of the tooltip that will show the specific number of posts created for a month 
