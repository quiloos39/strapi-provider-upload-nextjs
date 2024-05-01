# Strapi Next.js Upload Plugin

This plugin let's you upload files to Next.js public folder.

## Installation

```bash
# using yarn
yarn install strapi-provider-upload-nextjs

# using npm
npm install strapi-provider-upload-nextjs
```

## Configuration

### Strapi Related Configuration

`./config/middlewares.js`

```js
[
  //...
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "localhost:3000", // Add host here
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "localhost:3000", // Add host here
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  // ...
];
```

`./config/plugins.ts`

```js
{
  // ...
  upload: {
    config: {
      provider: "strapi-provider-upload-nextjs",
      providerOptions: // Optional
      {
        nextURL: "http://localhost:3000", // Will default to http://localhost:3000
      },
    },
  },
  // ...
}
```

### Next.js Related Configuration

You need to create 2 routes in Next.js
`/api/next-upload/upload` and `/api/next-upload/remove`.

`/api/next-upload/upload`

```ts
import { upload } from "strapi-provider-upload-nextjs";

export const POST = async (request: Request) => {
  const { url } = await upload(request);
  return new Response(JSON.stringify({ url }));
};
```

`/api/next-upload/remove`

```ts
import { remove } from "strapi-provider-upload-nextjs";

export const POST = async (request: Request) => {
  await remove(request);
  return new Response(null, { status: 204 });
};
```
