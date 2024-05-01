import React from "react";
import { Utils, Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { Row, Card, Collapse, List, Select, Input, Column, Space } from "antd";
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };
  const alchemy = new Alchemy(settings);

const { Search } = Input;

const Adresses = () => {
    const [address, setAddress] = useState()
    const [tokenBalance, setTokenBalance] = useState()
    const [contractAddress, setContractAddress] = useState()

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAddress(e)
        console.log(`Address ${address}`);
      };

    const onSelect = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setContractAddress(e)
        console.log(`Contract address: ${contractAddress}`);
      };
    
    useEffect(() => {
        async function getTokenBalances(address, contractAddress) {
        var data = await alchemy.core.getTokenBalances(
            address,
            [contractAddress]
          );

          console.log(data)
          data = Number(data.tokenBalances[0].tokenBalance)
          data = data == 0 ? "" : data
          setTokenBalance(data);
        }

        getTokenBalances(address, contractAddress);
        console.log(`Balance: ${tokenBalance}`)

      },[address, contractAddress])
    


    return (
    <Row>
    <Card bordered = "false" style={{marginTop:'50px', marginLeft:'50px'}}>
    <Select
    onSelect={onSelect}
    style={{ width: "400px" }}
    placeholder="Search to Select"
    optionFilterProp="children"
    options={[
      {
        value: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        label: 'USDT',
      },
      {
        value: '0x00d1793d7c3aae506257ba985b34c76aaf642557',
        label: 'TACO',
      },
      {
        value: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        label: 'WETH',
      }
    ]}
  />
        <Search style={{maxWidth:'400px', marginTop:'10px'}} placeholder="Input address" allowClear onSearch={onChange} />
        <Card style = {{maxWidth:'800px', marginTop:'10px'}} title = {`Token balance`}>{tokenBalance}</Card>
    </Card>
    </Row>
    )
};
 
export default Adresses;