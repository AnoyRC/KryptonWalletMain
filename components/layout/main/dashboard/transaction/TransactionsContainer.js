'use client';

import { Card } from '@material-tailwind/react';

import TransactionHeader from './TransactionHeader';
import TransactionFooter from './TransactionFooter';
import TransactionMain from './TransactionMain';

const TABLE_HEAD = ['Name', 'Amount', 'Type', 'Date', ''];

const TABLE_ROWS = [
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg',
    name: 'John Michael',
    pubKey: '0xeR1pg7TgpQLaiH29ifs9Uz',
    Amount: '34.1205 ETH',
    type: 'send',
    date: '1680237770',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg',
    name: 'Alexa Liras',
    pubKey: '0xeR1pg7TgpQLaiH29ifs9Uz',
    Amount: '34.1205 ETH',
    type: 'send',
    date: '1680237770',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg',
    name: 'Laurent Perrier',
    pubKey: '0xeR1pg7TgpQLaiH29ifs9Uz',
    Amount: '34.1205 ETH',
    type: 'Receive',
    date: '1680237770',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg',
    name: 'Michael Levi',
    pubKey: '0xeR1pg7TgpQLaiH29ifs9Uz',
    Amount: '34.1205 ETH',
    type: 'send',
    date: '1680237770',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg',
    name: 'Richard Gran',
    pubKey: '0xeR1pg7TgpQLaiH29ifs9Uz',
    Amount: '34.1205 ETH',
    type: 'Receive',
    date: '1680237770',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg',
    name: 'Richard Gran',
    pubKey: '0xeR1pg7TgpQLaiH29ifs9Uz',
    Amount: '34.1205 ETH',
    type: 'Receive',
    date: '1680237770',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg',
    name: 'Richard Gran',
    pubKey: '0xeR1pg7TgpQLaiH29ifs9Uz',
    Amount: '34.1205 ETH',
    type: 'Receive',
    date: '1680237770',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg',
    name: 'Richard Gran',
    pubKey: '0xeR1pg7TgpQLaiH29ifs9Uz',
    Amount: '34.1205 ETH',
    type: 'Receive',
    date: '1680237770',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg',
    name: 'Richard Gran',
    pubKey: '0xeR1pg7TgpQLaiH29ifs9Uz',
    Amount: '34.1205 ETH',
    type: 'Receive',
    date: '1680237770',
  },
];

export default function TransactionsContainer() {
  return (
    <Card className="w-full h-[calc(100vh-92px)]">
      <TransactionHeader />
      <TransactionMain tableHead={TABLE_HEAD} tableRows={TABLE_ROWS} />
      <TransactionFooter />
    </Card>
  );
}
