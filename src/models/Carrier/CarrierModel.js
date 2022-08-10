export class CarrierModel {
    CarrierGuid;
    Class;
    Description;
    ModulePointLimit;
    HullMass;
    BaseCrewCost;
    SpecificHeatCapacity;
    HeatCapacity;
    BaseHullHealth;
    FighterBays;
    CorvetteBays;
    FrigateBays;
    DestroyerBays;
    SpaceshipTypeGuid;
    SpaceshipTypeText;
    SpaceshipCategoryGuid;
    SpaceshipCategoryText;
    PointDefenseSystemPowerLevelGuid;
    PointDefenseSystemPowerLevelText;
    WeaponPowerLevelGuid;
    WeaponPowerLevelText;
    disabled = false;
  
    constructor(carrier) {
      if (carrier) {
        this._carrier = carrier;
        this.CarrierGuid = carrier.CarrierGuid;
        this.Class = carrier.Class;
        this.Description = carrier.Description;
        this.ModulePointLimit = carrier.ModulePointLimit;
        this.HullMass = carrier.HullMass;
        this.BaseVigorCost = carrier.BaseVigorCost;
        this.BaseCrewCost = carrier.BaseCrewCost;
        this.SpecificHeatCapacity = carrier.SpecificHeatCapacity;
        this.HeatCapacity = this.SpecificHeatCapacity * this.HullMass;
        this.BaseHullHealth = carrier.BaseHullHealth;
        this.FighterBays = carrier.FighterBays;
        this.CorvetteBays = carrier.CorvetteBays;
        this.FrigateBays = carrier.FrigateBays;
        this.DestroyerBays = carrier.DestroyerBays;
        this.SpaceshipTypeGuid = carrier.SpaceshipType.SpaceshipTypeGuid;
        this.SpaceshipTypeText = carrier.SpaceshipType.Text;
        this.SpaceshipCategoryGuid =
          carrier.SpaceshipCategory.SpaceshipCategoryGuid;
        this.SpaceshipCategoryText = carrier.SpaceshipCategory.Text;
        this.PointDefenseSystemPowerLevelGuid =
          carrier.PointDefenseSystemPowerLevel.PointDefenseSystemPowerLevelGuid;
        this.PointDefenseSystemPowerLevelText =
          carrier.PointDefenseSystemPowerLevel.Text;
        this.WeaponPowerLevelGuid =
          carrier.WeaponPowerLevel.WeaponPowerLevelGuid;
        this.WeaponPowerLevelText = carrier.WeaponPowerLevel.Text;
      }
    }
  }
  