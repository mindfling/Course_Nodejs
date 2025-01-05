import { log } from 'node:console';
import * as os from 'node:os';
import { Buffer } from 'node:buffer';

const info = () => {
  console.log(`Host Name: ${os.hostname()}`);
};

const app = () => {
  // log(os)

  log('Architecture:', os.arch());

  const bufeol = Buffer.from(os.EOL);
  console.log('bufeol: ', bufeol);
  console.log('bufeol: ', bufeol.toString().split(''));

  const home = os.homedir();
  const host = os.hostname();
  const platform = os.platform();
  log('home: ', home);
  log('host: ', host);
  log('platform: ', platform, os.version());
  log('kernel version: ', os.version());

  log()
  console.log(os.type()); // "Windows_NT"
  console.log(os.release()); // "10.0.14393"
  console.log(os.platform()); // "win32"
  console.log(os.cpus()[0]); // cpuz 'Intel(R) Core(TM) i7-3770 CPU @ 3.40GHz'
  console.log(os.machine()); // mach x86_64
  console.log(os.totalmem()); // mem
};

app();
