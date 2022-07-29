import BaseRepository from "./BaseRepository";
// import store from "../store";

class FleetRepository extends BaseRepository {
  getUserFleets() {
    return this.get(`User/Fleets`, undefined, true);
  }
  getUserFleet(fleetGuid) {
    return this.get(`User/Fleets/${fleetGuid}`, undefined, true);
  }
  createUserFleet(payload) {
    return this.post(`User/Fleets`, payload, undefined, true);
  }
}

export default FleetRepository;
