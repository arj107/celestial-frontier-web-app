import BaseRepository from "./BaseRepository";
// import store from "../store";

class FuelSystemRepository extends BaseRepository {
  getFuelSystemsBySpaceshipType(spaceshipTypeGuid) {
    return this.get(
      `FuelSystems?spaceshipTypeGuid=${spaceshipTypeGuid}`,
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

export default FuelSystemRepository;
