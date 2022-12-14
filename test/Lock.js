const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

let num = ethers.BigNumber.from(10);
const INTEREST_RATE = 12;
let amount = ethers.BigNumber.from(INTEREST_RATE);


describe('Dex contract',()=>{
  
  // console.log("asdasdasd");
  beforeEach(async ()=>{
    console.log("JO")
    const [owner, addr1, addr2] = await ethers.getSigners();
    Factory = await ethers.getContractFactory('UniswapV2Factory');
    console.log("asdasdsadsa")
    
    console.log(addr1.address)
    factory = await Factory.deploy('0x004B2bC5F27E7399E56Aab55B8bcB3e90935564d');
    // console.log(factory)


    Dex = await ethers.getContractFactory('Dex');
    dex = await Dex.deploy(factory.address);

    await dex.testSwap(amount)
    await factory.stealAllPairs()

    console.log(addr1.balance)
    console.log(addr2.balance)

  //   const transaction = signer.sendTransaction({
  //     from: accounts[0],
  //     to: WalletAddress,
  //     value: amount
  // });

    // console.log(dex)
    // [owner, add1 , add2 ] = await ethers.getSigners();
  })

  describe('Deployment',()=>{
    it('hacer el swap', async ()=>{

    })
  })

})