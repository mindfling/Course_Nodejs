import { log } from 'node:console';
import * as os from 'node:os';
import { Buffer } from 'node:buffer';

// console colors
const c = {
  black(str) {
    return `\x1b[30m${str}\x1b[0m`;
  },
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
  const CPUFirst = CPUS[0];
  const CPUFirstModel = CPUFirst.model;
  const CPUFirstSpeed = CPUFirst.speed;
  //todo it is only FirstCPU
  const CPUnumber = CPUS.length; // 8
  const parallelism = os.availableParallelism(); // 8
  const CPUspeed = `~${CPUS[0].speed} МГц`; // 3392
  const arch = os.arch();
  const machine = os.machine();
  // log(CPUFirst, CPUspeed, 'x' + CPUnumber + ' шт'); // cpuz 'Intel(R) Core(TM) i7-3770 CPU @ 3.40GHz'
  log(c.blue('Architecture:'), arch); // 
  log(c.blue('Machine:'), machine); // mach x86_64
  log(c.blue('CPU logical:'), c.green(CPUFirst.model), CPUFirst.speed,);
  log(c.blue('CPU Speed:'), CPUspeed);
  log(c.blue('CPU numbers:'), CPUnumber);
  log(c.blue('Parallelism:'), parallelism);
}


// * ОПЕРАТИВНАЯ ПАМЯТЬ
const infoMemory = (arg) => {
  const mem = os.totalmem();
  const free = os.freemem();
  const used = mem - free;
  const memoryUsage = ((used / mem) * 100).toFixed(2);
  
  log(
    c.blue('Total:\t'),
    c.cyan((mem / 2 ** 30).toFixed(3)), c.grey('ГБайт'),
    c.cyan(mem), c.grey('Байт'),
    c.cyan(mem / 1024), c.grey('кБайт'),
    c.cyan((mem / (1024 * 1024)).toFixed(2)), c.grey('МБайт'),
  );
  log(
    c.blue('Free:\t'),
    c.cyan((free / 2 ** 30).toFixed(3)), c.grey('ГБайт'),
    c.cyan(mem), c.grey('Байт'),
    c.cyan(free / 1024), c.grey('кБайт'),
    c.cyan((free / (1024 * 1024)).toFixed(2)), c.grey('МБайт'),
  );
  log(
    c.blue('Used:\t'),
    c.cyan((used / 2 ** 30).toFixed(3)), c.grey('ГБайт'),
    c.cyan(mem), c.grey('Байт'),
    c.cyan(used / 1024), c.grey('кБайт'),
    c.cyan((used / (1024 * 1024)).toFixed(2)), c.grey('МБайт'),
  );

  log(c.blue('Usage:\t'), c.cyan(memoryUsage), '%');
}


// * ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ
const infoUser = (arg) => {
  const home = os.homedir();
  const temp = os.tmpdir();
  const users = os.userInfo();
  const userName = users.username;
  const userHomedir = users.homedir;

  log(c.blue('Home Folder: '), home);
  log(c.blue('Temp Folder: '), temp);
  log(c.blue('User Name:'), userName);
  log(c.blue('User Home Dir:'), userHomedir);
  log(c.blue('User Shell:'), users.shell);
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
  log(c.blue('OS Hostname:'), host); // "OFFICEPC"
  log(c.blue('OS Type:'), type); // "Windows_NT"
  log(c.blue('OS Version:'), version); // "Windows 10 Pro"
  log(c.blue('Build Release:'), release); // "10.0.14393"
  log(c.blue('Platform:'), platform); // "win32"
  log(c.blue('Arch:'), os.arch()); // ""
}


const app = () => {
  const info = {}; // Our Info
  
  log(c.green('\nCPUS:'))
  infoCPU();

  log(c.green('\nMemory:'))
  infoMemory();
  
  log(c.green('\nOperation System:'))
  infoSystem();
  
  log(c.green('\nUsers:'))
  infoUser();

  log(c.green('\nNetworks:'))
  infoNetwork();
}


app();
