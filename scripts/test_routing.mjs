async function test() {
  const hosts = ['localhost', '127.0.0.1'];
  const paths = ['pratham', 'Pratham%20Socials', 'Pratham'];

  for (const host of hosts) {
    for (const path of paths) {
      const url = `http://${host}:3000/${path}`;
      try {
        const res = await fetch(url, { method: 'HEAD' });
        console.log(`${url} -> ${res.status}`);
      } catch (e) {
        console.log(`${url} -> FAILED: ${e.message}`);
      }
    }
  }
}

test();
