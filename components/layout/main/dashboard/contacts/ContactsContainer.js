import { Card } from '@material-tailwind/react';

import ContactsTab from './contacts/ContactsTab';

const ContactsContainer = () => {
  return (
    <aside>
      <Card className="p-4 w-[300px] flex flex-col h-full">
        <ContactsTab />
      </Card>
    </aside>
  );
};

export default ContactsContainer;
