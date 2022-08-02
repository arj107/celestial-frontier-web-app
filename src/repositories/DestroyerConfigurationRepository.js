import BaseRepository from "./BaseRepository";
// import store from "../store";

class DestroyerConfigurationRepository extends BaseRepository {
  getUserDestroyerConfigurations() {
    return this.get(`User/DestroyerConfigurations`, undefined, true);
  }
  getUserDestroyerConfiguration(destroyerConfigurationGuid) {
    return this.get(
      `User/DestroyerConfigurations/${destroyerConfigurationGuid}`,
      undefined,
      true
    );
  }
  updateUserDestroyerConfiguration(
    destroyerConfigurationGuid,
    destroyerConfiguration
  ) {
    return this.put(
      `User/DestroyerConfigurations/${destroyerConfigurationGuid}`,
      destroyerConfiguration,
      undefined,
      true
    );
  }
  // createUserFleet(payload) {
  //     return this.post(`User/Fleets`, payload, undefined, true);
  // }
}

export default DestroyerConfigurationRepository;
