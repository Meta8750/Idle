let pythonProcess = null;
const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;
let running = 0;
let currentProcess = "";
let processData = "";

app.get('/runfile', (req, res) => {
    const prozess = req.query.variable || '';

    if (prozess == "") {
        if (running == 1) {
            res.send(`${currentProcess}.${processData}`);
        } else {
            res.send('Python-Datei wird beendet.');
        }
    } else {
        if (running == 1) {
            running = 0;
            res.send(`Python-Datei ${currentProcess} wird beendet.`);
        } else {
            let pythonPath = "";
            running = 1;

            switch (prozess) {
                case "fill":
                    pythonPath = "//CN/c$/Users/Administrator/Desktop/Gearsaver/data_fill.py";
                    currentProcess = "data_fill.py";
                    break;
                case "add":
                    pythonPath = '//CN/c$/Users/Administrator/Desktop/Gearsaver/data_add.py';
                    currentProcess = "data_add.py";
                    break;
                default:
                    pythonPath = "NAN"
            }

            function runPython() {
                pythonProcess = exec(`python ${pythonPath}`);
                pythonProcess.stdout.on('data', (data) => {
                    processData = data
                    console.log(`Python: ${data}`);
                });
                pythonProcess.stderr.on('data', (data) => {
                    // console.error(`Python-Fehler: ${data}`);
                });
                pythonProcess.on('close', (code) => {
                    console.log(`Python-Prozess beendet mit Code ${code}`);
                    pythonProcess = null;
                    
                    
                    if (running == 1) {
                        setTimeout(runPython, 2000);
                    }
                });
            }
            runPython();
            // res.send(`Python-Datei '${currentProcess}' wird ausgeführt.`);
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});