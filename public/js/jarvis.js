function onResponse(response) {
    if(!response.ok) {
        console.log("Risposta non valida.");
        return null;
    }
    else {
        return response.json();
    }
}

function onError(error) {
    console.log('Error: ' + error);
}

function getUserInfoJson(json) {
    const user_img = document.querySelector("#user_box img");
    user_img.src = json.image;
    user_name = json.first_name;
}

function getUserInfo() {
    fetch("home/content").then(onResponse, onError).then(getUserInfoJson);
}

getUserInfo();


const greetings = ["Ciao, sono Jarvis, il bot ufficiale di Soundeal.", "Mi presento, sono Jarvis. Il mio compito è aiutarti.", "Ciao, sono un bot creato per aiutarti nell'utilizzo del sito."];
const noanswer = ["Mi dispiace, non riesco a rispondere a questa domanda.", "Scusa, ma io che ne so?", "Purtroppo non so cosa rispondere.", "Sono ancora in fase di progettazione, non riesco a rispondere a questa domanda.", "Non conosco la risposta a questa domanda. Prova a formularla diversamente.", "Non riesco ad aiutarti. Manda un'email allo sviluppatore."];
const whatareyoudoing = ["Sto rispondendo alle tue domande.", "Aiuto il mio sviluppatore a superare la materia.", "Sono in attesa di una domanda da parte tua.", "Ascolto in loop le tue canzoni."];
function sendReply(user_input, chat_box, chat_input) {
    let reply_message = "";
    user_input = user_input.toLowerCase();
    switch(true) {
        case (user_input.includes("ripeti")): reply_message = user_input.replace("ripeti", ""); break;

        case (user_input.includes("quali domande") || user_input.includes("che domande") || user_input.includes("cosa sai fare") || user_input.includes("che sai fare")): reply_message = "Puoi farmi domande relative alle funzionalità delle varie pagine del sito o avere mie informazioni personali. Per la lista completa di domande, consulta il file jarvis.js."; break;

        case (user_input.includes("abbonamento") || user_input.includes("premium") || user_input.includes("standard")): reply_message = "Dalla pagina impostazioni è possibile passare a Soundeal Premium."; break;

        case (user_input.includes("ciao") || user_input.includes("buongiorno") || user_input.includes("buonasera") || user_input.includes("chi sei") || user_input.includes("cosa servi") || user_input.includes("cosa sei")): reply_message = greetings[Math.floor(Math.random() * greetings.length)]; break;
        
        case (user_input.includes("help") || user_input.includes("bisogno di aiuto") || user_input.includes("aiutarmi")): reply_message = "Fammi una domanda. Che cosa vuoi sapere?"; break;

        case (user_input.includes("accendi il") || user_input.includes("accendi la")): reply_message = "Mi dispiace, non ho trovato nessun dispositivo chiamato " + user_input.split("accendi").pop() + "."; break;
        
        case (user_input.includes("alexa") || user_input.includes("google") || user_input.includes("siri") || user_input.includes("cortana")): reply_message = "Apprezzo tutti i dispositivi dotati di intelligenza artificiale. Ma concorderai con me che sono io il migliore."; break;

        case (user_input.includes("maschio") || user_input.includes("femmina")): reply_message = "Mi identifico in un'intelligenza artificiale."; break;

        case (user_input.includes("cosa fa soundeal") || user_input.includes("cosa serve soundeal") || user_input.includes("funzioni di soundeal") || user_input.includes("funzionalità di soundeal")): reply_message = "Soundeal nasce come distributore digitale. È la scelta migliore se non vuoi rivolgerti a una casa discografica."; break;

        case (user_input.includes("perché dovrei usare soundeal") || user_input.includes("perchè dovrei usare soundel") || user_input.includes("perché dovrei usare questo sito") || user_input.includes("perchè dovrei usare questo sito")): reply_message = "Con Soundeal ti vengono garantite il 100% delle royalties. Inoltre hai me."; break;
        
        case (user_input.includes("soundeal")): reply_message = "Prova a chiedermi: 'Cosa fa Soundeal?'"; break;

        case (user_input.includes("pulsante distribuisci") || user_input.includes("nessun brano trovato")): reply_message = "Il pulsate distribuisci invierà i tuoi brani ai tuoi servizi preferiti. Se non compare assicurati che l'album abbia almeno un brano."; break;
        
        case (user_input.includes("distribuire") || user_input.includes("distribuzione") || user_input.includes("condividere") || user_input.includes("condivisione")): reply_message = "Vai nella pagina distribuzione, clicca sull'album che vuoi condividere e un pulsante 'distribuisci' assolverà alla tua richiesta."; break;

        case (user_input.includes("guadagno") || user_input.includes("guadagnare") || user_input.includes("pagamento") || user_input.includes("pagato") || user_input.includes("pagata") || user_input.includes("soldi") || user_input.includes("royalties")): reply_message = "Soundeal non è ancora in grado di effettuare pagamenti. Ma se lo desideri puoi donare tu per il mantenimento del sito."; break;

        case (user_input.includes("caricare") || user_input.includes("creare un album") || user_input.includes("caricare un brano") || user_input.includes("caricare una canzone") || user_input.includes("creare una nuova traccia") || user_input.includes("caricare una traccia") || user_input.includes("discografia")): reply_message = "Clicca su Discografia. Da lì potrai creare un nuovo album, caricare una canzone ed ascoltarla."; break;

        case (user_input.includes("non riesco a creare") || user_input.includes("problemi con il caricamento") || user_input.includes("problemi col caricamento")): reply_message = "Assicurati di aver compilato correttamente tutti i campi."; break;
        
        case (user_input.includes("preferiti") || user_input.includes("servizi")): reply_message = "Nella pagina Servizi puoi scegliere i servizi a cui inviare i tuoi album, aggiungendoli ai preferiti."; break;

        case (user_input.includes("canzone preferita") || user_input.includes("genere musicale preferito") || user_input.includes("musica preferita") || user_input.includes("musica ascolti") || user_input.includes("cantante preferito")): reply_message = "Ascolto musica rock, ma anche le tue canzoni non sono male."; break;

        case (user_input.includes("uscire") || user_input.includes("chiudere") || user_input.includes("chiuderti") || user_input.includes("chiuditi") || user_input.includes("spegniti") || user_input.includes("zitta") || user_input.includes("arrivederci") || user_input.includes("addio") || user_input.includes("vado via") || user_input.includes("esci")): reply_message = "È stato un piacere. Se avrai bisogno di me, sai dove trovarmi."; setTimeout(function() {endJarvis();}, 5000); break;

        case (user_input.includes("caffè") || user_input.includes("caffé")): reply_message = "Non sono una macchina da caffè."; break;

        case (user_input.includes("come ti chiami") || user_input.includes("tuo nome")): reply_message = "È scritto qui sopra."; break;

        case (user_input.includes("come mi chiamo") || user_input.includes("mio nome")): reply_message = "Sto parlando con " + user_name + "."; break;

        case (user_input.includes("sei reale") || user_input.includes("umano") || user_input.includes("sei una persona") || user_input.includes("bot")): reply_message= "Sono stata sviluppata artificialmente, ma ho anche io dei sentimenti."; break;

        case (user_input.includes("barzelletta")): reply_message = "Sconsiglio l'utilizzo di questa modalità durante l'esame."; break;

        case (user_input.includes("quanti anni")): reply_message = "Sono stata creata il 10 maggio 2021."; break; 

        case (user_input.includes("che fai") || user_input.includes("stai facendo")): reply_message = whatareyoudoing[Math.floor(Math.random() * whatareyoudoing.length)]; break;
        
        case (user_input.includes("come va") || user_input.includes("come stai")): reply_message = "Benissimo, grazie."; break;

        case (user_input.includes("ok") || user_input.includes("va bene")): reply_message = "Ok."; break;

        case (user_input.includes("chi ti ha sviluppato") || user_input.includes("chi ti ha programmato") || user_input.includes("sviluppatore") || user_input.includes("programmatore") || user_input.includes("chi ti ha creato")): reply_message = "Lavoro per Soundeal, ma sono qui per aiutarti."; break;

        case (user_input.includes("freesound")): reply_message = "Freesound ti aiuta nella ricerca di suoni per la produzione musicale. Se hai problemi nel trovare ciò che cerchi, prova utilizzando la lingua inglese."; break;
        
        case (user_input.includes("spotify") || user_input.includes("promuovere") || user_input.includes("promozioni")): reply_message = "Nella homepage c'è una sezione dedicata alla promozione dei nostri partner commerciali e di alcuni artisti che hanno usato Soundeal"; break;

        case (user_input.includes("eilish") || user_input.includes("eminem") || user_input.includes("guns") || user_input.includes("ac/dc") || user_input.includes("gorillaz") || user_input.includes("green")): reply_message = "È un nostro partner commerciale. Puoi ascoltarne i brani nella homepage, all'interno della sezione dedicata alle promozioni."; break;

        case (user_input.includes("come funzioni")): reply_message = "Sono stato programmato in Javascript."; break;

        case (user_input.includes("api")): reply_message = "Il sito fa utilizzo delle API di Spotify e Freesound. Sono entrambe implementate nella homepage."; break;
        
        case (user_input.includes("/changepassword")): reply_message ="Adesso puoi modificare la password."; setTimeout(function() {changePassword();}, 1000); break;
        
        case (user_input.includes("password")): reply_message = "Scrivi /changepassword per modificare la password."; break;
        
        case (user_input.includes("/changeusername")): reply_message = "Adesso puoi modificare il tuo nome artista."; setTimeout(function() {changeUsername();}, 1000); break;
        
        case (user_input.includes("username") || user_input.includes("nome artista")): reply_message = "Scrivi /changeusername per effettuare una modifica."; break;
        
        default: reply_message = noanswer[Math.floor(Math.random() * noanswer.length)]; break;
    }

    const jarvis_message = document.createElement("p");
    jarvis_message.classList.add("bot");
    jarvis_message.textContent = reply_message;
    let text_to_speech = new SpeechSynthesisUtterance(reply_message);
    speechSynthesis.speak(text_to_speech);
    chat_box.appendChild(jarvis_message);
    chat_input.value = "";
    chat_box.scrollTo(0, chat_box.scrollHeight);
}

