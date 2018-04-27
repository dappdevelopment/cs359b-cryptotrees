pragma solidity ^0.4.15;

contract ERC721 {
    function totalSupply() constant returns (uint);
    function balanceOf(address) constant returns (uint);

    function ownerOf(uint tokenId) constant returns (address);

    function transfer(address to, uint tokenId);
    function takeOwnership(uint tokenId);
    function transferFrom(address to, uint tokenId);
    function approve(address beneficiary, uint tokenId);
}
