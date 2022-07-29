import BaseRepository from "./BaseRepository";
// import store from "../store";

class ArmorRepository extends BaseRepository {
  getArmorsBySpaceshipType(spaceshipTypeGuid) {
    return this.get(
      `Armors?spaceshipTypeGuid=${spaceshipTypeGuid}`,
      undefined,
      true
    );
  }
  // getUserBattlecruiserConfiguration(battlecruiserConfigurationGuid) {
  //     return this.get(`User/BattlecruiserConfigurations/${battlecruiserConfigurationGuid}`, undefined, true);
  // }
  // createUserFleet(payload) {
  //     return this.post(`User/Fleets`, payload, undefined, true);
  // }
}

export default ArmorRepository;
