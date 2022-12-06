pragma solidity 0.6.6;

import '@uniswap/v2-periphery/contracts/UniswapV2Router02.sol';
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Callee.sol';
import '@uniswap/v2-periphery/contracts/UniswapV2Router02.sol';
import '@uniswap/v2-periphery/contracts/libraries/UniswapV2Library.sol';
import '@uniswap/v2-periphery/contracts/UniswapV2Router02.sol';
import '@uniswap/v2-periphery/contracts/interfaces/IERC20.sol';
import '@uniswap/v2-periphery/contracts/interfaces/IWETH.sol';

contract Dex {
  string public name = "Dex";
  address internal constant UNISWAP_V2_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
  address internal constant FACTORY = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
  address internal constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
  IUniswapV2Router02 public uniswapRouter;
  IUniswapV2Factory public factory;
  
  constructor() public payable {
    uniswapRouter = IUniswapV2Router02(UNISWAP_V2_ROUTER);
  }

  function swapEthForUSDC(uint _amount) external payable {
    uint deadline = block.timestamp + 150;
    address[] memory path = getEthForUSDCPath();
    address WETH = uniswapRouter.WETH();

    address pair = IUniswapV2Factory(FACTORY).getPair(USDC, WETH);
    require(pair != address(0), "!pair");

    address token0 = IUniswapV2Pair(pair).token0();
    address token1 = IUniswapV2Pair(pair).token1();
 
    uint amount0Out = WETH == token0? _amount : 0 ;
    uint amount1Out = WETH == token1? _amount : 0 ;
    
    uint256 reserve0 = IERC20(token0).balanceOf(pair);
    uint256 reserve1 = IERC20(token1).balanceOf(pair);
    // need to pass some data to trigger uniswapV2Call

    bytes memory data = abi.encode(WETH, msg.sender);
    
    // uint amountOutMin = UniswapV2Library.getAmountOut(_amount,reserve0,reserve1);
    IUniswapV2Pair(pair).swap(amount0Out, amount1Out, address(this) ,data);

  }

  function swapUSDCForEth(uint tokenAmount) external payable {
    uint deadline = block.timestamp + 150;
    address[] memory path = getUSDCForEthPath();
    uint amountOutMin = uniswapRouter.getAmountsOut(tokenAmount, path)[1];
    IERC20(USDC).transferFrom(msg.sender, address(this), tokenAmount);
    IERC20(USDC).approve(UNISWAP_V2_ROUTER, tokenAmount);
    uniswapRouter.swapExactTokensForETH(tokenAmount, amountOutMin, path, msg.sender, deadline);
  }

  function getEthForUSDCPath() private view returns (address[] memory) {
    address[] memory path = new address[](2);
    path[0] = uniswapRouter.WETH();
    path[1] = USDC;

    return path;
  }

  function getUSDCForEthPath() private view returns (address[] memory) {
    address[] memory path = new address[](2);
    path[0] = USDC;
    path[1] = uniswapRouter.WETH();

    return path;
  }
}