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
  let Dex , dex , owner , add1 , add2 ; 

  // console.log("asdasdasd");
  beforeEach(async ()=>{
    Dex = await ethers.getContractFactory('Dex');
    dex = await Dex.deploy();
    // console.log(dex)
    [owner, add1 , add2 ] = await ethers.getSigners();
  })

  describe('Deployment',()=>{
    it('hacer el swap', async ()=>{
        await dex.testSwap()
    })
  })

})