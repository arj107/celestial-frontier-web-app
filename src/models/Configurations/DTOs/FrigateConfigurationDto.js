export class FrigateConfigurationDto {
    FrigateConfigurationGuid;
    Name;
    ArmorGuid;
    FrigateGuid;
    FuelSystemGuid;
    PayloadGuid;
    PointDefenseSystemGuid;
    ThrusterGuid;
    UserGuid;
    WeaponFrameGuid;
  
    constructor(frigateConfiguration) {
      if (frigateConfiguration) {
        this.FrigateConfigurationGuid =
          frigateConfiguration.FrigateConfigurationGuid;
        this.Name = frigateConfiguration.Name;
        this.ArmorGuid = frigateConfiguration.Armor.ArmorGuid;
        this.FrigateGuid =
          frigateConfiguration.Frigate.FrigateGuid;
        this.FuelSystemGuid =
          frigateConfiguration.FuelSystem.FuelSystemGuid;
        this.PayloadGuid = frigateConfiguration.Payload.PayloadGuid;
        this.PointDefenseSystemGuid =
          frigateConfiguration.PointDefenseSystem.PointDefenseSystemGuid;
        this.ThrusterGuid = frigateConfiguration.Thruster.ThrusterGuid;
        this.UserGuid = frigateConfiguration.User.UserGuid;
        this.WeaponFrameGuid =
          frigateConfiguration.WeaponFrame.WeaponFrameGuid;
      }
    }
  }
  