import { setAvailableCup } from '../slice/cups';
import type { SaucerStoreType } from './type';

export class SaucerStoreHelper {
  constructor(private store: SaucerStoreType) {}

  setAvailableCup(availableCupNames: string[]) {
    this.store.dispatch(setAvailableCup(availableCupNames));
  }
}
