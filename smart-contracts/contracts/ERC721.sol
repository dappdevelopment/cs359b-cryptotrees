pragma solidity ^0.4.21;

contract ERC721 {
    function totalSupply() constant public returns (uint);
    function balanceOf(address) constant public returns (uint);

    function ownerOf(uint tokenId) constant public returns (address);

    function transfer(address to, uint tokenId) public;
    function takeOwnership(uint tokenId) public;
    function transferFrom(address to, uint tokenId) public;
    function approve(address beneficiary, uint tokenId) public;
}
