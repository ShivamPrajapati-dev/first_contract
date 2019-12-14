
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {interface, bytecode} = require('../compile');
const web3 = new Web3(ganache.provider());


var accounts;
var inbox;

beforeEach(async ()=>{

accounts = await web3.eth.getAccounts();
inbox = await new web3.eth.Contract(JSON.parse(interface))
.deploy({ data: bytecode, arguments: ['Hi there!']})
.send({from: accounts[0], gas: '1000000'});

});


describe('Inbox',()=>{

  it('deployed successfully',()=>{
     assert.ok(inbox.options.address);
  });

  it('default message',async () =>{
    const message = await inbox.methods.message().call();
    assert.equal(message,'Hi there!');
  });

  it('modifies message',async () =>{
    const hash = await inbox.methods.setMsg('Hello').send({from: accounts[0]});
    console.log(hash);
    const message = await inbox.methods.message().call();
    assert.equal(message,'Hello');
  });

});
