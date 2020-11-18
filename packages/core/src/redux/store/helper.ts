import { setCupAvailable } from '../slice/cups';
import { SaucerStoreType } from './type';

export class SaucerStoreHelper {
  constructor(private store: SaucerStoreType) {}

  setCupAvailable(cupName: string) {
    this.store.dispatch(setCupAvailable(cupName));
  }
}
