import BaseRepository from "./BaseRepository";
// import store from "../store";

class BattlecruiserRepository extends BaseRepository {
  getBattlecruisers() {
    return this.get(`Battlecruisers`, undefined, true);
  }
  // getUserBattlecruiserConfiguration(battlecruiserConfigurationGuid) {
  //     return this.get(`User/BattlecruiserConfigurations/${battlecruiserConfigurationGuid}`, undefined, true);
  // }
  // updateUserBattlecruiserConfiguration(battlecruiserConfigurationGuid, battlecruiserConfiguration) {
  //     return this.put(`User/BattlecruiserConfigurations/${battlecruiserConfigurationGuid}`, battlecruiserConfiguration, undefined, true);
  // }
  // createUserFleet(payload) {
  //     return this.post(`User/Fleets`, payload, undefined, true);
  // }
}

export default BattlecruiserRepository;
