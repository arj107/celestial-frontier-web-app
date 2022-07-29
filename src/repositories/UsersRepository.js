import BaseRepository from "../repositories/BaseRepository";

class UsersRepository extends BaseRepository {
  login(username, password) {
    return this.post(
      "Users/Authenticate",
      {
        username,
        password,
      },
      undefined,
      false
    );
  }

  signUp(username, password) {
    return this.post(
      "/users/sign-up",
      {
        username,
        password,
      },
      undefined,
      false
    );
  }

  getActiveRounds(userId) {
    return this.get(`/users/${userId}/active-rounds`, undefined, true);
  }

  getActiveRound(roundId, userId) {
    return this.get(
      `/users/${userId}/active-rounds/${roundId}`,
      undefined,
      true
    );
  }

  endActiveRound(roundId, userId) {
    return this.post(
      `/users/${userId}/rounds/${roundId}/end`,
      undefined,
      undefined,
      true
    );
  }

  addRoundStroke(roundHoleId, userId) {
    return this.post(
      `/users/${userId}/round-holes/${roundHoleId}/round-strokes`,
      undefined,
      undefined,
      true
    );
  }

  updateRoundStroke(roundStrokeId, roundHoleId, userId, payload) {
    return this.post(
      `/users/${userId}/round-holes/${roundHoleId}/round-strokes/${roundStrokeId}`,
      payload,
      undefined,
      true
    );
  }

  getGolfBag(userId) {
    return this.get(`/users/${userId}/golf-bag`, undefined, true);
  }

  updateGolfBag(userId, payload) {
    return this.post(`/users/${userId}/golf-bag`, payload, undefined, true);
  }

  getTrackedMetrics(userId) {
    return this.get(`/users/${userId}/tracked-metrics`, undefined, true);
  }

  updateTrackedMetrics(userId, payload) {
    return this.post(
      `/users/${userId}/tracked-metrics`,
      payload,
      undefined,
      true
    );
  }

  deleteRoundStroke(roundStrokeId, roundHoleId, userId) {
    return this.delete(
      `/users/${userId}/round-holes/${roundHoleId}/round-strokes/${roundStrokeId}`,
      undefined,
      true
    );
  }
}

export default UsersRepository;
