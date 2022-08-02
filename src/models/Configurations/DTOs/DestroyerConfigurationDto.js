export class DestroyerConfigurationDto {
    DestroyerConfigurationGuid;
    Name;
    ArmorGuid;
    DestroyerGuid;
    FuelSystemGuid;
    Payload1Guid;
    Payload2Guid;
    PointDefenseSystemGuid;
    ThrusterGuid;
    UserGuid;
    WeaponFrame1Guid;
    WeaponFrame2Guid;
  
    constructor(destroyerConfiguration) {
      if (destroyerConfiguration) {
        this.DestroyerConfigurationGuid =
          destroyerConfiguration.DestroyerConfigurationGuid;
        this.Name = destroyerConfiguration.Name;
        this.ArmorGuid = destroyerConfiguration.Armor.ArmorGuid;
        this.DestroyerGuid =
          destroyerConfiguration.Destroyer.DestroyerGuid;
        this.FuelSystemGuid =
          destroyerConfiguration.FuelSystem.FuelSystemGuid;
        this.Payload1Guid = destroyerConfiguration.Payload1.PayloadGuid;
        this.Payload2Guid = destroyerConfiguration.Payload2.PayloadGuid;
        this.PointDefenseSystemGuid =
          destroyerConfiguration.PointDefenseSystem.PointDefenseSystemGuid;
        this.ThrusterGuid = destroyerConfiguration.Thruster.ThrusterGuid;
        this.UserGuid = destroyerConfiguration.User.UserGuid;
        this.WeaponFrame1Guid =
          destroyerConfiguration.WeaponFrame1.WeaponFrameGuid;
        this.WeaponFrame2Guid =
          destroyerConfiguration.WeaponFrame2.WeaponFrameGuid;
      }
    }
  }
  