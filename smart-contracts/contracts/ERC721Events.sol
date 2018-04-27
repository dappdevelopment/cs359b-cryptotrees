pragma solidity ^0.4.0;

contract ERC721Events {
    event Created(uint tokenId, address owner, string metadata);
    event Destroyed(uint tokenId, address owner);

    event Transferred(uint tokenId, address from, address to);
    event Approval(address owner, address beneficiary, uint tokenId);

    event Sold(uint tokenId, address from, address to, uint price);

    event MetadataUpdated(uint tokenId, address owner, string data);
}
