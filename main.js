console.log("Hola, este es mi portafolio");

const githubClientId = "YOUR_GITHUB_CLIENT_ID"; // TODO: sustituye por tu client_id
const redirectUri = window.location.origin + window.location.pathname;
const authStatus = document.getElementById("auth-status");

function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

function showAuthResult() {
    const code = getQueryParam("code");
    const state = getQueryParam("state");

    if (code) {
        authStatus.innerText = `Autenticado con GitHub. Código OAuth: ${code}. En tu backend intercambia esto por un token.`;
        return;
    }

    authStatus.innerText = "No estás autenticado. Haz click en el botón para iniciar sesión con GitHub.";
}

function startGithubSignIn() {
    const state = Math.random().toString(36).substring(2);
    const scope = "read:user";
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(githubClientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(state)}`;
    window.location.href = authUrl;
}

const btn = document.getElementById("github-signin");
if (btn) {
    btn.addEventListener("click", startGithubSignIn);
}

showAuthResult();