const store = {
  /**
   * CountryList
   * Array of object:
   *   - name: String = Country name
   *   - countryCode: String = ISO country code
   *   - phoneCode: String = Country calling code
   *
   * Can be set to promise that return array of object
   * Promise will be called on first getCountryList call
   * Promise result will then be filled to countryList
   */
  countryList: [],
};

export default {
  setCountryList(arrayOrPromise) {
    if (Array.isArray(arrayOrPromise)) {
      store.countryList = arrayOrPromise;
      return;
    }

    store.countryList = Promise.resolve(arrayOrPromise).then((result) => {
      store.countryList = result;
    });
  },
  async getCountryList() {
    if (Array.isArray(store.countryList)) {
      return store.countryList;
    }

    await Promise.resolve(store.countryList);

    return store.countryList;
  },
};
