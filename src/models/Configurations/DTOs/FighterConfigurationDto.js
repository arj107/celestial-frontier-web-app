export class FighterConfigurationDto {
    FighterConfigurationGuid;
    Name;
    ArmorGuid;
    FighterGuid;
    FuelSystemGuid;
    PayloadGuid;
    PointDefenseSystemGuid;
    ThrusterGuid;
    UserGuid;
    WeaponFrameGuid;
  
    constructor(fighterConfiguration) {
      if (fighterConfiguration) {
        this.FighterConfigurationGuid =
          fighterConfiguration.FighterConfigurationGuid;
        this.Name = fighterConfiguration.Name;
        this.ArmorGuid = fighterConfiguration.Armor.ArmorGuid;
        this.FighterGuid =
          fighterConfiguration.Fighter.FighterGuid;
        this.FuelSystemGuid =
          fighterConfiguration.FuelSystem.FuelSystemGuid;
        this.PayloadGuid = fighterConfiguration.Payload.PayloadGuid;
        this.PointDefenseSystemGuid =
          fighterConfiguration.PointDefenseSystem.PointDefenseSystemGuid;
        this.ThrusterGuid = fighterConfiguration.Thruster.ThrusterGuid;
        this.UserGuid = fighterConfiguration.User.UserGuid;
        this.WeaponFrameGuid =
          fighterConfiguration.WeaponFrame.WeaponFrameGuid;
      }
    }
  }
  