export class CorvetteModel {
    CorvetteGuid;
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
  
    constructor(corvette) {
      if (corvette) {
        this._corvette = corvette;
        this.CorvetteGuid = corvette.CorvetteGuid;
        this.Class = corvette.Class;
        this.Description = corvette.Description;
        this.ModulePointLimit = corvette.ModulePointLimit;
        this.HullMass = corvette.HullMass;
        this.BaseVigorCost = corvette.BaseVigorCost;
        this.BaseCrewCost = corvette.BaseCrewCost;
        this.SpecificHeatCapacity = corvette.SpecificHeatCapacity;
        this.HeatCapacity = this.SpecificHeatCapacity * this.HullMass;
        this.BaseHullHealth = corvette.BaseHullHealth;
        this.SpaceshipTypeGuid = corvette.SpaceshipType.SpaceshipTypeGuid;
        this.SpaceshipTypeText = corvette.SpaceshipType.Text;
        this.SpaceshipCategoryGuid =
          corvette.SpaceshipCategory.SpaceshipCategoryGuid;
        this.SpaceshipCategoryText = corvette.SpaceshipCategory.Text;
        this.PointDefenseSystemPowerLevelGuid =
          corvette.PointDefenseSystemPowerLevel.PointDefenseSystemPowerLevelGuid;
        this.PointDefenseSystemPowerLevelText =
          corvette.PointDefenseSystemPowerLevel.Text;
        this.WeaponPowerLevelGuid =
          corvette.WeaponPowerLevel.WeaponPowerLevelGuid;
        this.WeaponPowerLevelText = corvette.WeaponPowerLevel.Text;
      }
    }
  }
  