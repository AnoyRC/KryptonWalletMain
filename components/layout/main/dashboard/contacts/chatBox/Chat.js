'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MessageWithDate from './MessageWithDate';

const Chat = () => {
  const currentContact = useSelector((state) => state.contacts.currentContact);
  const pushSign = useSelector((state) => state.contacts.pushSign);

  // const [messageHistory, setMessageHistory] = useState([
  //   {
  //     link: 'bafyreibfikschwlfi275hr7lrfqgj73mf6absailazh4sm5fwihspy2ky4',
  //     toDID: 'eip155:0xb340E384FC4549591bc7994b0f90074753dEC72a',
  //     encType: 'pgp',
  //     fromDID: 'eip155:0x0F1AAC847B5720DDf01BFa07B7a8Ee641690816d',
  //     sigType: 'pgp',
  //     toCAIP10: 'eip155:0xb340E384FC4549591bc7994b0f90074753dEC72a',
  //     signature:
  //       '-----BEGIN PGP SIGNATURE-----\n' +
  //       '\n' +
  //       'wsBzBAEBCAAnBQJjh5tjCRBaJmgmByp5FRYhBJC23yBJT2d/pTAID1omaCYH\n' +
  //       'KnkVAAAZmwf/buPLw6caSZmYnw6D3/p6HF1kWlkGUOTP4RasaU/6dkeDaZs9\n' +
  //       'SJlz2wC8oOpBGWHMJ/5n3ZWmU71E6U7IKIY793MyIv5t32vTNkwsRHUX7IIn\n' +
  //       'QFF+FzTIEtHHVTRlnkqNR2YUk1kqcpZCZWHfahi5W2d/WkXlFNdvyyFH4W8L\n' +
  //       'd03FGhOyXbWwU3xicBz5mSBpIFaaSCXl1SdgJDPXLSk3b65EEOjCOaiz85xC\n' +
  //       'G+6SW4RUzCGSDcOd9F2EXvvY5H9LgQNi1jjlZn6JrPTPJTJ+wXZXzcZmtOXG\n' +
  //       'EKcwvPbbPY9wd+gavRSOgYLYn5xoZQW/o3hW7AQlbC5Kj6js48Z0HQ==\n' +
  //       '=qLiJ\n' +
  //       '-----END PGP SIGNATURE-----\n',
  //     timestamp: 1669831523684,
  //     fromCAIP10: 'eip155:0x0F1AAC847B5720DDf01BFa07B7a8Ee641690816d',
  //     messageType: 'Text',
  //     messageContent:
  //       'Hi Gautam, How are you! Its me anoy. Hope uou are doing well!!',
  //     encryptedSecret:
  //       '-----BEGIN PGP MESSAGE-----\n' +
  //       '\n' +
  //       'wcBMA1fn1CNqxQ7nAQgArlo75qe54WerfRKFv1+F9j4NRMvSTgUztvIe51eg\n' +
  //       'd5MVuj6RYxKERr2bTuBt5cMDJMlNuTnBBkPe4L8+SlsI46L9wmXV9xLoZq1a\n' +
  //       '94JdxD98RGMF99Jde/3hC/X6GS1yVqPpKPKdWx/tkOPeyqeO/wFF7kqShgIi\n' +
  //       'Wgq6hGz1fzD3GZhKGY0VSLuC3s0aUy/qw5En1Xd0uX0jdXBl07IIj8p1G2zx\n' +
  //       '9BuVlksSK34yvIc0RQfCeRadMHkxbA0Hyj31Wrr+Y310YLTppL0s5bQR9APL\n' +
  //       'WHsIztJ1fHTnXsPhnA7YG0SQpHTyJhuX3rgBjxGrvbZBArmZ+R/Pq9IkOkJe\n' +
  //       'z8HATAMOsbaZjGN5JwEH/jYjLN6AFRWeaB5CSBSAF+CvHsUgadGmxTdSHBM6\n' +
  //       'LM9rfGg/MCnpRBuHckA0NNZh+wepq6TDA54ZopsdP14gHj4MKCdfqZr86Jft\n' +
  //       'ldtjeSgPTFEEJxPMJ4/Z3UeFU9rvOgfxX6l0eHWS0MYwJ3sVYvSyqqHir1K5\n' +
  //       'TRdEIgtQ3NvLTKkX4bKTSU+SInrvDA+wsc2BcBsbgNhRiGb+XYrbqXBshL1a\n' +
  //       'lIdpnomkAQgOZMO2n347uURYoruH3OtFeNABJ9D/nEU+LdhDOPGZPefvPBc5\n' +
  //       'BxK4ExKZ2Wo/TZw8lgC53uqOljsGV63Hp71LkyesKWu5/+vdVrYx/vU63shh\n' +
  //       'x/TSQAEiaFYEfkWSOthtH0nrJHhkY7FWgjp/1bj/J4J9HCQrVtt2WlQfhowZ\n' +
  //       'ILxhKk/vep0sJviM3SfJ4hPtoYpZESc=\n' +
  //       '=43Ta\n' +
  //       '-----END PGP MESSAGE-----\n',
  //   },
  //   {
  //     link: 'bafyreibfikschwlfi275hr7lrfqgj73mf6absailazh4sm5fwihspy2ky4',
  //     toDID: 'eip155:0xb340E384FC4549591bc7994b0f90074753dEC72a',
  //     encType: 'pgp',
  //     fromDID: 'eip155:0x0F1AAC847B5720DDf01BFa07B7a8Ee641690816d',
  //     sigType: 'pgp',
  //     toCAIP10: 'eip155:0xb340E384FC4549591bc7994b0f90074753dEC72a',
  //     signature:
  //       '-----BEGIN PGP SIGNATURE-----\n' +
  //       '\n' +
  //       'wsBzBAEBCAAnBQJjh5tjCRBaJmgmByp5FRYhBJC23yBJT2d/pTAID1omaCYH\n' +
  //       'KnkVAAAZmwf/buPLw6caSZmYnw6D3/p6HF1kWlkGUOTP4RasaU/6dkeDaZs9\n' +
  //       'SJlz2wC8oOpBGWHMJ/5n3ZWmU71E6U7IKIY793MyIv5t32vTNkwsRHUX7IIn\n' +
  //       'QFF+FzTIEtHHVTRlnkqNR2YUk1kqcpZCZWHfahi5W2d/WkXlFNdvyyFH4W8L\n' +
  //       'd03FGhOyXbWwU3xicBz5mSBpIFaaSCXl1SdgJDPXLSk3b65EEOjCOaiz85xC\n' +
  //       'G+6SW4RUzCGSDcOd9F2EXvvY5H9LgQNi1jjlZn6JrPTPJTJ+wXZXzcZmtOXG\n' +
  //       'EKcwvPbbPY9wd+gavRSOgYLYn5xoZQW/o3hW7AQlbC5Kj6js48Z0HQ==\n' +
  //       '=qLiJ\n' +
  //       '-----END PGP SIGNATURE-----\n',
  //     timestamp: 1669831523684,
  //     fromCAIP10: 'eip155:0x0F1AAC847B5720DDf01BFa07B7a8Ee641690816d',
  //     messageType: 'Text',
  //     messageContent: 'Hi',
  //     encryptedSecret:
  //       '-----BEGIN PGP MESSAGE-----\n' +
  //       '\n' +
  //       'wcBMA1fn1CNqxQ7nAQgArlo75qe54WerfRKFv1+F9j4NRMvSTgUztvIe51eg\n' +
  //       'd5MVuj6RYxKERr2bTuBt5cMDJMlNuTnBBkPe4L8+SlsI46L9wmXV9xLoZq1a\n' +
  //       '94JdxD98RGMF99Jde/3hC/X6GS1yVqPpKPKdWx/tkOPeyqeO/wFF7kqShgIi\n' +
  //       'Wgq6hGz1fzD3GZhKGY0VSLuC3s0aUy/qw5En1Xd0uX0jdXBl07IIj8p1G2zx\n' +
  //       '9BuVlksSK34yvIc0RQfCeRadMHkxbA0Hyj31Wrr+Y310YLTppL0s5bQR9APL\n' +
  //       'WHsIztJ1fHTnXsPhnA7YG0SQpHTyJhuX3rgBjxGrvbZBArmZ+R/Pq9IkOkJe\n' +
  //       'z8HATAMOsbaZjGN5JwEH/jYjLN6AFRWeaB5CSBSAF+CvHsUgadGmxTdSHBM6\n' +
  //       'LM9rfGg/MCnpRBuHckA0NNZh+wepq6TDA54ZopsdP14gHj4MKCdfqZr86Jft\n' +
  //       'ldtjeSgPTFEEJxPMJ4/Z3UeFU9rvOgfxX6l0eHWS0MYwJ3sVYvSyqqHir1K5\n' +
  //       'TRdEIgtQ3NvLTKkX4bKTSU+SInrvDA+wsc2BcBsbgNhRiGb+XYrbqXBshL1a\n' +
  //       'lIdpnomkAQgOZMO2n347uURYoruH3OtFeNABJ9D/nEU+LdhDOPGZPefvPBc5\n' +
  //       'BxK4ExKZ2Wo/TZw8lgC53uqOljsGV63Hp71LkyesKWu5/+vdVrYx/vU63shh\n' +
  //       'x/TSQAEiaFYEfkWSOthtH0nrJHhkY7FWgjp/1bj/J4J9HCQrVtt2WlQfhowZ\n' +
  //       'ILxhKk/vep0sJviM3SfJ4hPtoYpZESc=\n' +
  //       '=43Ta\n' +
  //       '-----END PGP MESSAGE-----\n',
  //   },
  //   {
  //     link: 'bafyreibfikschwlfi275hr7lrfqgj73mf6absailazh4sm5fwihspy2ky4',
  //     toDID: 'eip155:0xb340E384FC4549591bc7994b0f90074753dEC72a',
  //     encType: 'pgp',
  //     fromDID: 'eip155:0xD203EC25bD177bd90d0E8E29acd74B4A2c840Aa9',
  //     sigType: 'pgp',
  //     toCAIP10: 'eip155:0xb340E384FC4549591bc7994b0f90074753dEC72a',
  //     signature:
  //       '-----BEGIN PGP SIGNATURE-----\n' +
  //       '\n' +
  //       'wsBzBAEBCAAnBQJjh5tjCRBaJmgmByp5FRYhBJC23yBJT2d/pTAID1omaCYH\n' +
  //       'KnkVAAAZmwf/buPLw6caSZmYnw6D3/p6HF1kWlkGUOTP4RasaU/6dkeDaZs9\n' +
  //       'SJlz2wC8oOpBGWHMJ/5n3ZWmU71E6U7IKIY793MyIv5t32vTNkwsRHUX7IIn\n' +
  //       'QFF+FzTIEtHHVTRlnkqNR2YUk1kqcpZCZWHfahi5W2d/WkXlFNdvyyFH4W8L\n' +
  //       'd03FGhOyXbWwU3xicBz5mSBpIFaaSCXl1SdgJDPXLSk3b65EEOjCOaiz85xC\n' +
  //       'G+6SW4RUzCGSDcOd9F2EXvvY5H9LgQNi1jjlZn6JrPTPJTJ+wXZXzcZmtOXG\n' +
  //       'EKcwvPbbPY9wd+gavRSOgYLYn5xoZQW/o3hW7AQlbC5Kj6js48Z0HQ==\n' +
  //       '=qLiJ\n' +
  //       '-----END PGP SIGNATURE-----\n',
  //     timestamp: 1669831523684,
  //     fromCAIP10: 'eip155:0x0F1AAC847B5720DDf01BFa07B7a8Ee641690816d',
  //     messageType: 'Text',
  //     messageContent: 'Hi',
  //     encryptedSecret:
  //       '-----BEGIN PGP MESSAGE-----\n' +
  //       '\n' +
  //       'wcBMA1fn1CNqxQ7nAQgArlo75qe54WerfRKFv1+F9j4NRMvSTgUztvIe51eg\n' +
  //       'd5MVuj6RYxKERr2bTuBt5cMDJMlNuTnBBkPe4L8+SlsI46L9wmXV9xLoZq1a\n' +
  //       '94JdxD98RGMF99Jde/3hC/X6GS1yVqPpKPKdWx/tkOPeyqeO/wFF7kqShgIi\n' +
  //       'Wgq6hGz1fzD3GZhKGY0VSLuC3s0aUy/qw5En1Xd0uX0jdXBl07IIj8p1G2zx\n' +
  //       '9BuVlksSK34yvIc0RQfCeRadMHkxbA0Hyj31Wrr+Y310YLTppL0s5bQR9APL\n' +
  //       'WHsIztJ1fHTnXsPhnA7YG0SQpHTyJhuX3rgBjxGrvbZBArmZ+R/Pq9IkOkJe\n' +
  //       'z8HATAMOsbaZjGN5JwEH/jYjLN6AFRWeaB5CSBSAF+CvHsUgadGmxTdSHBM6\n' +
  //       'LM9rfGg/MCnpRBuHckA0NNZh+wepq6TDA54ZopsdP14gHj4MKCdfqZr86Jft\n' +
  //       'ldtjeSgPTFEEJxPMJ4/Z3UeFU9rvOgfxX6l0eHWS0MYwJ3sVYvSyqqHir1K5\n' +
  //       'TRdEIgtQ3NvLTKkX4bKTSU+SInrvDA+wsc2BcBsbgNhRiGb+XYrbqXBshL1a\n' +
  //       'lIdpnomkAQgOZMO2n347uURYoruH3OtFeNABJ9D/nEU+LdhDOPGZPefvPBc5\n' +
  //       'BxK4ExKZ2Wo/TZw8lgC53uqOljsGV63Hp71LkyesKWu5/+vdVrYx/vU63shh\n' +
  //       'x/TSQAEiaFYEfkWSOthtH0nrJHhkY7FWgjp/1bj/J4J9HCQrVtt2WlQfhowZ\n' +
  //       'ILxhKk/vep0sJviM3SfJ4hPtoYpZESc=\n' +
  //       '=43Ta\n' +
  //       '-----END PGP MESSAGE-----\n',
  //   },
  //   {
  //     link: 'bafyreibfikschwlfi275hr7lrfqgj73mf6absailazh4sm5fwihspy2ky4',
  //     toDID: 'eip155:0xb340E384FC4549591bc7994b0f90074753dEC72a',
  //     encType: 'pgp',
  //     fromDID: 'eip155:0x0F1AAC847B5720DDf01BFa07B7a8Ee641690816d',
  //     sigType: 'pgp',
  //     toCAIP10: 'eip155:0xb340E384FC4549591bc7994b0f90074753dEC72a',
  //     signature:
  //       '-----BEGIN PGP SIGNATURE-----\n' +
  //       '\n' +
  //       'wsBzBAEBCAAnBQJjh5tjCRBaJmgmByp5FRYhBJC23yBJT2d/pTAID1omaCYH\n' +
  //       'KnkVAAAZmwf/buPLw6caSZmYnw6D3/p6HF1kWlkGUOTP4RasaU/6dkeDaZs9\n' +
  //       'SJlz2wC8oOpBGWHMJ/5n3ZWmU71E6U7IKIY793MyIv5t32vTNkwsRHUX7IIn\n' +
  //       'QFF+FzTIEtHHVTRlnkqNR2YUk1kqcpZCZWHfahi5W2d/WkXlFNdvyyFH4W8L\n' +
  //       'd03FGhOyXbWwU3xicBz5mSBpIFaaSCXl1SdgJDPXLSk3b65EEOjCOaiz85xC\n' +
  //       'G+6SW4RUzCGSDcOd9F2EXvvY5H9LgQNi1jjlZn6JrPTPJTJ+wXZXzcZmtOXG\n' +
  //       'EKcwvPbbPY9wd+gavRSOgYLYn5xoZQW/o3hW7AQlbC5Kj6js48Z0HQ==\n' +
  //       '=qLiJ\n' +
  //       '-----END PGP SIGNATURE-----\n',
  //     timestamp: 1769831523684,
  //     fromCAIP10: 'eip155:0x0F1AAC847B5720DDf01BFa07B7a8Ee641690816d',
  //     messageType: 'Text',
  //     messageContent: 'Hi',
  //     encryptedSecret:
  //       '-----BEGIN PGP MESSAGE-----\n' +
  //       '\n' +
  //       'wcBMA1fn1CNqxQ7nAQgArlo75qe54WerfRKFv1+F9j4NRMvSTgUztvIe51eg\n' +
  //       'd5MVuj6RYxKERr2bTuBt5cMDJMlNuTnBBkPe4L8+SlsI46L9wmXV9xLoZq1a\n' +
  //       '94JdxD98RGMF99Jde/3hC/X6GS1yVqPpKPKdWx/tkOPeyqeO/wFF7kqShgIi\n' +
  //       'Wgq6hGz1fzD3GZhKGY0VSLuC3s0aUy/qw5En1Xd0uX0jdXBl07IIj8p1G2zx\n' +
  //       '9BuVlksSK34yvIc0RQfCeRadMHkxbA0Hyj31Wrr+Y310YLTppL0s5bQR9APL\n' +
  //       'WHsIztJ1fHTnXsPhnA7YG0SQpHTyJhuX3rgBjxGrvbZBArmZ+R/Pq9IkOkJe\n' +
  //       'z8HATAMOsbaZjGN5JwEH/jYjLN6AFRWeaB5CSBSAF+CvHsUgadGmxTdSHBM6\n' +
  //       'LM9rfGg/MCnpRBuHckA0NNZh+wepq6TDA54ZopsdP14gHj4MKCdfqZr86Jft\n' +
  //       'ldtjeSgPTFEEJxPMJ4/Z3UeFU9rvOgfxX6l0eHWS0MYwJ3sVYvSyqqHir1K5\n' +
  //       'TRdEIgtQ3NvLTKkX4bKTSU+SInrvDA+wsc2BcBsbgNhRiGb+XYrbqXBshL1a\n' +
  //       'lIdpnomkAQgOZMO2n347uURYoruH3OtFeNABJ9D/nEU+LdhDOPGZPefvPBc5\n' +
  //       'BxK4ExKZ2Wo/TZw8lgC53uqOljsGV63Hp71LkyesKWu5/+vdVrYx/vU63shh\n' +
  //       'x/TSQAEiaFYEfkWSOthtH0nrJHhkY7FWgjp/1bj/J4J9HCQrVtt2WlQfhowZ\n' +
  //       'ILxhKk/vep0sJviM3SfJ4hPtoYpZESc=\n' +
  //       '=43Ta\n' +
  //       '-----END PGP MESSAGE-----\n',
  //   },
  // ]);

  const [messageHistory, setMessageHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeChat = async () => {
      const pastMessages = await pushSign.chat.history(
        `chatId:${currentContact.chatId}`
      );

      setMessageHistory(pastMessages);
      setLoading(false);
    };

    if (currentContact && pushSign) {
      initializeChat();
    }
  }, [currentContact, pushSign]);

  return (
    <div className="mb-6 flex-1 relative font-uni">
      {loading ? (
        <p className="text-primary-white/60 z-10 absolute left-1/2 animate-spin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M8.175 7.377l-3.042-5.27 1.732-1 3.045 5.273c-.635.238-1.222.573-1.735.997zm-.799.8l-5.27-3.042-1 1.732 5.274 3.045c.237-.635.572-1.223.996-1.735zm-1.376 3.823c0-.341.035-.673.09-.999h-6.09v1.999h6.09c-.055-.326-.09-.659-.09-1zm11.351-2.705l5.208-3.007-.333-.577-5.206 3.007c.121.185.23.379.331.577zm-5.351-3.295c.341 0 .673.035.999.09v-6.09h-1.999v6.09c.326-.055.659-.09 1-.09zm3.14.894l3.004-5.204-.288-.166-3 5.197.284.173zm1.685 8.662l5.234 3.022.666-1.154-5.229-3.019c-.181.41-.408.794-.671 1.151zm-10.444-1.467l-5.274 3.046 1 1.732 5.27-3.042c-.424-.513-.759-1.1-.996-1.736zm11.594-2.589l.025.5-.025.5h6.025v-1h-6.025zm-3.727 6.061l3.03 5.249 1.442-.833-3.031-5.25c-.437.34-.92.623-1.441.834zm-2.248.439c-.341 0-.674-.035-1-.09v6.09h1.999v-6.09c-.326.055-.658.09-.999.09zm-3.824-1.376l-3.042 5.27 1.732 1 3.045-5.274c-.635-.237-1.222-.572-1.735-.996z" />
          </svg>
        </p>
      ) : messageHistory.length === 0 ? (
        <div className="flex text-primary-white/60 py-2 px-6 bg-gray-100 rounded-lg mt-2 items-start">
          <p className="text-sm text-center flex mx-auto">
            Messages are end-to-end encrypted. Only users in this chat can view
            or listen to them.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-1 z-10">
          {messageHistory.map((message, index) => (
            <MessageWithDate
              key={index}
              message={message}
              previousMessage={
                messageHistory[messageHistory.indexOf(message) - 1]
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Chat;
