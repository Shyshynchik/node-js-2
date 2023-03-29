const process = require('process');
const child_process = require('child_process');
const { spawn } = require('child_process');

let spliterator = child_process.fork('spliterator');
let joiner = child_process.fork('joiner');

let child = spawn('node', ['-e', 'console.log("Hello world!")'])

child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});

console.log(`Этот процесс запушен в ${__filename}`);

process.on('beforeExit', (code) => {
    console.log(`BeforeExit в процессе ${__filename} с кодом: `, code);
});

process.on('exit', (code) => {
    console.log(`Exit в процессе ${__filename} с кодом: `, code);
});

spliterator.on('message', (message) => {
   console.log(`!!!!!${message}!!!!!`);
    spliterator.disconnect();
});

joiner.on('message', (message) => {
    console.log(`!!!!!${message}!!!!!`);
    joiner.disconnect();
});

spliterator.send(['Hello', 'world']);

setTimeout(() => {
    joiner.send('Hello world');
}, 1000);