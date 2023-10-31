## About app

Fetches data from the specified endpoints and outputs a report.

## Task

You have a list of 20 API endpoints. Each of them returns a response in a different format and with different key/value pairs. But they all have one thing in common - absolutely all GET requests return JSON that has an `isDone` key with a boolean value. The queries are divided into four types, where the key/value pair you're looking for is on different nesting levels.

#### Requirements

1.  Write an application that queries all of the aforementioned endpoints. Design a scenario where a request will be sent several times (up to three times is enough) in case the previous request fails. If there is no response, exclude the result from the output, but print the error in the console. Execute queries sequentially through async/await;
2.  In all received endpoints you need to find the `isDone` key and find out whether it is `True` or `False`.

The output of your app should look like this:

```bash
$ node json-sorting.js
[Success] https://jsonbase.com/sls-team/json-1: isDone - True
[Success] https://jsonbase.com/sls-team/json-4: isDone - False
[Success] https://jsonbase.com/sls-team/json-2: isDone - False
[Fail] https://jsonbase.com/sls-team/json-5: The endpoint is unavailable

Found True values: 14,
Found False values: 6
```

## To start the application:

```bash
npm start
```

or

```bash
node index.js
```
