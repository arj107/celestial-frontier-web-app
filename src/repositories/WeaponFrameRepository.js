import BaseRepository from "./BaseRepository";
// import store from "../store";

class WeaponFrameRepository extends BaseRepository {
  // getPointDefenseSystemsByMaxPowerLevel(maxPowerLevelGuid) {
  //     return this.get(`PointDefenseSystems?maxPowerLevelGuid=${maxPowerLevelGuid}`, undefined, true);
  // }
  getWeaponFrames() {
    return this.get(`WeaponFrames`, undefined, true);
  }
  // getUserBattlecruiserConfiguration(battlecruiserConfigurationGuid) {
  //     return this.get(`User/BattlecruiserConfigurations/${battlecruiserConfigurationGuid}`, undefined, true);
  // }
  // createUserFleet(payload) {
  //     return this.post(`User/Fleets`, payload, undefined, true);
  // }
}

export default WeaponFrameRepository;
