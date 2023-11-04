## About app

API service for making short links.

## Interface

<details>
  <summary> <b>GET</b> /:path - redirects to corresponding destination</summary>
  
  - 302 **Found** - Redirects to destination URL.
  - 404 **Not Found** - Path was not found.

</details>

<details>
  <summary><b>POST</b> /short-link - creates and returns short link</summary>
  
  - 201 **Created** - Returns JSON with short link.
  - 400 **Bad Request** - Invalid URL.

    Requst body example:
    ```json
      {
        "url": "https://very.long/url?very=long&params=etc"
      }
      ```

    Response body example:

    ```json
      {
        "shortLink": "http://base-url/j3fmF3qmDN"
      }
      ```

</details>

## To start the application:

#### Dev

```bash
npm install
npm run start:dev
```

#### Prod

```bash
npm install
npm run build && npm run start:prod
```
