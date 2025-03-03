import { Sequelize, Transaction } from 'sequelize/types';
import { ICollectionDbEntity } from 'lib/collection/collectionDbEntity.interface';
import { getFormattedCollectionById } from '../../collection/collectionData';
import { OpalAPI } from '../../providerAPI/bridgeProviderAPI/concreate/opalAPI';
import eventsDB from '../../events/eventsDB';
import { EventTypes } from '../type';

export default abstract class EventCollection {
  constructor(
    protected bridgeAPI: OpalAPI,
    protected sequelize: Sequelize,
    public collectionId: number,
    public timestamp: number,
  ) {
    if (!this.collectionId) {
      throw new Error(`Can't create/modify collection without collectionId(${this.collectionId})`);
    }
  }

  public async getCollection(): Promise<ICollectionDbEntity | null> {
    if (!this.collectionId) {
      return null;
    }

    const collection = await getFormattedCollectionById(this.collectionId, this.bridgeAPI);
    return {
      ...collection,
      date_of_creation: this.timestamp,
    };
  }

  public isDestroyed(): Promise<boolean> {
    return eventsDB.getCollectionEvent(
      this.sequelize,
      this.collectionId,
      EventTypes.TYPE_COLLECTION_DESTROYED,
    );
  }

  public abstract save(transaction: Transaction): Promise<void>;
}
