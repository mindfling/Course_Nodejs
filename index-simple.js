import readline from 'node:readline/promises';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>',
});


const command = {
  help() {
    console.log('\x1b[32mTHis is the Help for commands\ntype next commands');
    console.log('help\n', 'time\n', 'game\n', '\x1b[0mand others');
    rl.close();
  }
}


const intro = async () => {
  const answer = await rl.question("Hello Qapla' Как ваше имя nuq oH ponglIj'e'?\n");
  console.log('Приветствую тебя, qavan', answer);
  console.log('Press Ctrl+C or Ctrl+D for Exit');
  console.log('\nType next command here\nor help for help information\n');

  const com = await rl.question('\x1b[37mNext command \x1b[34m# ')
  console.log('\x1b[0mcom: ', com);

  command[com]();
  rl.close();
};


const app = () => {
  console.log();
  intro();
}

app();
