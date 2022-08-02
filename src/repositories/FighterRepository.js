import BaseRepository from "./BaseRepository";
// import store from "../store";

class FighterRepository extends BaseRepository {
  getFighters() {
    return this.get(`Fighters`, undefined, true);
  }
  // getUserFighterConfiguration(fighterConfigurationGuid) {
  //     return this.get(`User/FighterConfigurations/${fighterConfigurationGuid}`, undefined, true);
  // }
  // updateUserFighterConfiguration(fighterConfigurationGuid, fighterConfiguration) {
  //     return this.put(`User/FighterConfigurations/${fighterConfigurationGuid}`, fighterConfiguration, undefined, true);
  // }
  // createUserFleet(payload) {
  //     return this.post(`User/Fleets`, payload, undefined, true);
  // }
}

export default FighterRepository;
