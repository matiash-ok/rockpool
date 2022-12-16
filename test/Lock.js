const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

let num = ethers.BigNumber.from(10);
const INTEREST_RATE = 10;
let amount = ethers.BigNumber.from(INTEREST_RATE);


describe('Dex contract',()=>{
  
  // console.log("asdasdasd");
  beforeEach(async ()=>{
    console.log("JO")
    const [owner, addr1, addr2] = await ethers.getSigners();

    Factory = await ethers.getContractFactory('UniswapV2Factory');
    console.log("asdasdsadsa")
    factory = await Factory.deploy('0x004B2bC5F27E7399E56Aab55B8bcB3e90935564d');
    console.log("setting the fee to THIEF ")
    factory.setFeeTo(addr2.address)
    ERC20Mock = await ethers.getContractFactory('ERC20Mock')
    USDC = await ERC20Mock.deploy('USDC coin','USDC');
    PESO = await ERC20Mock.deploy('PESO','ARGC');

    Dex = await ethers.getContractFactory('Dex');

  
    dex = await Dex.deploy(factory.address , USDC.address , PESO.address);

    console.log("--------------ADDRESS 1 -----------------")
    console.log(addr1.address)
    console.log("--------------THIEF ADDRESS  -----------------")
    console.log(addr2.address)
    console.log("-------------------------------")
    const pair = await dex.getPairAddress()
    // CREATING USDC 
    await USDC._mint(dex.address,100000000000)
    await USDC._mint("0xb6C3582AccD194Fd224F579042A9888F8051C6D9",100000)
    await USDC._mint("0x004B2bC5F27E7399E56Aab55B8bcB3e90935564d",100000)
    await USDC._mint(addr1.address,100000)
    await USDC._mint(USDC.address,10000000000)
    await USDC._mint(pair,100000)

    // CREATING PESO
    await PESO._mint(dex.address,100000000000)
    await PESO._mint("0xb6C3582AccD194Fd224F579042A9888F8051C6D9",1000000)
    await PESO._mint("0x004B2bC5F27E7399E56Aab55B8bcB3e90935564d",1000000)
    await PESO._mint(PESO.address,10000000000)
    await PESO._mint(pair,100000)
    // await PESO._mint(addr1.address,10000000000)
    
    console.log("--------------PRE SWAP-Dex--------------------------------")
    console.log("")
    console.log("USDC",await USDC.balanceOf(pair))
    console.log("ARGC",await PESO.balanceOf(pair))
    console.log("-----------------------------------------------------")
    console.log("")
    
    console.log("--------------------PRE SWAP Addr1---------------------------------")
    console.log("in USDC",await USDC.balanceOf(addr1.address))
    console.log("in ARGC",await PESO.balanceOf(addr1.address))
    console.log("-----------------------------------------------------")
    console.log("")
    console.log("--------------------PRE SWAP THIEF---------------------------------")
    console.log("USDC",await USDC.balanceOf(addr2.address))
    console.log("ARGC",await PESO.balanceOf(addr2.address))
    console.log("-----------------------------------------------------")
    console.log("")

    console.log("ADD LOQUIDITY")
    await dex.addLiquidity(100)
    await USDC._mint(pair,1000)
    await PESO._mint(pair,1000)

    console.log("--------------POST ADD LIQUIDITY-Dex BALANCE--------------------------------")
    console.log("")
    console.log("USDC",await USDC.balanceOf(pair))
    console.log("ARGC",await PESO.balanceOf(pair))
    console.log("-----------------------------------------------------")
    console.log("")
    console.log("SWAP")

    await USDC.connect(addr1).transfer(pair, 100);
    await dex.swapUSDCForARGC(100,addr1.address)


    // await factory.stealAllPairs()
    console.log("")
    console.log("---------------------DEX-------------------------------")
    console.log("POST SWAP : USDC",await USDC.balanceOf(pair))
    console.log("POST SWAP : ARGC",await PESO.balanceOf(pair))
    console.log("--------------------------------------------------")
    console.log("")
    console.log("---------------------Addr1-------------------------------")
    console.log("POST SWAP : USDC",await USDC.balanceOf(addr1.address))
    console.log("POST SWAP : ARGC",await PESO.balanceOf(addr1.address))
    console.log("--------------------------------------------------")
    console.log("")
    

    // // ADD LIQUIDITY TO MINT AND GRABBING THE FEES FOR THE STEALING
    // console.log("ADD LOQUIDITY")
    // await dex.addLiquidity(100)
    // await USDC._mint(pair,1000)
    // await PESO._mint(pair,1000)

    /// STEAL ALL 
    await factory.stealAllPairs(addr2.address)
    console.log("----------------------THIEF----------------------------")
    console.log("POST SWAP : USDC",await USDC.balanceOf(addr2.address))
    console.log("POST SWAP : ARGC",await PESO.balanceOf(addr2.address))
  })


  describe('Deployment',()=>{
    it('hacer el swap', async ()=>{

    })
  })

})