export class FleetModel {
    FighterGuid;
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
  
    constructor(fighter) {
      if (fighter) {
        this._fighter = fighter;
        this.FighterGuid = fighter.FighterGuid;
        this.Class = fighter.Class;
        this.Description = fighter.Description;
        this.ModulePointLimit = fighter.ModulePointLimit;
        this.HullMass = fighter.HullMass;
        this.BaseVigorCost = fighter.BaseVigorCost;
        this.BaseCrewCost = fighter.BaseCrewCost;
        this.SpecificHeatCapacity = fighter.SpecificHeatCapacity;
        this.HeatCapacity = this.SpecificHeatCapacity * this.HullMass;
        this.BaseHullHealth = fighter.BaseHullHealth;
        this.SpaceshipTypeGuid = fighter.SpaceshipType.SpaceshipTypeGuid;
        this.SpaceshipTypeText = fighter.SpaceshipType.Text;
        this.SpaceshipCategoryGuid =
          fighter.SpaceshipCategory.SpaceshipCategoryGuid;
        this.SpaceshipCategoryText = fighter.SpaceshipCategory.Text;
        this.PointDefenseSystemPowerLevelGuid =
          fighter.PointDefenseSystemPowerLevel.PointDefenseSystemPowerLevelGuid;
        this.PointDefenseSystemPowerLevelText =
          fighter.PointDefenseSystemPowerLevel.Text;
        this.WeaponPowerLevelGuid =
          fighter.WeaponPowerLevel.WeaponPowerLevelGuid;
        this.WeaponPowerLevelText = fighter.WeaponPowerLevel.Text;
      }
    }
}
