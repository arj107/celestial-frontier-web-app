import BaseRepository from "./BaseRepository";
// import store from "../store";

class CorvetteConfigurationRepository extends BaseRepository {
  getUserCorvetteConfigurations() {
    return this.get(`User/CorvetteConfigurations`, undefined, true);
  }
  getUserCorvetteConfiguration(corvetteConfigurationGuid) {
    return this.get(
      `User/CorvetteConfigurations/${corvetteConfigurationGuid}`,
      undefined,
      true
    );
  }
  updateUserCorvetteConfiguration(
    corvetteConfigurationGuid,
    corvetteConfiguration
  ) {
    return this.put(
      `User/CorvetteConfigurations/${corvetteConfigurationGuid}`,
      corvetteConfiguration,
      undefined,
      true
    );
  }
  // createUserFleet(payload) {
  //     return this.post(`User/Fleets`, payload, undefined, true);
  // }
}

export default CorvetteConfigurationRepository;