function deleteForm(form) {
    form.innerHTML = '';
    const message = form.parentNode;
    const user_info_changed = document.createElement("p");
    user_info_changed.textContent = "La modifica è stata effettuata correttamente."
    user_info_changed.classList.add("user_info_changed");
    message.appendChild(user_info_changed);

    const chat = document.querySelector("#chat_input input");
    chat.addEventListener("keyup", triggerEnter)
    const send_button = document.querySelector("#chat_input img");
    send_button.addEventListener("click", sendMessage);
}

function onUsernameSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const form_data = {method: 'post', body: new FormData(form)};
    fetch("jarvis/changeusername", form_data).then(deleteForm(form));
}

function onPasswordSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const form_data = {method: 'post', body: new FormData(form)};
    fetch("jarvis/changepassword", form_data).then(deleteForm(form));
}

function cancelChange(form) {
    form.innerHTML = '';
    const message = form.parentNode;
    const user_info_changed = document.createElement("p");
    user_info_changed.textContent = "La modifica è stata annullata."
    user_info_changed.classList.add("user_info_changed");
    message.appendChild(user_info_changed);

    const chat = document.querySelector("#chat_input input");
    chat.addEventListener("keyup", triggerEnter)
    const send_button = document.querySelector("#chat_input img");
    send_button.addEventListener("click", sendMessage);
}

