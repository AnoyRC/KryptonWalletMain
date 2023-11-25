import { WindowProvider } from "@wagmi/connectors";
import { Chain } from "wagmi";
import { oAuthWallet } from "../lib/oAuthWallet";
import { localStorageConnector } from "./localStorageConnector";
import localStorageWallet from "../lib/localStorageWallet";

const IS_SERVER = typeof window === "undefined";

export type oAuthConnectorOptions = {
  domain: string;
  clientId: string;
};

export class oAuthConnector extends localStorageConnector {
  ready = !IS_SERVER;
  readonly id = "oauth";
  readonly name = "OAuth";

  private domain: string = "";
  private clientId: string = "";
  private walletState: oAuthWallet | undefined;

  constructor(config: { chains: Chain[]; options: oAuthConnectorOptions }) {
    super(config);

    if (!config.options.domain) throw new Error("domain is required");
    this.domain = config.options.domain;

    if (config.options.clientId) this.clientId = config.options.clientId;
  }

  protected async createWallet() {
    const provider = (await this.getProvider()) as WindowProvider;
    let wallet = await oAuthWallet.getWallet(provider);
    if (!wallet) {
      const w = new oAuthWallet(this.domain, this.clientId);
      this.walletState = w;
      wallet = await w.create(provider);
    }
    this.wallet = wallet?.account;
  }

  async disconnect(): Promise<void> {
    if (this.walletState) await this.walletState.logout();
    this.wallet = undefined;
    localStorageWallet.deleteWallet();
  }
}
