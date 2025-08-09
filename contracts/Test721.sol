// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {ERC721Pausable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Test721 is ERC721, ERC721Enumerable, ERC721Pausable, Ownable {
    uint256 private _nextTokenId;
    uint256 private _maxSupply = 10;

    bool public publictMintOpen = false;
    bool public allowListMintOpen = false;

    mapping ( address => bool ) public allowList;

    constructor(address initialOwner)
        ERC721("KietToken", "KTK")
        Ownable(initialOwner)
    {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function editMintWindows(bool _publictMintOpen, bool _allowListMintOpen) external  onlyOwner {
        publictMintOpen = _publictMintOpen;
        allowListMintOpen = _allowListMintOpen;
    }

    function safeMint(address to) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        return tokenId;
    }

    function publicMint()  public payable returns (uint256) {
        require(publictMintOpen, "Public Mint Closed");
        require(msg.value == 0.01 ether, "You must send exactly 0.01 ETH");
        return internalMint();
    }

    function allowListMint()  public payable returns (uint256) {
        require(allowListMintOpen, "AllowList Mint Closed");
        require(allowList[msg.sender], "You are not on the allow list");
        require(msg.value == 0.001 ether, "You must send exactly 0.001 ETH");
        return internalMint();
    }

    function internalMint() internal returns (uint256) {
        require (totalSupply() < _maxSupply, "No more Supply"); 
        uint256 tokenId = _nextTokenId++;
         _safeMint(msg.sender, tokenId);
         return tokenId;
    }

    function setAllowList(address[] calldata addresses) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            allowList[addresses[i]] = true;
        }
    }

    // payable(address).transfer(amount);
    // address: địa chỉ người nhận
    // amount: số ETH gửi đi (đơn vị là wei)
    function withdraw(address _addr) external onlyOwner {
        uint256 balance = address(this).balance;
        payable (_addr).transfer(balance);
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}