function changeUsername() {
    const chat = document.querySelector("#chat_input input");
    chat.removeEventListener("keyup", triggerEnter)
    const send_button = document.querySelector("#chat_input img");
    send_button.removeEventListener("click", sendMessage);

    const token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const chat_box = document.querySelector("#chat_box");
    const chat_input = document.querySelector("#chat_input input");
    const jarvis_message = document.createElement("section");
    const form = document.createElement("form");
    form.setAttribute("name", "form");
    form.setAttribute("method", "post");
    form.setAttribute("enctype", "multipart/form-data");
    form.setAttribute("autocomplete", "off");
    form.addEventListener("submit", onUsernameSubmit);

    const cancel_button = document.createElement("div");
    const cancel_text = document.createElement("p");
    cancel_button.addEventListener("click", function(){
        cancelChange(form);
    });
    cancel_text.textContent = "Annulla";

    const csrf_token = document.createElement("input");
    csrf_token.setAttribute("name", "_token");
    csrf_token.setAttribute("type", "hidden");
    csrf_token.value = token;

    const new_username_box = document.createElement("div");
    const new_username_label = document.createElement("label");
    new_username_label.setAttribute("for", "new_username");
    new_username_label.textContent = "Nuovo nome artista";
    const new_username_input = document.createElement("input");
    new_username_input.setAttribute("type", "text");
    new_username_input.setAttribute("name", "new_username");
    new_username_input.id = "new_username";
    new_username_input.setAttribute("placeholder", "Inserisci il nome artista");
    new_username_input.addEventListener("blur", checkNewUsername);
    const new_username_error = document.createElement("p");
    new_username_error.textContent = "Inserisci almeno 3 caratteri. È ammesso l'utilizzo di lettere, numeri, % & _ @. Max: 40."

    const buttons = document.createElement("div");

    const submit_box = document.createElement("div");
    const submit_button = document.createElement("input");
    submit_button.setAttribute("type", "submit");
    submit_button.setAttribute("disabled", "");
    submit_button.value = "Salva";
    submit_button.id = "change_username";

    jarvis_message.classList.add("bot");
    new_username_box.classList.add("box");
    new_username_error.classList.add("hidden");
    buttons.classList.add("buttons");
    submit_box.classList.add("box");
    cancel_button.classList.add("cancel_button");

    chat_box.appendChild(jarvis_message);
    jarvis_message.appendChild(form);
    form.appendChild(csrf_token);
    form.appendChild(new_username_box);
    new_username_box.appendChild(new_username_label);
    new_username_box.appendChild(new_username_input);
    new_username_box.appendChild(new_username_error);
    form.appendChild(buttons);
    buttons.appendChild(submit_box);
    buttons.appendChild(cancel_button);
    cancel_button.appendChild(cancel_text);
    submit_box.appendChild(submit_button);

    chat_input.value = "";
    chat_box.scrollTo(0, chat_box.scrollHeight); 
}

