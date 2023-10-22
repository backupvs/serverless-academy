## About app

CLI primitive database application to store users in TXT file and fetch them

## Task

After launching the program, a message is displayed asking for a name, meaning we enter the user creation mode:

- Then you are prompted to choose a gender from the list;
- Then specify age;
- then the cycle with adding a user repeats. In this way you can add another user.

To **stop adding users**, just **press ENTER** instead of entering the name.

After refusing to add another user, the application prompts you to find the user by name in the database. You can choose between two answers: Y/N. If you choose N, exit, and if you choose Y, perform the search and inform you about the results: if the user is found in the database, display all the information about him/her, if not - indicate that such a user does not exist.

#### Important notes

- You should use a regular text file (.txt) as your database. Add new users without overwriting previously added ones.
- Organize data storage in your database so that each user can be easily turned into an object (`JSON.parse` and `JSON.stringify`should work just fine).
- Pay attention to the search algorithm and take the variant that a user can write a request in caps lock, but still have to get a valid result

## To start the application:

```bash
npm  start
```

or

```bash
node  src/index.js
```
