export class DestroyerModel {
    DestroyerGuid;
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
  
    constructor(destroyer) {
      if (destroyer) {
        this._destroyer = destroyer;
        this.DestroyerGuid = destroyer.DestroyerGuid;
        this.Class = destroyer.Class;
        this.Description = destroyer.Description;
        this.ModulePointLimit = destroyer.ModulePointLimit;
        this.HullMass = destroyer.HullMass;
        this.BaseVigorCost = destroyer.BaseVigorCost;
        this.BaseCrewCost = destroyer.BaseCrewCost;
        this.SpecificHeatCapacity = destroyer.SpecificHeatCapacity;
        this.HeatCapacity = this.SpecificHeatCapacity * this.HullMass;
        this.BaseHullHealth = destroyer.BaseHullHealth;
        this.SpaceshipTypeGuid = destroyer.SpaceshipType.SpaceshipTypeGuid;
        this.SpaceshipTypeText = destroyer.SpaceshipType.Text;
        this.SpaceshipCategoryGuid =
          destroyer.SpaceshipCategory.SpaceshipCategoryGuid;
        this.SpaceshipCategoryText = destroyer.SpaceshipCategory.Text;
        this.PointDefenseSystemPowerLevelGuid =
          destroyer.PointDefenseSystemPowerLevel.PointDefenseSystemPowerLevelGuid;
        this.PointDefenseSystemPowerLevelText =
          destroyer.PointDefenseSystemPowerLevel.Text;
        this.WeaponPowerLevelGuid =
          destroyer.WeaponPowerLevel.WeaponPowerLevelGuid;
        this.WeaponPowerLevelText = destroyer.WeaponPowerLevel.Text;
      }
    }
  }
  