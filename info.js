import { log } from 'node:console';
import * as os from 'node:os';
import { Buffer } from 'node:buffer';

// const info = () => {
//   console.log(`Host Name: ${os.hostname()}`);
// };

const app = () => {

  log(os)
  
  const info = {};

  info.arch = os.arch();

  info.home = os.homedir();
  info.temp = os.tmpdir();
  info.host = os.hostname();
  info.platform = os.platform();

  // const bufeol = Buffer.from(os.EOL);
  // log(
  //   '\x1b[35mSystem End Of Line \x1b[32mos.EOL\x1b[0m',
  //   bufeol,
  //   bufeol
  //     .toString()
  //     .split('')
  //     .map(ch => ch.charCodeAt()),
  //   bufeol.toString().split(),
  //   bufeol.toString('hex'),
  //   bufeol.toString('ascii'),
  //   `"${bufeol.toString('utf-8')}"`,
  // );

  log();
  log('Host Name: ', info.host);
  log('Home Folder: ', info.home);
  log('Temp Folder: ', info.temp);

  log();
  log('Architecture:', info.arch);
  log('platform: ', info.platform);
  log('kernel version: ', os.version());

  info.type = os.type();
  info.release = os.release();
  info.platform = os.platform();
  info.machine = os.machine();
  log('OS Type:', info.type); // "Windows_NT"
  log('Build Release:', info.release); // "10.0.14393"
  log('Platform:', info.platform); // "win32"
  log('Machine:', info.machine); // mach x86_64
  
  info.CPUS = os.cpus();
  info.CPUSone = info.CPUS[0];
  info.CPUnumber = info.CPUS.length; // 8
  info.CPUspeed = `~${info.CPUS[0].speed} МГц`; // 3392
  log(info.CPUSone, info.CPUspeed, 'x' + info.CPUnumber + ' шт'); // cpuz 'Intel(R) Core(TM) i7-3770 CPU @ 3.40GHz'
  log('Parallelism:', os.availableParallelism())
  
  
  log('\nMemory:');
  info.mem = os.totalmem();
  info.free = os.freemem();
  info.used = info.mem - info.free;
  info.memoryUsage = ((info.used / info.mem) * 100).toFixed(2) + ' %';
  
  console.log('memory Usage: ', info.memoryUsage);
  log(
    'Total:\t', info.mem,
    'Байт', info.mem / 1024,
    'кБайт', info.mem / (1024 * 1024),
    'МБайт\x1b[36m', (info.mem / 2 ** 30).toFixed(2),
    '\x1b[0mГБайт',
  ); // mem
  log(
    'Free:\t', info.free,
    'Байт', info.free / 1024,
    'кБайт', info.free / (1024 * 1024),
    'МБайт\x1b[36m', (info.free / 2 ** 30).toFixed(2),
    '\x1b[0mГБайт',
  ); // mem
  log(
    'Used:\t', info.used,
    'Байт', info.used / 1024,
    'кБайт', info.used / (1024 * 1024),
    'МБайт\x1b[36m', (info.used / 2 ** 30).toFixed(2),
    '\x1b[0mГБайт',
  ); // mem
  log(info.free, info.free / 1024, info.free / 1024 / 1024); // mem
  log(info.used, info.used / 1024, info.used / 1024 / 1024); // mem

  info.nets = os.networkInterfaces()

  log('\nNetworks:')
  log(info.nets)


  log('Users:')
  info.users = os.userInfo();
  // log({users: info.users})
  log('User Name:', info.users.username)
  log('User Home Dir:', info.users.homedir)
  log('User Shell:', info.users.shell)

  log('Home Folder: ', info.home);

};

app();
