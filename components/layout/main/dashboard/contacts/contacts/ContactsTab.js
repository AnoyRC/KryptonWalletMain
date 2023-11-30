'use client';

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';
import { useState } from 'react';

import ContactsBody from './contactTab/ContactsBody';
import RequestsBody from './requestsTab/RequestsBody';

const ContactsTab = () => {
  const [activeTab, setActiveTab] = useState('contacts');
  const data = [
    {
      label: 'Contacts',
      value: 'contacts',
      body: <ContactsBody />,
    },
    {
      label: 'Requests',
      value: 'requests',
      body: <RequestsBody />,
    },
  ];

  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
        indicatorProps={{
          className:
            'bg-transparent border-b-2 border-gray-900 shadow-none rounded-none',
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={activeTab === value ? 'text-gray-900' : ''}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>

      <TabsBody className="h-full">
        {data.map(({ value, body }) => (
          <TabPanel key={value} value={value} className="px-0 h-full">
            {body}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default ContactsTab;
