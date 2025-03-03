/* eslint-disable max-classes-per-file */
/// <reference types="@unique-nft/unique-mainnet-types/augment-api-rpc" />
import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { Sdk } from '@unique-nft/sdk';
import { SdkOptions } from '@unique-nft/sdk/types';
import { unique } from '@unique-nft/unique-mainnet-types/definitions';
import { TypeProvider } from './type/provider';

class ProviderAPI {
  protected provider: WsProvider;

  protected sdkPromise: Promise<Sdk>;

  constructor(private url) {
    this.provider = new WsProvider(url);

    this.sdkPromise = Sdk.create({
      chainWsUrl: url,
    } as SdkOptions);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getApi(types?: any): Promise<ApiPromise> {
    return ApiPromise.create({
      provider: this.provider,
    });
  }

  async getSdk(): Promise<Sdk> {
    const sdk = await this.sdkPromise;

    await sdk.api.isReady;

    return sdk;
  }
}

class WestendOpalApi extends ProviderAPI { }

class OpalApi extends ProviderAPI {
  async getApi(): Promise<ApiPromise> {
    return ApiPromise.create({
      provider: this.provider,
      rpc: {
        unique: unique.rpc,
      },
    });
  }
}

class Testnet2Api extends ProviderAPI {
  getApi(types) {
    return ApiPromise.create({
      provider: this.provider,
      types,
    });
  }
}

export class ProviderFactory {
  provider: ProviderAPI;

  constructor(
    private url,
    private type = null,
  ) {
    this.provider = this.getProvider(type);
  }

  getProvider(type) {
    switch (type) {
      case TypeProvider.WESTEND:
        return new WestendOpalApi(this.url);
      case TypeProvider.OPAL:
      case TypeProvider.QUARTZ:
        return new OpalApi(this.url);
      default:
        return new Testnet2Api(this.url);
    }
  }

  async getApi(rtt) {
    const api = await this.provider.getApi(rtt);
    return api;
  }

  getSdk(): Promise<Sdk> {
    return this.provider.getSdk();
  }
}
