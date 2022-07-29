import BaseRepository from "./BaseRepository";
// import store from "../store";

class ThrusterRepository extends BaseRepository {
  getThrustersBySpaceshipType(spaceshipTypeGuid) {
    return this.get(
      `Thrusters?spaceshipTypeGuid=${spaceshipTypeGuid}`,
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

export default ThrusterRepository;
