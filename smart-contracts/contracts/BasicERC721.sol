pragma solidity ^0.4.15;

import "./ERC721.sol";
import "./ERC721Events.sol";

contract BasicERC721 is ERC721, ERC721Events {
    uint public totalTokens;

    // Array of owned tokens for a user
    mapping(address => uint[]) public ownedTokens;
    mapping(address => uint) _amountOwned;
    mapping(uint => uint) _tokenIndexInOwnerArray;

    // Mapping from token ID to owner
    mapping(uint => address) public tokenOwner;

    // Allowed transfers for a token (only one at a time)
    mapping(uint => address) public allowedTransfer;

    /**
     * Override ERC721.sol
     */
    function totalSupply() public constant returns (uint) {
        return totalTokens;
    }

    /**
     * Override ERC721.sol
     */
    function balanceOf(address owner) public constant returns (uint) {
        return _amountOwned[owner];
    }

    /**
     * Override ERC721.sol
     */
    function ownerOf(uint tokenId) public constant returns (address) {
        return tokenOwner[tokenId];
    }

    /**
     * Override ERC721.sol
     */
    function transfer(address to, uint tokenId) public {
        require(tokenOwner[tokenId] == msg.sender || allowedTransfer[tokenId] == msg.sender);
        return _transfer(tokenOwner[tokenId], to, tokenId);
    }

    /**
     * Override ERC721.sol
     */
    function takeOwnership(uint tokenId) public {
        require(allowedTransfer[tokenId] == msg.sender);
        return _transfer(tokenOwner[tokenId], msg.sender, tokenId);
    }

    /**
     * Override ERC721.sol
     */
    function transferFrom(address to, uint tokenId) public {
        require(allowedTransfer[tokenId] == msg.sender);
        return _transfer(tokenOwner[tokenId], to, tokenId);
    }

    /**
     * Override ERC721.sol
     */
    function approve(address beneficiary, uint tokenId) public {
        require(msg.sender == tokenOwner[tokenId]);

        if (allowedTransfer[tokenId] != 0) {
            allowedTransfer[tokenId] = 0;
        }
        allowedTransfer[tokenId] = beneficiary;
        emit Approval(tokenOwner[tokenId], beneficiary, tokenId);
    }

    function getAllTokens(address owner) public constant returns (uint[]) {
        uint size = _amountOwned[owner];
        uint[] memory result = new uint[](size);
        for (uint i = 0; i < size; i++) {
            result[i] = ownedTokens[owner][i];
        }
        return result;
    }

    function _transfer(address from, address to, uint tokenId) internal {
        _clearApproval(tokenId);
        _removeTokenFrom(from, tokenId);
        _addTokenTo(to, tokenId);
        Transferred(tokenId, from, to);
    }

    function _sell(address from, address to, uint tokenId, uint price) internal {
        _removeTokenFrom(from, tokenId);
        _addTokenTo(to, tokenId);
        emit Sold(tokenId, from, to, price);
    }

    function _clearApproval(uint tokenId) internal {
        allowedTransfer[tokenId] = 0;
        emit Approval(tokenOwner[tokenId], 0, tokenId);
    }

    function _removeTokenFrom(address from, uint tokenId) internal {
        require(_amountOwned[from] > 0);

        uint length = _amountOwned[from];
        uint index = _tokenIndexInOwnerArray[tokenId];
        uint swapToken = ownedTokens[from][length - 1];

        ownedTokens[from][index] = swapToken;
        _tokenIndexInOwnerArray[swapToken] = index;
        _amountOwned[from]--;
    }

    function _addTokenTo(address owner, uint tokenId) internal {
        if (ownedTokens[owner].length == _amountOwned[owner]) {
            ownedTokens[owner].push(tokenId);
        } else {
            ownedTokens[owner][_amountOwned[owner]] = tokenId;
        }
        tokenOwner[tokenId] = owner;
        _tokenIndexInOwnerArray[tokenId] = _amountOwned[owner];
        _amountOwned[owner]++;
    }
}
