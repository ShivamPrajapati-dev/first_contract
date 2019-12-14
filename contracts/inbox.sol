pragma solidity ^0.4.17;

contract Inbox {

    string public message;

    function Inbox(string initialMsg) public {
        message = initialMsg;
    }

    function setMsg(string newMsg)public {
        message = newMsg;
    }

}
