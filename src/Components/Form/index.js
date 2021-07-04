import React, { useState } from "react";
import { Space, Button, Divider, Input, Alert, message } from "antd";
import Web3 from "web3";

const Form = (props) => {
  const [user, setUser] = useState({ text: "", error: true });
  const [transactionData, setTransactionData] = useState({
    val: 0,
    gwei: 0,
    showAlert: false,
  });
  const [transactionsData, setTransactionsData] = useState(
    localStorage.getItem("TransactionsHistory")
      ? JSON.parse(localStorage.getItem("TransactionsHistory"))
      : []
  );

  const getUserData = async (hash) => {
    try {
      await window.ethereum.enable();
      const web3 = new Web3(window.ethereum);
      let balance = await web3.eth.getBalance(hash, (e, r) => (e ? 0 : r));
      balance = web3.utils.fromWei(balance, "ether");
      setUser({ text: hash, balance: balance, error: false });
    } catch {
      setUser({
        text: "⚠️ Something went wrong. Set actual acc :)",
        error: true,
      });
    }
  };

  const sentSubmit = async () => {
    await window.ethereum.enable();
    const web3 = new Web3(window.ethereum);
    const block = await web3.eth.getBlock("latest");
    setTransactionData({
      val: transactionData.val,
      gwei: web3.utils.fromWei(block.gasUsed + "", "ether"),
      showAlert: true,
    });
  };

  const sentTransaction = async () => {
    try {

      await window.ethereum.enable();
      const web3 = new Web3(window.ethereum);

      // вытаскиваем последний блок из блокчейна (чтоб вытащить из него gasLimit)
      const block = await web3.eth.getBlock("latest");

      // параметры для транзакции
      const options = {
        to: user.text,
        from: props.text,
        // конвертер обратно из ETH в WEI
        value: web3.utils.toWei(transactionData.val, "ether"),
        gasPrice: web3.utils.toWei(transactionData.gwei, "ether"),
        gas: block.gasLimit,
      };
      
      // производим транзакцию
      const lastTransactionData= await web3.eth.sendTransaction(options);
      
      // далее обновляем данные пользователей (снова вызываю функцию, которая обновит балансы)
      props.getUserData();
      getUserData(user.text);
      // закидываю последние данные о транзакции в историю
      setTransactionsData([lastTransactionData, ...transactionsData].slice(0, 6));
      // а историю храню в локалстор (да да да костыль... и что ты мне сделаешь?)
      localStorage.setItem(
        "TransactionsHistory",
        JSON.stringify([lastTransactionData, ...transactionsData].slice(0, 6))
      );
      // сообщение что все вна2ре четко
      message.success(
        "Done transaction! " + transactionData.val + "ETH has been sent!"
      );
      setTransactionData({
        val: transactionData.val,
        gwei: transactionData.gwei,
        showAlert: false,
      });
    } catch {
      message.error("Something went wrong!");
      setTransactionData({
        val: transactionData.val,
        gwei: transactionData.gwei,
        showAlert: false,
      });
    }
  };

  const declineTransaction = async () => {
    message.error("Transaction has been declined!");
    setTransactionData({
      val: transactionData.val,
      gwei: transactionData.gwei,
      showAlert: false,
    });
  };

  return (
    <div className="FormContainer">
      <p>✔ Connected!</p>
      <p>
        Ur account hash: {props.text.slice(0, 10)}...{props.text.slice(-5)}
      </p>
      <p>
        Ur account balance: <b>{Number(props.balance).toFixed(4)}</b> ETH
      </p>
      <Divider dashed />
      <p>
        Transfer to:
        <br />
        <Input
          placeholder="0xbCc210E4...f3e5F"
          onChange={(e) => getUserData(e.target.value)}
        />
      </p>

      {user.text && (
        <div>
          {!user.error && (
            <div>
              <p>
                User transfer to hash: {user.text.slice(0, 10)}...
                {user.text.slice(-5)}
              </p>
              <p>
                User transfer to account balance:{" "}
                <b>{Number(user.balance).toFixed(4)}</b> ETH
              </p>
              <div>
                <p>
                  Transfer walue (ETH):
                  <br />
                  <Input
                    placeholder="0,1"
                    onChange={(e) =>
                      setTransactionData({
                        val: e.target.value,
                        gwei: transactionData.gwei,
                        showAlert: false,
                      })
                    }
                  />
                </p>

                <p>
                  <Button type="dashed" onClick={sentSubmit}>
                    Send
                  </Button>
                </p>
              </div>
            </div>
          )}
          {user.error && user.text}
        </div>
      )}

      {transactionData.showAlert && (
        <Alert
          message="Transaction submit"
          description={
            <span>
              R u shure whant to send <b>{transactionData.val}</b> ETH?
              <br />
              It will be cost <b>{transactionData.gwei}</b> ETH!
            </span>
          }
          type="info"
          action={
            <Space direction="vertical">
              <Button
                className="AlertBtn"
                size="small"
                type="primary"
                onClick={sentTransaction}
              >
                Sent
              </Button>
              <Button
                className="AlertBtn"
                size="small"
                danger
                type="ghost"
                onClick={declineTransaction}
              >
                Decline
              </Button>
            </Space>
          }
        />
      )}

      {transactionsData[0] && (
        <div>
          <Divider dashed />
          History:
          <br />
          <div className="Transactions">
            {transactionsData.map((e) => (
              <div className="Transaction">
                <span className="TransactionTitle">
                  --- Block number: {e.blockNumber} ---
                </span>
                <Divider dashed />* Status: {e.status ? "Done!" : "Error!"}
                <Divider dashed />* From: {e.from.slice(0, 10)}...
                {e.from.slice(-5)}
                <Divider dashed />* To: {e.to.slice(0, 10)}...{e.to.slice(-5)}
                <Divider dashed />* Gas used (WEI): {e.gasUsed}
                <Divider dashed />* Transaction hash:{" "}
                {e.transactionHash.slice(0, 8)}...{e.transactionHash.slice(-5)}
              </div>
            ))}
          </div>
          <Button
            type="dashed"
            onClick={() => {
              setTransactionsData([]);
              localStorage.clear();
            }}
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
};

export default Form;
