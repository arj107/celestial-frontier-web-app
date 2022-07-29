export class BattlecruiserConfigurationDto {
  BattlecruiserConfigurationGuid;
  Name;
  ArmorGuid;
  BattlecruiserGuid;
  FuelSystemGuid;
  Payload1Guid;
  Payload2Guid;
  PointDefenseSystemGuid;
  ThrusterGuid;
  UserGuid;
  WeaponFrame1Guid;
  WeaponFrame2Guid;

  constructor(battlecruiserConfiguration) {
    if (battlecruiserConfiguration) {
      this.BattlecruiserConfigurationGuid =
        battlecruiserConfiguration.BattlecruiserConfigurationGuid;
      this.Name = battlecruiserConfiguration.Name;
      this.ArmorGuid = battlecruiserConfiguration.Armor.ArmorGuid;
      this.BattlecruiserGuid =
        battlecruiserConfiguration.Battlecruiser.BattlecruiserGuid;
      this.FuelSystemGuid =
        battlecruiserConfiguration.FuelSystem.FuelSystemGuid;
      this.Payload1Guid = battlecruiserConfiguration.Payload1.PayloadGuid;
      this.Payload2Guid = battlecruiserConfiguration.Payload2.PayloadGuid;
      this.PointDefenseSystemGuid =
        battlecruiserConfiguration.PointDefenseSystem.PointDefenseSystemGuid;
      this.ThrusterGuid = battlecruiserConfiguration.Thruster.ThrusterGuid;
      this.UserGuid = battlecruiserConfiguration.User.UserGuid;
      this.WeaponFrame1Guid =
        battlecruiserConfiguration.WeaponFrame1.WeaponFrameGuid;
      this.WeaponFrame2Guid =
        battlecruiserConfiguration.WeaponFrame2.WeaponFrameGuid;
    }
  }
}