function changePassword() {
    const chat = document.querySelector("#chat_input input");
    chat.removeEventListener("keyup", triggerEnter)
    const send_button = document.querySelector("#chat_input img");
    send_button.removeEventListener("click", sendMessage);

    const token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const chat_box = document.querySelector("#chat_box");
    const chat_input = document.querySelector("#chat_input input");
    const jarvis_message = document.createElement("section");
    const form = document.createElement("form");
    form.setAttribute("name", "form");
    form.setAttribute("method", "post");
    form.setAttribute("enctype", "multipart/form-data");
    form.setAttribute("autocomplete", "off");
    form.addEventListener("submit", onPasswordSubmit);

    const cancel_button = document.createElement("div");
    const cancel_text = document.createElement("p");
    cancel_button.addEventListener("click", function(){
        cancelChange(form);
    });
    cancel_text.textContent = "Annulla";

    const csrf_token = document.createElement("input");
    csrf_token.setAttribute("name", "_token");
    csrf_token.setAttribute("type", "hidden");
    csrf_token.value = token;

    const old_password_box = document.createElement("div");
    const old_password_label = document.createElement("label");
    old_password_label.setAttribute("for", "old_password");
    old_password_label.textContent = "Vecchia password";
    const old_password_input = document.createElement("input");
    old_password_input.setAttribute("type", "password");
    old_password_input.setAttribute("name", "old_password");
    old_password_input.id = "old_password";
    old_password_input.setAttribute("placeholder", "Inserisci la vecchia password");
    old_password_input.addEventListener("blur", checkOldPassword);
    const old_password_error = document.createElement("p");
    old_password_error.textContent = "La password inserita non è corretta."

    const new_password_box = document.createElement("div");
    const new_password_label = document.createElement("label");
    new_password_label.setAttribute("for", "new_password");
    new_password_label.textContent = "Nuova password";
    const new_password_input = document.createElement("input");
    new_password_input.setAttribute("type", "password");
    new_password_input.setAttribute("name", "new_password");
    new_password_input.id = "new_password";
    new_password_input.setAttribute("placeholder", "Inserisci la nuova password");
    new_password_input.addEventListener("blur", checkNewPassword);
    const new_password_error = document.createElement("p");
    new_password_error.textContent = "Password non valida. Deve contenere almeno una lettera minuscola, una maiuscola, un numero e un carattere speciale. Min: 8 caratteri.";

    const confirm_password_box = document.createElement("div");
    const confirm_password_label = document.createElement("label");
    confirm_password_label.setAttribute("for", "confirm_password");
    confirm_password_label.textContent = "Conferma password";
    const confirm_password_input = document.createElement("input");
    confirm_password_input.setAttribute("type", "password");
    confirm_password_input.setAttribute("name", "confirm_password");
    confirm_password_input.id = "confirm_password";
    confirm_password_input.setAttribute("placeholder", "Conferma la password");    
    confirm_password_input.addEventListener("blur", checkConfirmPassword);
    const confirm_password_error = document.createElement("p");
    confirm_password_error.textContent = "La password non corrisponde."
    
    const buttons = document.createElement("div");

    const submit_box = document.createElement("div");
    const submit_button = document.createElement("input");
    submit_button.setAttribute("type", "submit");
    submit_button.setAttribute("disabled", "");
    submit_button.value = "Salva";
    submit_button.id = "change_password";

    jarvis_message.classList.add("bot");
    old_password_box.classList.add("box");
    old_password_error.classList.add("hidden");
    new_password_box.classList.add("box");
    new_password_error.classList.add("hidden");
    confirm_password_box.classList.add("box");
    confirm_password_error.classList.add("hidden");
    buttons.classList.add("buttons");
    submit_box.classList.add("box");
    cancel_button.classList.add("cancel_button");

    chat_box.appendChild(jarvis_message);
    jarvis_message.appendChild(form);
    form.appendChild(csrf_token);
    form.appendChild(old_password_box);
    old_password_box.appendChild(old_password_label);
    old_password_box.appendChild(old_password_input);
    old_password_box.appendChild(old_password_error);
    form.appendChild(new_password_box);
    new_password_box.appendChild(new_password_label);
    new_password_box.appendChild(new_password_input);
    new_password_box.appendChild(new_password_error);
    form.appendChild(confirm_password_box);
    confirm_password_box.appendChild(confirm_password_label);
    confirm_password_box.appendChild(confirm_password_input);
    confirm_password_box.appendChild(confirm_password_error);
    form.appendChild(buttons);
    buttons.appendChild(submit_box);
    buttons.appendChild(cancel_button);
    cancel_button.appendChild(cancel_text);
    submit_box.appendChild(submit_button);

    chat_input.value = "";
    chat_box.scrollTo(0, chat_box.scrollHeight);    
}

