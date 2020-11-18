import { CupType, regCup } from '../slice/cups';
import { SaucerStoreType } from './type';

export class SaucerStoreHelper {
  constructor(private store: SaucerStoreType) {}

  regCup(cup: CupType) {
    this.store.dispatch(regCup(cup));
  }
}
