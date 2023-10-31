## About app

Program that has methods to:

1.  Determine how many **unique usernames** there are in all the specified files (occurring at least once in any of the files);
2.  Determine how many usernames occur in **all 20 files**;
3.  Find out how many usernames occur in **at least 10 files**.

## Task

You have 20 text files ([download](https://www.dropbox.com/sh/n27tw64o6w4pb7q/AADUnH6b8c-eHCZAm8K0aCSra?dl=0)), each with 100,000 word combinations. The total is 2 million word combinations. They were generated from two batches of 400 random words each, so they are repeatedly repeated in all or some of the files.

#### Requirements

Your program should have 3 different functions that return an integer. For example:

```ts
uniqueValues(); // returns 1234
existInAllFiles(); // returns 42
existInAtleastTen(); // returns 50
```

## To start the application:

```bash
npm start

```

or

```bash
node index.js

```
