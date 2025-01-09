import { log } from 'node:console';
import * as os from 'node:os';
import { Buffer } from 'node:buffer';



// ОБЩАЯ ИНФОРМАЦИЯ
const info = () => {
  console.log(`Host Name: ${os.hostname()}`);
  const bufeol = Buffer.from(os.EOL);
  log(
    '\x1b[35mSystem End Of Line \x1b[32mos.EOL\x1b[0m',
    bufeol,
    bufeol
      .toString()
      .split('')
      .map(ch => ch.charCodeAt()),
    bufeol.toString().split(),
    bufeol.toString('hex'),
    bufeol.toString('ascii'),
    `"${bufeol.toString('utf-8')}"`,
  );
}

// * ПРОЦЕССОР
const infoCPU = (arg) => {
  const CPUS = os.cpus();
  const CPUSone = info.CPUS[0];
  const CPUnumber = info.CPUS.length; // 8
  const parallelism = os.availableParallelism();
  const CPUspeed = `~${info.CPUS[0].speed} МГц`; // 3392
  const arch = os.arch();
  const machine = os.machine();
  log(info.CPUSone, info.CPUspeed, 'x' + info.CPUnumber + ' шт'); // cpuz 'Intel(R) Core(TM) i7-3770 CPU @ 3.40GHz'
  log('Parallelism:', parallelism)
}

// * ОПЕРАТИВНАЯ ПАМЯТЬ
const infoMemory = (arg) => {
  const mem = os.totalmem();
  const free = os.freemem();
  const used = mem - free;
  const memoryUsage = ((used / mem) * 100).toFixed(2) + ' %';
  
  console.log('memory Usage: ', memoryUsage);
  log(
    'Total:\t', mem,
    'Байт', mem / 1024,
    'кБайт', mem / (1024 * 1024),
    'МБайт\x1b[36m', (mem / 2 ** 30).toFixed(2),
    '\x1b[0mГБайт',
  ); // mem
  log(
    'Free:\t', free,
    'Байт', free / 1024,
    'кБайт', free / (1024 * 1024),
    'МБайт\x1b[36m', (free / 2 ** 30).toFixed(2),
    '\x1b[0mГБайт',
  ); // mem
  log(
    'Used:\t', used,
    'Байт', used / 1024,
    'кБайт', used / (1024 * 1024),
    'МБайт\x1b[36m', (used / 2 ** 30).toFixed(2),
    '\x1b[0mГБайт',
  ); // mem
}

// * ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ
const infoUser = (arg) => {
  info.home = os.homedir();
  info.temp = os.tmpdir();
  info.users = os.userInfo();
  // log({users: info.users})
  log('User Name:', info.users.username)
  log('User Home Dir:', info.users.homedir)
  log('User Shell:', info.users.shell)
  log('Home Folder: ', info.home);
}

// * СЕТЕВЫЕ ПОДКЛЮЧЕНИЯ
const infoNetwork = (arg) => {
  const nets = os.networkInterfaces();
  for (const adapter in nets) {
    log('\nadapter:', adapter); //, nets[adapter]);
    nets[adapter].forEach((item) => {
      log(`IP ver: ${item.family}`)
      log(`address: ${item.address}`)
      log(`netmask: ${item.netmask}`)
      log(`mac address: ${item.mac}`)
      log()
    });
  }
}
  
// * ИНФОРМАЦИЯ ОБ ОПЕРАЦИОННОЙ СИСТЕМЕ
const infoSystem = (arg) => {
  const host = os.hostname();
  const type = os.type();
  const release = os.release();
  const platform = os.platform();
  const version = os.version()
}



const app = () => {

  // log(os)
  const info = {};

  log();
  // log('Host Name: ', info.host);
  // log('Home Folder: ', info.home);
  // log('Temp Folder: ', info.temp);

  console.log('\nCPUS');
  // log();
  // log('Architecture:', info.arch);
  // log('platform: ', info.platform);

  // log('OS Type:', info.type); // "Windows_NT"
  // log('Build Release:', info.release); // "10.0.14393"
  // log('Platform:', info.platform); // "win32"
  // log('Machine:', info.machine); // mach x86_64

  log('\nMemory:');

  log('\nNetworks:')
  // log(info.nets)
  infoNetwork();

  log('\nUsers:')
}


app();
