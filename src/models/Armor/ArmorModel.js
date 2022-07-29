export class ArmorModel {
  ArmorGuid;
  ModulePointsCost;
  Mass;
  SpecificHeatCapacity;
  HeatCapacity;
  KineticResistance;
  EnergyResistance;
  Title;
  Description;
  SpaceshipTypeGuid;
  SpaceshipTypeText;
  disabled = false;

  constructor(armor) {
    if (armor) {
      this._armor = armor;
      this.ArmorGuid = armor.ArmorGuid;
      this.ModulePointsCost = armor.ModulePointsCost;
      this.Mass = armor.Mass;
      this.SpecificHeatCapacity = armor.SpecificHeatCapacity;
      this.HeatCapacity = this.SpecificHeatCapacity * this.Mass;
      this.KineticResistance = armor.KineticResistance;
      this.EnergyResistance = armor.EnergyResistance;
      this.Title = armor.Title;
      this.Description = armor.Description;
      this.SpaceshipTypeGuid = armor.SpaceshipType.SpaceshipTypeGuid;
      this.SpaceshipTypeText = armor.SpaceshipType.Text;
    }
  }
}
