import AppSvelte from "./App.svelte"
import './tailwindcss.css'

const app = new AppSvelte({
  target: document.getElementById('app')
})

export default app
