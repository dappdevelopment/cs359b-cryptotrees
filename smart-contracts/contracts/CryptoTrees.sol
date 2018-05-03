pragma solidity ^0.4.21;

import "./Ownable.sol";
import "./BasicERC721.sol";

contract CryptoTrees is BasicERC721, Ownable {

    string public name = 'Stanford CryptoTree';
    string public symbol = 'Tree';

    struct CryptoTree {
        bytes32 dna1;
        bytes32 dna2;
        string genome;
        uint64 hangoverEndTimestamp;
        uint64 hangoverDuration;
    }

    // Map trees ids to the CryptoTree struct containing this tree's data
    mapping (uint => CryptoTree) public trees;

    uint[] public existingIds;

    // TODO remove _metadata arg, generate genome randomly
    function growNewTree(address beneficiary, string _metadata) public {
        uint tokenId = totalTokens + 1;
        //require(tokenOwner[tokenId] == 0);
        //require(tokenId != 0); // This would break a lot of our logic downstream
        _growNewTree(beneficiary, tokenId, _metadata);
    }

    function _growNewTree(address beneficiary, uint tokenId, string _metadata) internal {
        _addTokenTo(beneficiary, tokenId);
        totalTokens++;
        existingIds.push(tokenId);
        trees[tokenId].genome = _metadata;
        tokenOwner[tokenId] = msg.sender;
        emit Created(tokenId, beneficiary, _metadata);
    }

    function buildTokenId(string _metadata, address _owner) public pure returns (uint256) {
        return uint256(keccak256(_metadata, _owner));
    }

    function exists(uint _id) public view returns (bool) {
        return ownerOfTree(_id) != 0;
    }

    function ownerOfTree(uint _id) public view returns (address) {
        return tokenOwner[_id];
    }

    function isHungover(uint _id) public view returns (bool) {
        return block.timestamp <= trees[_id].hangoverEndTimestamp;
    }

    function inviteToDance(uint inviterId, uint inviteeId) public {
        // 1.   Make sure the inviter belongs to the msg caller and the
        //      invitee doesn't
        require(exists(inviterId) && ownerOf(inviterId) == msg.sender);
        require(exists(inviteeId) && ownerOf(inviteeId) != msg.sender);

        // 2.   Make sure neither the inviter nor the invitee are currently
        //      hungover
        require(!isHungover(inviterId) && !isHungover(inviteeId));

        // 1.5 (v2?) Burn some amount of CDT that was paid by the inviter to
        //           buy some drinks
        // TODO

        // 2.   Compute the outcome as follows:
        //      ~40% chance the inviter mints a new token
        //      ~10% chance the invitee mints a new token
        //      ~50% chance nothing happens
        uint randomNumber = uint(blockhash(block.number-1)) % 100 + 1;
        if (randomNumber <= 40) {
            spawnChild(inviterId, inviteeId, msg.sender);
        } else if (randomNumber <= 50) {
            spawnChild(inviterId, inviteeId, ownerOf(inviteeId));
        }

        if (randomNumber <= 50) {
            // 3.   If some happy event happened, make them hungover for 24 hours
            trees[inviterId].hangoverEndTimestamp = trees[inviterId].hangoverEndTimestamp + 24 hours;
            trees[inviterId].hangoverEndTimestamp = trees[inviterId].hangoverEndTimestamp + 24 hours;
        }
    }

    function genome(uint id) public view returns (string) {
        return trees[id].genome;
    }

    function spawnChild(uint parent1Id, uint parent2Id, address childOwner) public {
        // 1. Compute the characteristics of the new tree
        // 2. Mint the new token
        // 3. Give it to the childOwner
    }

    /**
     * Get all trees that are not currently hungover:
     */
    function availableToParty() public view returns (uint[]) {
        uint[] memory result = new uint[](totalTokens);
        uint counter = 0;
        for (uint i = 0; i < totalTokens; i++) {
//            if (!isHungover(existingIds[i]) && (ownerOf(existingIds[i]) != msg.sender)) {
            if (ownerOf(existingIds[i]) != msg.sender) {
                result[counter] = existingIds[i];
                counter++;
            }
        }
        return result;
    }

    function allTrees() public view returns (uint[]) {
        return existingIds;
    }


    // store whether a tree is hungover

}
