const ipfsClient = require('ipfs-http-client')
const fs = require("fs");

var text = fs.readFileSync(process.argv[2], 'utf8');

var ipfs = ipfsClient({ host: 'ipfs.web3.party', port: '5001', protocol: 'https' })
ipfs.addFromFs(process.argv[2], { recursive: false }, (err, result) => {
    if (err) { throw err }
    console.log(JSON.stringify({ hash: result[0].hash, data: text }));
})



// var fs = require("fs");

// fs.readFile(process.argv[2], function (err, data) {



// ipfs.add(Buffer.from(data, 'utf-8')).then((hash) => {
//     console.log("New file at", hash);
// });

// });

