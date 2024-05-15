const get_data = () => {
    return fetch('http://cn:8080/api/daten-abrufen')
      .then(response => response.json())
      .then(data => {
        // Verarbeite die empfangenen Daten im Frontend
        // console.log(data);
        
        return JSON.parse(data);
      })
      .catch(error => {
        console.error('Fehler:', error);
        alert("login server down")
      });
  }
  
  document.getElementById('login').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const data = await get_data();
      
        // Hier kannst du die eingegebenen Daten überprüfen
        if (username === data[0].benutzername && password === data[0].passwort) {
            // Erfolgreiche Anmeldung
            alert('Anmeldung erfolgreich!');
            // Du kannst hier auch den Benutzer weiterleiten oder andere Aktionen ausführen
            window.location.href = "mainScreen.html";
        } else {
            // Anmeldefehler
            alert('Falscher Benutzername oder Passwort. Bitte erneut versuchen.');
        }
      });
