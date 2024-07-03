let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
const btnSair = document.getElementById("sair")


function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);        
        window.location.href = "lista-jogos.html";
    }
}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return "";
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    
    window.location.href = "tela-inicial.html";
}
checkLogged();
                
btnSair.addEventListener("click", logout);

//Logar no Sistema
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;
    const account = getAccount(email);
    
    if(!account) {
        alert("Ops! Verifique o usuário ou a senha.")
        return;
    }
    
    if(account) {
        if(account.password !== password) {
            alert("Ops! Verifique o usuário ou a senha.")
            return;
        }
        
        saveSession(email, checkSession);
        window.location.href = "tela-inicial.html";
    }
})

//Criar Conta
document.getElementById("create-form").addEventListener("submit", function(e) {
        e.preventDefault();
    
        const email = document.getElementById("email-create-input").value;
        const password = document.getElementById("password-create-input").value;
        const confirmPassword = document.getElementById("password-confirm").value;
    
        if(email.length < 5) {
                alert("Preencha o campo com um e-mail válido.")
                return;
            }
        
            if(confirmPassword !== password) {
                    alert("As senhas não são iguais.")
                    return;
                }
            
                saveAccount({
                        login: email,
                        password: password,
                    });
                
                    alert("Conta criada com sucesso.");
                    window.location.href = "tela-inicial.html"
                });
