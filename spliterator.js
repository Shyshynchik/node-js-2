const process = require('process');

console.log(`Этот процесс запушен в ${__filename}`)

process.on('beforeExit', (code) => {
    console.log(`BeforeExit в процессе ${__filename} с кодом: `, code);
});

process.on('exit', (code) => {
    console.log(`Exit в процессе ${__filename} с кодом: `, code);
});

process.on('message', (message) => {
    console.log(`message ${message} в процессе ${__filename}`);
    process.send(`Сообщение ${message.join(' ')} получено и отправленно обратно`)
});