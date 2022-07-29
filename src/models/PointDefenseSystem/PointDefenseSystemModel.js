export class PointDefenseSystemModel {
  PointDefenseSystemGuid;
  ModulePointsCost;
  Mass;
  SpecificHeatCapacity;
  HeatCapacity;
  CountermeasureCapacity;
  CountermeasureRegenerationRate;
  Efficiency;
  Title;
  Description;
  PowerLevelGuid;
  PowerLevelText;
  disabled = false;

  constructor(pointDefenseSystem) {
    if (pointDefenseSystem) {
      this._pointDefenseSystem = pointDefenseSystem;
      this.PointDefenseSystemGuid = pointDefenseSystem.PointDefenseSystemGuid;
      this.ModulePointsCost = pointDefenseSystem.ModulePointsCost;
      this.Mass = pointDefenseSystem.Mass;
      this.SpecificHeatCapacity = pointDefenseSystem.SpecificHeatCapacity;
      this.HeatCapacity = this.SpecificHeatCapacity * this.Mass;
      this.CountermeasureCapacity = pointDefenseSystem.CountermeasureCapacity;
      this.CountermeasureRegenerationRate =
        pointDefenseSystem.CountermeasureRegenerationRate;
      this.Efficiency = pointDefenseSystem.Efficiency;
      this.Title = pointDefenseSystem.Title;
      this.Description = pointDefenseSystem.Description;
      this.PowerLevelGuid = pointDefenseSystem.PowerLevel.PowerLevelGuid;
      this.PowerLevelText = pointDefenseSystem.PowerLevel.Text;
    }
  }
}
