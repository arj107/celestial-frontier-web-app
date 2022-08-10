export class CarrierConfigurationDto {
    CarrierConfigurationGuid;
    Name;
    ArmorGuid;
    CarrierGuid;
    FuelSystemGuid;
    PayloadGuid;
    PointDefenseSystemGuid;
    ThrusterGuid;
    UserGuid;
    WeaponFrameGuid;
  
    constructor(carrierConfiguration) {
      if (carrierConfiguration) {
        this.CarrierConfigurationGuid =
          carrierConfiguration.CarrierConfigurationGuid;
        this.Name = carrierConfiguration.Name;
        this.ArmorGuid = carrierConfiguration.Armor.ArmorGuid;
        this.CarrierGuid =
          carrierConfiguration.Carrier.CarrierGuid;
        this.FuelSystemGuid =
          carrierConfiguration.FuelSystem.FuelSystemGuid;
        this.PayloadGuid = carrierConfiguration.Payload.PayloadGuid;
        this.PointDefenseSystemGuid =
          carrierConfiguration.PointDefenseSystem.PointDefenseSystemGuid;
        this.ThrusterGuid = carrierConfiguration.Thruster.ThrusterGuid;
        this.UserGuid = carrierConfiguration.User.UserGuid;
        this.WeaponFrameGuid =
          carrierConfiguration.WeaponFrame.WeaponFrameGuid;
      }
    }
  }
  