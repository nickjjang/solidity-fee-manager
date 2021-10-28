// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ManageContract is Ownable {
    IERC20 _erc20;

    constructor(IERC20 erc20) {
        _erc20 = erc20;
    }

    function transfer(address[] memory to, uint256 amount) public {
        uint256 length = to.length;
        uint256 amountToBeDistributed = (amount * 99) / 100 / length;
        for (uint256 i = 0; i < length; i++) {
            _erc20.transferFrom(msg.sender, to[i], amountToBeDistributed);
        }
        uint256 feeAdded = amount - amountToBeDistributed * length;
        _erc20.transferFrom(msg.sender, address(this), feeAdded);
    }

    function withdrawFee(uint256 amount) public onlyOwner {
        require(
            amount > 0 && amount <= _erc20.balanceOf(address(this)),
            "TRASNFER::withdrawl amount is not correct"
        );
        _erc20.transfer(msg.sender, amount);
    }

    function getFee() public view returns (uint256) {
        return _erc20.balanceOf(address(this));
    }
}
