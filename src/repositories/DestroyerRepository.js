import BaseRepository from "./BaseRepository";
// import store from "../store";

class DestroyerRepository extends BaseRepository {
  getDestroyers() {
    return this.get(`Destroyers`, undefined, true);
  }
  // getUserDestroyerConfiguration(destroyerConfigurationGuid) {
  //     return this.get(`User/DestroyerConfigurations/${destroyerConfigurationGuid}`, undefined, true);
  // }
  // updateUserDestroyerConfiguration(destroyerConfigurationGuid, destroyerConfiguration) {
  //     return this.put(`User/DestroyerConfigurations/${destroyerConfigurationGuid}`, destroyerConfiguration, undefined, true);
  // }
  // createUserFleet(payload) {
  //     return this.post(`User/Fleets`, payload, undefined, true);
  // }
}

export default DestroyerRepository;
