// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract VoteContract {
    uint256 index;

    struct Voter {
        uint256 idVote;
        string answer;
        uint256 timestamp;
    }

    struct Vote {
        uint256 id;
        string name;
        uint256 date;
        string question;
        string[] options;
        uint256 timestamp;
        address creator;
    }

    mapping(uint256 => mapping(address => Voter)) public voters;
    Vote[] public votes;
    mapping(address => Vote[]) public creatorVotes;
    mapping(address => Vote[]) public voterVotes;

    constructor() {
        index = 0;
    }

    function createVote(string memory _name, uint256 _date, string memory _question, string memory _optionsString) public {
        uint256 _timestamp = getCurrentTime();
        string[] memory _options = splitString(_optionsString, ";");
        Vote memory vote = Vote(index, _name, _date, _question, _options, _timestamp, msg.sender);
        creatorVotes[msg.sender].push(vote);
        votes.push(vote);
        index += 1;
    }

    function voteVote(uint256 _id, string memory _answer) public {
        require(_id < votes.length, "Invalid vote ID");
        require(voters[_id][msg.sender].timestamp == 0, "You have already voted for this vote");

        uint256 _timestamp = getCurrentTime();
        Voter memory voter = Voter(_id, _answer, _timestamp);
        voters[_id][msg.sender] = voter;
        votes[_id].timestamp = _timestamp;
        voterVotes[msg.sender].push(votes[_id]);
    }

    function getVotes(uint256 _type) public view returns (Vote[] memory) {
        if (_type == 1) {
            return votes;
        } else if (_type == 2) {
            return creatorVotes[msg.sender];
        } else {
            return voterVotes[msg.sender];
        }
    }

    function getVote(uint256 _id) public view returns (Vote memory) {
        require(_id < votes.length, "Invalid vote ID");
        return votes[_id];
    }

    function getCurrentTime() public view returns (uint) {
        uint _timestamp = block.timestamp;
        return _timestamp;
    }

    function splitString(string memory str, string memory delimiter) internal pure returns (string[] memory) {
        bytes memory strBytes = bytes(str);
        uint delimiterLength = bytes(delimiter).length;

        if (delimiterLength == 0) {
            string[] memory parts = new string[](1);
            parts[0] = str;
            return parts;
        } else {
            uint count = 1;
            for (uint i = 0; i < strBytes.length; i++) {
                if (strBytes[i] == bytes(delimiter)[0]) {
                    count++;
                }
            }

            string[] memory parts = new string[](count);
            uint partStart = 0;
            uint index2 = 0;

            for (uint i = 0; i < strBytes.length; i++) {
                if (strBytes[i] == bytes(delimiter)[0]) {
                    parts[index2] = new string(i - partStart);
                    for (uint j = partStart; j < i; j++) {
                        parts[index2] = string(abi.encodePacked(parts[index2], strBytes[j]));
                    }
                    partStart = i + delimiterLength;
                    index2++;
                }
            }

            parts[index2] = new string(strBytes.length - partStart);
            for (uint j = partStart; j < strBytes.length; j++) {
                parts[index2] = string(abi.encodePacked(parts[index2], strBytes[j]));
            }

            return parts;
        }
    }
}
