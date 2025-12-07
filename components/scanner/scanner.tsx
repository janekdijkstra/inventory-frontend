"use client";

import {Beep} from "@/components/scanner/beep";
import {isEan} from "@/components/scanner/ean";
import {useScanner} from "@/components/scanner/useScanner";

export const Scanner = () => {
  const beepService = new Beep();
  const handleScanned = (result: string): boolean => {
    console.log("scanned:", result);

    if (isEan(result)) {
      console.log("EAN: ", result);
      // this.itemService.search(result).pipe(take(1)).subscribe(items => {
      //     if (items.length === 1) {
      //         this.handleScannedItem(items[0])
      //     } else if (items.length > 1) {
      //         console.error('multiple results for ean');
      //         this.beepError();
      //     } else {
      //         this.beepError();
      //         this.router.navigateByUrl(`/item/create?ean=${result}`);
      //     }
      // })
      return true;
    }

    if (result.startsWith("S:")) {
      console.log("Storage: ", result.slice(2));
      // this.storageUnitService.getByReadableId(result.slice(2)).pipe(take(1)).subscribe(unit => {
      //     if (unit) {
      //         this.beep();
      //         this.storageUnit = unit;
      //         if (this.mode !== 'StorageAdd' && this.mode !== 'StorageRemove') {
      //             this.mode = 'StorageAdd'
      //         }
      //         this.router.navigateByUrl(`/storage-unit/${unit.id}`);
      //     }
      // })
      return true;
    }

    if (result.startsWith("I:")) {
      console.log("Item: ", result.slice(2));
      // this.itemService.get(result.slice(2)).pipe(take(1)).subscribe(item => {
      //     if (item) {
      //         this.handleScannedItem(item);
      //     }
      // })
      return true;
    }

    beepService.beepError();
    return false;
  };

  useScanner(handleScanned);

  return <div></div>;
};
