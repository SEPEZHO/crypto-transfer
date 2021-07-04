import React, { useEffect, useState } from "react";
import { Button } from "antd";
import Web3 from "web3";

import Form from "../Form/";

// подключение на прямую к локальной сети маиннету если надо
// const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"))

const Main = () => {
  const [user, setUser] = useState({ text: "", error: true });

  const getUserData = async () => {
    // проверяем если ли метамаск (он вшивает метод для работы с ним)
    if (window.ethereum) {
      try {
        // коннектимся к метамаск
        await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);
        // вытаскиваем кошельки
        const acc = await web3.eth.getAccounts();
        // получаем баланс первого кошелька (у метамаск он 1)
        let balance = await web3.eth.getBalance(acc[0], (e, r) => (e ? 0 : r));
        // конвертируем Wei в эфир (1 Wei это 0,000000000000000001 ETH)
        balance = web3.utils.fromWei(balance, "ether");
        setUser({ text: acc[0], balance: balance, error: false });
      } catch (e) {
        // Если юзер мудак, то по ошибкам (e) можно узнать о его действиях
        if (e.code === -32002) {
          setUser({ text: "⚠️ Close previus tab", error: true });
        } else if (e.code === 4001) {
          setUser({
            text: "⚠️ U closed previus tab. Retry now :)",
            error: true,
          });
        } else {
          setUser({ text: "⚠️ Something went wrong. Retry :)", error: true });
        }
      }
    } else {
      setUser({ text: "⚠️ You have to install MetaMask !", error: true });
    }
  };

  useEffect(getUserData, []);

  return (
    <div className="MainContainer">
      {user.error && (
        <div>
          <p>🔗 Connect wallet!</p>
          <p>{user.text}</p>
          <Button type="dashed" onClick={getUserData}>
            Connect
          </Button>
        </div>
      )}
      {!user.error && <Form {...user} getUserData={getUserData} />}
    </div>
  );
};

export default Main;
