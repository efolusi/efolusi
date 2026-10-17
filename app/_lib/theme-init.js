/* Runs before first paint so a stored or system dark preference never flashes light. */
export const themeInit = `try{var t=localStorage.getItem('efolusi-theme');if(!t&&window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches)t='dark';if(t==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}`;
