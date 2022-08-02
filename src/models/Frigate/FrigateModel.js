export class FrigateModel {
    FrigateGuid;
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
  
    constructor(frigate) {
      if (frigate) {
        this._frigate = frigate;
        this.FrigateGuid = frigate.FrigateGuid;
        this.Class = frigate.Class;
        this.Description = frigate.Description;
        this.ModulePointLimit = frigate.ModulePointLimit;
        this.HullMass = frigate.HullMass;
        this.BaseVigorCost = frigate.BaseVigorCost;
        this.BaseCrewCost = frigate.BaseCrewCost;
        this.SpecificHeatCapacity = frigate.SpecificHeatCapacity;
        this.HeatCapacity = this.SpecificHeatCapacity * this.HullMass;
        this.BaseHullHealth = frigate.BaseHullHealth;
        this.SpaceshipTypeGuid = frigate.SpaceshipType.SpaceshipTypeGuid;
        this.SpaceshipTypeText = frigate.SpaceshipType.Text;
        this.SpaceshipCategoryGuid =
          frigate.SpaceshipCategory.SpaceshipCategoryGuid;
        this.SpaceshipCategoryText = frigate.SpaceshipCategory.Text;
        this.PointDefenseSystemPowerLevelGuid =
          frigate.PointDefenseSystemPowerLevel.PointDefenseSystemPowerLevelGuid;
        this.PointDefenseSystemPowerLevelText =
          frigate.PointDefenseSystemPowerLevel.Text;
        this.WeaponPowerLevelGuid =
          frigate.WeaponPowerLevel.WeaponPowerLevelGuid;
        this.WeaponPowerLevelText = frigate.WeaponPowerLevel.Text;
      }
    }
  }
  