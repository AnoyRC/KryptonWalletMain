import { WindowProvider } from "@wagmi/connectors";
import { WalletClient } from "viem";
import localStorageWallet from "./localStorageWallet";
import { createAuth0Client } from "@auth0/auth0-spa-js";

export class oAuthWallet extends localStorageWallet {
  private domain: string;
  private clientId: string;

  constructor(domain: string, clientId: string) {
    super();
    this.domain = domain;
    this.clientId = clientId;
  }

  async create(provider: WindowProvider): Promise<WalletClient> {
    let auth0Client = null;

    auth0Client = await createAuth0Client({
      domain: this.domain,
      clientId: this.clientId,
    });

    const login = async () => {
      await auth0Client.loginWithPopup({
        authorizationParams: {
          redirect_uri: window.location.origin,
        },
      });
    };

    await login();

    const isAuthenticated = await auth0Client.isAuthenticated();

    if (isAuthenticated) {
      const user = await auth0Client.getUser();

      if (!user.sub) throw new Error("User Not Found!");
      return await localStorageWallet.createWallet(
        JSON.stringify(user.sub),
        provider
      );
    }

    throw new Error("User cancelled");
  }

  async logout() {
    let auth0Client = null;

    auth0Client = await createAuth0Client({
      domain: this.domain,
      clientId: this.clientId,
    });

    auth0Client.logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }
}
