'use client';

import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from '@material-tailwind/react';

const TABS = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Monitored',
    value: 'monitored',
  },
  {
    label: 'Unmonitored',
    value: 'unmonitored',
  },
];

const TABLE_HEAD = ['Name', 'Amount', 'Type', 'Date', ''];

const TABLE_ROWS = [
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg',
    name: 'John Michael',
    pubKey: '0xeR1pg...9Uz',
    Amount: '34.1205 ETH',
    type: 'send',
    date: '1680237770',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg',
    name: 'Alexa Liras',
    pubKey: '0xeR1pg...9Uz',
    Amount: '34.1205 ETH',
    type: 'send',
    date: '1680237770',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg',
    name: 'Laurent Perrier',
    pubKey: '0xeR1pg...9Uz',
    Amount: '34.1205 ETH',
    type: 'Receive',
    date: '1680237770',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg',
    name: 'Michael Levi',
    pubKey: '0xeR1pg...9Uz',
    Amount: '34.1205 ETH',
    type: 'send',
    date: '1680237770',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg',
    name: 'Richard Gran',
    pubKey: '0xeR1pg...9Uz',
    Amount: '34.1205 ETH',
    type: 'Receive',
    date: '1680237770',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg',
    name: 'Richard Gran',
    pubKey: '0xeR1pg...9Uz',
    Amount: '34.1205 ETH',
    type: 'Receive',
    date: '1680237770',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg',
    name: 'Richard Gran',
    pubKey: '0xeR1pg...9Uz',
    Amount: '34.1205 ETH',
    type: 'Receive',
    date: '1680237770',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg',
    name: 'Richard Gran',
    pubKey: '0xeR1pg...9Uz',
    Amount: '34.1205 ETH',
    type: 'Receive',
    date: '1680237770',
  },
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg',
    name: 'Richard Gran',
    pubKey: '0xeR1pg...9Uz',
    Amount: '34.1205 ETH',
    type: 'Receive',
    date: '1680237770',
  },
];

export default function TransactionsMain() {
  return (
    <Card className="w-full h-[calc(100vh-92px)]">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex mb-6 items-center justify-between gap-8 font-uni">
          <div>
            <h2 className="text-black font-bold text-xl">Transaction list</h2>

            <p>See information about all transactions</p>
          </div>

          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>

      <CardBody className="p-0 flex flex-1 overflow-scroll">
        <table className="w-full min-w-max table-auto text-left relative mt-0">
          <thead className="sticky top-0 my-1 z-20">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="bg-gray-100 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="">
            {TABLE_ROWS.map(
              ({ img, name, pubKey, Amount, type, date }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50';

                const newDate = new Date(Number(date) * 1000);

                const formattedDate = newDate.toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                });
                const formattedTime = newDate.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                  hour12: true,
                });

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={img} alt={name} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {pubKey}
                          </Typography>
                        </div>
                      </div>
                    </td>

                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {Amount}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={type === 'send' ? 'Send' : 'Received'}
                          className={
                            type === 'send'
                              ? 'text-red-500 bg-red-500/10'
                              : 'text-green-500 bg-green-500/10'
                          }
                        />
                      </div>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {formattedDate}
                      </Typography>

                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {formattedTime}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Tooltip content="Open Transaction">
                        <IconButton variant="text">
                          <ChevronRightIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <p className="font-uni text-base">Page 1 of 10</p>

        <div className="flex gap-2">
          <Button variant="outlined" size="sm" className="font-uni">
            Previous
          </Button>

          <Button variant="outlined" size="sm" className="font-uni">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
