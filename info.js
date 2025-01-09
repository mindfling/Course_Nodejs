import { log } from 'node:console';
import * as os from 'node:os';
import { Buffer } from 'node:buffer';


const c = {
  red(str) {
    return `\x1b[31m${str}\x1b[0m`;
  },
  green(str) {
    return `\x1b[32m${str}\x1b[0m`;
  },
  yellow(str) {
    return `\x1b[33m${str}\x1b[0m`;
  },
  blue(str) {
    return `\x1b[34m${str}\x1b[0m`;
  },
  magenta(str) {
    return `\x1b[35m${str}\x1b[0m`;
  },
  cyan(str) {
    return `\x1b[36m${str}\x1b[0m`;
  },
  white(str) {
    return `\x1b[37m${str}\x1b[0m`;
  },
  grey(str) {
    return `\x1b[90m${str}\x1b[0m`;
  },
};


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
  const memoryUsage = ((used / mem) * 100).toFixed(2);
  
  log(
    c.blue('Total:\t'),
    c.cyan((mem / 2 ** 30).toFixed(3)),
    c.grey('ГБайт'),
    c.cyan(mem),
    c.grey('Байт'),
    c.cyan(mem / 1024),
    c.grey('кБайт'),
    c.cyan((mem / (1024 * 1024)).toFixed(2)),
    c.grey('МБайт'),
  );
  log(
    c.blue('Free:\t'),
    c.cyan((free / 2 ** 30).toFixed(3)),
    c.grey('ГБайт'),
    c.cyan(mem),
    c.grey('Байт'),
    c.cyan(free / 1024),
    c.grey('кБайт'),
    c.cyan((free / (1024 * 1024)).toFixed(2)),
    c.grey('МБайт'),
  );
  log(
    c.blue('Used:\t'),
    c.cyan((used / 2 ** 30).toFixed(3)),
    c.grey('ГБайт'),
    c.cyan(mem),
    c.grey('Байт'),
    c.cyan(used / 1024),
    c.grey('кБайт'),
    c.cyan((used / (1024 * 1024)).toFixed(2)),
    c.grey('МБайт'),
  );

  console.log(c.blue('memory Usage: '), c.cyan(memoryUsage), '%');
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
    // log(adapter, nets[adapter]);
    log(' ', c.blue('adapter:'), c.magenta(adapter));
    nets[adapter].forEach((item) => {
      log(`${c.blue('IP ver:')} ${item.family}`)
      log(`${c.blue('address:')} ${item.address}`)
      log(`${c.blue('netmask:')} ${item.netmask}`)
      log(`${c.blue('mac address:')} ${item.mac}`)
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
  const version = os.version();
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

  log(c.green('\nMemory:'))
  infoMemory();

  log(c.green('\nNetworks:'))
  infoNetwork();
  
  log(c.green('Users:'))
  infoUser();
}


app();
