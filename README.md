# Vercel Protected Script

This project puts a token check in front of your Pastebin raw URL.

## 1. Deploy

Upload this folder to GitHub and import the repository into Vercel,
or deploy it with the Vercel CLI.

## 2. Add the environment variable

In Vercel:

Project → Settings → Environment Variables

Create:

Name:
SCRIPT_KEY

Value:
use a long random secret, for example:
9d4f1a8c2e7b6d3f5a0c9e1b7f4d2a6c8b1e5f0d7a3c9e2

Then redeploy the project.

## 3. Endpoint

Without the key:

https://YOUR-PROJECT.vercel.app/api/script

The browser receives the ACCESS DENIED page.

With the key:

https://YOUR-PROJECT.vercel.app/api/script?key=YOUR_KEY

the server fetches the code from:

https://pastebin.com/raw/259cWB0A

and returns it as plain text.

## Important security limitation

If you put the key directly into a client URL such as:

loadstring(game:HttpGet("https://YOUR-PROJECT.vercel.app/api/script?key=YOUR_KEY"))()

the key is not truly secret. Anyone who obtains the client code can extract it.

For real authentication, use short-lived tokens issued by a separate authentication service rather than one permanent key.
