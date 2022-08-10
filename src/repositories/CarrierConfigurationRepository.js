import BaseRepository from "./BaseRepository";
// import store from "../store";

class CarrierConfigurationRepository extends BaseRepository {
  getUserCarrierConfigurations() {
    return this.get(`User/CarrierConfigurations`, undefined, true);
  }
  getUserCarrierConfiguration(carrierConfigurationGuid) {
    return this.get(
      `User/CarrierConfigurations/${carrierConfigurationGuid}`,
      undefined,
      true
    );
  }
  updateUserCarrierConfiguration(
    carrierConfigurationGuid,
    carrierConfiguration
  ) {
    return this.put(
      `User/CarrierConfigurations/${carrierConfigurationGuid}`,
      carrierConfiguration,
      undefined,
      true
    );
  }
  // createUserFleet(payload) {
  //     return this.post(`User/Fleets`, payload, undefined, true);
  // }
}

export default CarrierConfigurationRepository;