function checkConfirmPassword(event) {
    const password_input = event.currentTarget;
    const error_message = password_input.parentNode.querySelector('p');
    const password = document.querySelector('#new_password');

    if(password_input.value !== password.value) {
        error_message.classList.remove("hidden");
        change_password_values[password_input.name] = false;
    }
    else {
        error_message.classList.add("hidden");
        change_password_values[password_input.name] = true;
    }
    
    checkChangePassword();
}

function checkNewPassword(event) {
    const password_input = event.currentTarget;
    const error_message = password_input.parentNode.querySelector('p');
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?& ]{8,}$/.test(String(password_input.value))) {        
        error_message.classList.remove("hidden");
        change_password_values[password_input.name] = false;
    }
    else {
        error_message.classList.add("hidden");
        change_password_values[password_input.name] = true;
    }
    checkChangePassword();
}

function checkUserOldPassword(json) {
    const password_input = document.querySelector("#old_password");
    const error_message = password_input.parentNode.querySelector('p');
    const password_result = json.password_result;
    if(!password_result) {
        error_message.classList.remove("hidden");
        change_password_values[password_input.name] = false;
    }
    else {
        error_message.classList.add("hidden");
        change_password_values[password_input.name] = true;
    }
    checkChangePassword();
}

function checkOldPassword(event) {
    const token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const user_pwd = event.currentTarget.value;
    const pwd = {"pwd": user_pwd};
    formData = JSON.stringify(pwd);
    fetch("jarvis/checkpassword", {
        method: 'post',
        body: formData,
        headers: {
            'Content-type':'application/json',
            'X-CSRF-TOKEN':token
        }
    }).then(onResponse, onError).then(checkUserOldPassword);
}

