import BaseRepository from "./BaseRepository";
// import store from "../store";

class CarrierRepository extends BaseRepository {
  getCarriers() {
    return this.get(`Carriers`, undefined, true);
  }
  // getUserCarrierConfiguration(carrierConfigurationGuid) {
  //     return this.get(`User/CarrierConfigurations/${carrierConfigurationGuid}`, undefined, true);
  // }
  // updateUserCarrierConfiguration(carrierConfigurationGuid, carrierConfiguration) {
  //     return this.put(`User/CarrierConfigurations/${carrierConfigurationGuid}`, carrierConfiguration, undefined, true);
  // }
  // createUserFleet(payload) {
  //     return this.post(`User/Fleets`, payload, undefined, true);
  // }
}

export default CarrierRepository;
