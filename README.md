# cookit project

This is a project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template.

_Note that you will need to have [Node.js](https://nodejs.org) installed. For production mode you also need docker and docker-compose installed and setup_

---

Additionally, we added scss and sass support [sveltePreprocess](https://github.com/sveltejs/svelte-preprocess).

### Built With

Inititally the app consists of a svelte frontend which the user can access and talk to. The stream gets send to a node server which pipes the stream to a Rhasspy server and vice verca.

## Get started

### Development

Install the dependencies...

```bash
cd cookit-ui
```

either start with

- npm, svelte

to start the frontend 

```bash
cd frontend 
npm install
npm run dev
```

to start the server 

```bash
cd server 
npm install
npm run start
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.
Frontend connects to server via websocket.

or start with

- docker

```bash
docker-compose build
docker-compose up
```

---

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.


