import React from "react";
import { Utils, Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { Row, Card, Collapse, List } from "antd";
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);


const Home = () => {
    const [blockNumber, setBlockNumber] = useState();
    const [blockInfo, setBlockInfo] = useState()
    const [blockTransactions, setBlockTransactions] = useState()
    const [blockTimestamp, setBlockTimestamp] = useState()
    const [blockDifficulty, setBlockDifficulty] = useState()
    const [tenLatestBlocks, setTenLatestBlocks] = useState([])
  
    useEffect(() => {
      async function getBlockNumber() {
        setBlockNumber(await alchemy.core.getBlockNumber());
        console.log(blockNumber)
      }
  
      getBlockNumber();
    },)
  
    useEffect(() => {
      async function getBlockInfo() {
        var block = await alchemy.core.getBlock(blockNumber)
        setBlockInfo(Number(block.baseFeePerGas));
      }
  
      async function getBlockTransactions() {
        var txs = await alchemy.core.getBlockWithTransactions(blockNumber)
        setBlockTransactions(txs.transactions.length);
        setBlockDifficulty(String(txs.difficulty));
        var timestamp_ = new Date(txs.timestamp*1000)
        setBlockTimestamp(String(timestamp_))
      }
  
      async function getBlocksArray(blockNumber) {
        var blocks = [];
        // console.log(getBlockInfo(Number(blockNumber)-2))
        for (var i = blockNumber-10; i <= blockNumber; i++) {
          var block = await alchemy.core.getBlock(i)
          blocks.push(block);
        }
        
        setTenLatestBlocks(blocks);
      }
      
      getBlockInfo();
      getBlockTransactions();
      getBlocksArray(blockNumber);  
    }, [blockNumber]);
  
  
    return (
    <Row>
    <Card title='Most recent mined block' bordered = 'false' style={{marginLeft:'10px', marginTop: '10px', minWidth: '500px'}}>
    <text>Last update: {blockTimestamp}</text>
    <Card type='inner' title='Block Number'>{blockNumber}</Card>
    <Card type="inner" title='Base Fee per gas (wei)'>{blockInfo}</Card>
    <Card type="inner" title='Block Transactions number' >{blockTransactions}</Card>
    <Card type="inner" title='Block Difficulty'>{blockDifficulty}</Card>
    </Card>
    <Card style = {{maxWidth:'1000px', flex:"wrap", overflow:'clip'}}>
      <List
      dataSource={tenLatestBlocks}
      renderItem={(item) => (<Card title={`Block hash: ${item.hash}`} style={{maxWidth:'800px', flex: "wrap", marginLeft:'10px'}}>
        <p>Timestamp: {item.timestamp}</p>
        <p>Gas Limit: {Number(item.gasLimit)}</p>
        <p>Gas Used: {Number(item.gasUsed)}</p>
        <p>Miner: {item.miner}</p>
        <p>Nonce: {item.nonce}</p>
        <Collapse  bordered={false} items={[{key: '1', label: `Transactions`, children: <List dataSource={item.transactions.slice(0,10)} renderItem = {(item)=> (<p>{item}</p>)}>
        </List>}]}></Collapse>
      </Card>
    )}
      ></List>
    </Card>
    </Row>
    )
  
};
 
export default Home;