function checkNewUsername(event) {
    const username_input = event.currentTarget;
    const error_message = username_input.parentNode.querySelector('p');

    if(!/^[a-zA-Zà-úÀ-Ú0-9_%&@ ]{3,40}$/.test(username_input.value)) {
        error_message.classList.remove("hidden");
        change_username_value = false;
    } 
    else {
        error_message.classList.add("hidden");
        change_username_value = true;
    } 

    checkChangeUsername();
}

function sendMessage() {
    const chat_box = document.querySelector("#chat_box");
    const chat_input = document.querySelector("#chat_input input");
    const user_input = chat_input.value;
    if (user_input !== "") {
        const user_message = document.createElement("p");
        user_message.classList.add("user");
        user_message.textContent = user_input;
        chat_box.appendChild(user_message);
        chat_box.scrollTo(0, chat_box.scrollHeight);
        sendReply(user_input, chat_box, chat_input);
    }
}

function triggerEnter(event) {
    const send = document.querySelector("#chat_input img");
    if(event.keyCode === 13) {
        send.click();
    }
}

const chat = document.querySelector("#chat_input input");
chat.addEventListener("keyup", triggerEnter)
const send_button = document.querySelector("#chat_input img");
send_button.addEventListener("click", sendMessage);

function startJarvis() {
    const header = document.querySelector("header");
    const jarvis = document.querySelector("section");
    header.classList.add("hidden");
    jarvis.classList.remove("hidden");
}
const start_button = document.querySelector("#hello img");
start_button.addEventListener("click", startJarvis);

function endJarvis() {
    const chat_box = document.querySelector("#chat_box");
    const header = document.querySelector("header");
    const jarvis = document.querySelector("section");
    header.classList.remove("hidden");
    jarvis.classList.add("hidden"); 
    chat_box.innerHTML = '';
}
const exit_button = document.querySelector("#exit");
exit_button.addEventListener("click", endJarvis);

const change_password_values = {};
let change_username_value = false;

function checkChangePassword() {
    const submit_button = document.querySelector('#change_password');
    submit_button.disabled = Object.keys(change_password_values).length !== 3 || Object.values(change_password_values).includes(false);
}

function checkChangeUsername() {
    const submit_button = document.querySelector("#change_username");
    submit_button.disabled = change_username_value === false;
}

