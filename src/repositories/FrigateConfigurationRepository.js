import BaseRepository from "./BaseRepository";
// import store from "../store";

class FrigateConfigurationRepository extends BaseRepository {
  getUserFrigateConfigurations() {
    return this.get(`User/FrigateConfigurations`, undefined, true);
  }
  getUserFrigateConfiguration(frigateConfigurationGuid) {
    return this.get(
      `User/FrigateConfigurations/${frigateConfigurationGuid}`,
      undefined,
      true
    );
  }
  updateUserFrigateConfiguration(
    frigateConfigurationGuid,
    frigateConfiguration
  ) {
    return this.put(
      `User/FrigateConfigurations/${frigateConfigurationGuid}`,
      frigateConfiguration,
      undefined,
      true
    );
  }
  // createUserFleet(payload) {
  //     return this.post(`User/Fleets`, payload, undefined, true);
  // }
}

export default FrigateConfigurationRepository;
