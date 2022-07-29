export class ThrusterModel {
  ThrusterGuid;
  ModulePointsCost;
  Mass;
  SpecificHeatCapacity;
  HeatCapacity;
  Thrust;
  Efficiency;
  Title;
  Description;
  SpaceshipTypeGuid;
  SpaceshipTypeText;
  disabled = false;

  constructor(thruster) {
    if (thruster) {
      this._thruster = thruster;
      this.ThrusterGuid = thruster.ThrusterGuid;
      this.ModulePointsCost = thruster.ModulePointsCost;
      this.Mass = thruster.Mass;
      this.SpecificHeatCapacity = thruster.SpecificHeatCapacity;
      this.HeatCapacity = this.SpecificHeatCapacity * this.Mass;
      this.Thrust = thruster.Thrust;
      this.Efficiency = thruster.Efficiency;
      this.Title = thruster.Title;
      this.Description = thruster.Description;
      this.SpaceshipTypeGuid = thruster.SpaceshipType.SpaceshipTypeGuid;
      this.SpaceshipTypeText = thruster.SpaceshipType.Text;
    }
  }
}
