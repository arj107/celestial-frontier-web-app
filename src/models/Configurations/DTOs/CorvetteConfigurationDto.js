export class CorvetteConfigurationDto {
    CorvetteConfigurationGuid;
    Name;
    ArmorGuid;
    CorvetteGuid;
    FuelSystemGuid;
    PayloadGuid;
    PointDefenseSystemGuid;
    ThrusterGuid;
    UserGuid;
    WeaponFrameGuid;
  
    constructor(corvetteConfiguration) {
      if (corvetteConfiguration) {
        this.CorvetteConfigurationGuid =
          corvetteConfiguration.CorvetteConfigurationGuid;
        this.Name = corvetteConfiguration.Name;
        this.ArmorGuid = corvetteConfiguration.Armor.ArmorGuid;
        this.CorvetteGuid =
          corvetteConfiguration.Corvette.CorvetteGuid;
        this.FuelSystemGuid =
          corvetteConfiguration.FuelSystem.FuelSystemGuid;
        this.PayloadGuid = corvetteConfiguration.Payload.PayloadGuid;
        this.PointDefenseSystemGuid =
          corvetteConfiguration.PointDefenseSystem.PointDefenseSystemGuid;
        this.ThrusterGuid = corvetteConfiguration.Thruster.ThrusterGuid;
        this.UserGuid = corvetteConfiguration.User.UserGuid;
        this.WeaponFrameGuid =
          corvetteConfiguration.WeaponFrame.WeaponFrameGuid;
      }
    }
  }
  