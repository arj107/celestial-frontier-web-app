export class BattlecruiserModel {
  BattlecruiserGuid;
  Class;
  Description;
  ModulePointLimit;
  HullMass;
  BaseCrewCost;
  SpecificHeatCapacity;
  HeatCapacity;
  BaseHullHealth;
  SpaceshipTypeGuid;
  SpaceshipTypeText;
  SpaceshipCategoryGuid;
  SpaceshipCategoryText;
  PointDefenseSystemPowerLevelGuid;
  PointDefenseSystemPowerLevelText;
  WeaponPowerLevelGuid;
  WeaponPowerLevelText;
  disabled = false;

  constructor(battlecruiser) {
    if (battlecruiser) {
      this._battlecruiser = battlecruiser;
      this.BattlecruiserGuid = battlecruiser.BattlecruiserGuid;
      this.Class = battlecruiser.Class;
      this.Description = battlecruiser.Description;
      this.ModulePointLimit = battlecruiser.ModulePointLimit;
      this.HullMass = battlecruiser.HullMass;
      this.BaseCrewCost = battlecruiser.BaseCrewCost;
      this.SpecificHeatCapacity = battlecruiser.SpecificHeatCapacity;
      this.HeatCapacity = this.SpecificHeatCapacity * this.HullMass;
      this.BaseHullHealth = battlecruiser.BaseHullHealth;
      this.SpaceshipTypeGuid = battlecruiser.SpaceshipType.SpaceshipTypeGuid;
      this.SpaceshipTypeText = battlecruiser.SpaceshipType.Text;
      this.SpaceshipCategoryGuid =
        battlecruiser.SpaceshipCategory.SpaceshipCategoryGuid;
      this.SpaceshipCategoryText = battlecruiser.SpaceshipCategory.Text;
      this.PointDefenseSystemPowerLevelGuid =
        battlecruiser.PointDefenseSystemPowerLevel.PointDefenseSystemPowerLevelGuid;
      this.PointDefenseSystemPowerLevelText =
        battlecruiser.PointDefenseSystemPowerLevel.Text;
      this.WeaponPowerLevelGuid =
        battlecruiser.WeaponPowerLevel.WeaponPowerLevelGuid;
      this.WeaponPowerLevelText = battlecruiser.WeaponPowerLevel.Text;
    }
  }
}
