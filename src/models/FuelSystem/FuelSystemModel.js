export class FuelSystemModel {
  FuelSystemGuid;
  ModulePointsCost;
  Mass;
  SpecificHeatCapacity;
  HeatCapacity;
  FuelCapacity;
  FuelRegenerationRate;
  Title;
  Description;
  SpaceshipTypeGuid;
  SpaceshipTypeText;
  disabled = false;

  constructor(fuelSystem) {
    if (fuelSystem) {
      this._fuelSystem = fuelSystem;
      this.FuelSystemGuid = fuelSystem.FuelSystemGuid;
      this.ModulePointsCost = fuelSystem.ModulePointsCost;
      this.Mass = fuelSystem.Mass;
      this.SpecificHeatCapacity = fuelSystem.SpecificHeatCapacity;
      this.HeatCapacity = this.SpecificHeatCapacity * this.Mass;
      this.FuelCapacity = fuelSystem.FuelCapacity;
      this.FuelRegenerationRate = fuelSystem.FuelRegenerationRate;
      this.Title = fuelSystem.Title;
      this.Description = fuelSystem.Description;
      this.SpaceshipTypeGuid = fuelSystem.SpaceshipType.SpaceshipTypeGuid;
      this.SpaceshipTypeText = fuelSystem.SpaceshipType.Text;
    }
  }
}
