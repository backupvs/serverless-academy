## About app

API that allocates endpoint to get country by client IP using local csv file with IP ranges and countries.

## Task

#### Requirements

So, you have a CSV [table](https://www.dropbox.com/s/0xbas2hwxac06e9/IP2LOCATION-LITE-DB1.CSV?dl=0) where you will find a long list of rows with IP ranges (from and to - 1st and 2nd columns respectively), as well as the country to which these IPs are issued.

Your task is to write a web application in [Express](https://expressjs.com/), allocating an endpoint by which a server-hosted algorithm can detect where the user is coming from and return both the IP address value and the country from which the request was made.

So, in total, your API should:

- Detect user's IP;
- Determine user's location by IP using a CSV database;
- Return the user's address range (in a human-readable form) and country from the csv table.

#### How to verify your solution

We have prepared for you a list of IP addresses that are allocated to specific countries. If you've done everything correctly, your script should successfully return a response (or output to the console) indicating the correct country when you send the IP in the body of the request:

```markdown
Chile — 45.232.208.143
Armenia — 185.182.120.34
Mexico — 45.177.176.23
Turkey — 5.44.80.51
Norway — 91.149.48.22
Spain — 83.229.33.3
Cyprus — 203.24.108.65
UK — 23.43.23.15
Ireland — 89.28.176.5
Romania — 77.83.248.211
```

## To start the application:

```bash
npm install
npm start
```
