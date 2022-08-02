import { CorvetteModel } from "../Corvette/CorvetteModel";
import { ArmorModel } from "../Armor/ArmorModel";
import { PointDefenseSystemModel } from "../PointDefenseSystem/PointDefenseSystemModel";
import { FuelSystemModel } from "../FuelSystem/FuelSystemModel";
import { ThrusterModel } from "../Thruster/ThrusterModel";
import { WeaponFrameModel } from "../WeaponFrame/WeaponFrameModel";
import { PayloadModel } from "../Payload/PayloadModel";

export class CorvetteConfigurationModel {
  // the original object consumed directly from the API
  _corvetteConfiguration;

  // Flattening all of the configuration's nested objects into a single level deep
  // for searching, filtering, sorting, and comparisons throughout the app
  CorvetteConfigurationGuid;
  Name;
  Armor;
  ArmorGuid;
  ArmorModulePointsCost;
  ArmorMass;
  ArmorSpecificHeatCapacity;
  ArmorKineticResistance;
  ArmorEnergyResistance;
  ArmorTitle;
  ArmorDescription;
  ArmorSpaceshipTypeGuid;
  ArmorSpaceshipTypeText;
  Corvette;
  CorvetteGuid;
  CorvetteClass;
  CorvetteHullMass;
  CorvetteSpecificHeatCapacity;
  CorvetteDescription;
  CorvetteBaseVigorCost;
  CorvetteBaseCrewCost;
  CorvetteModulePointLimit;
  CorvettePointDefenseSystemPowerLevelGuid;
  CorvettePointDefenseSystemPowerLevelText;
  CorvetteSpaceshipCategoryGuid;
  CorvetteSpaceshipCategoryText;
  CorvetteSpaceshipTypeGuid;
  CorvetteSpaceshipTypeText;
  CorvetteWeaponPowerLevelGuid;
  CorvetteWeaponPowerLevelText;
  User;
  UserGuid;
  Username;
  FuelSystem;
  FuelSystemGuid;
  FuelSystemMass;
  FuelSystemModulePointsCost;
  FuelSystemSpecificHeatCapacity;
  FuelSystemFuelCapacity;
  FuelSystemFuelRegenerationRate;
  FuelSystemTitle;
  FuelSystemDescription;
  FuelSystemSpaceshipTypeGuid;
  FuelSystemSpaceshipTypeText;
  Payload;
  PayloadGuid;
  PayloadModulePointsCost;
  PayloadVelocity;
  PayloadKineticDamageBias;
  PayloadEnergyDamageBias;
  PayloadCounterSusceptibility;
  PayloadBaseDamage;
  PayloadBaseCriticalHitMultiplier;
  PayloadTitle;
  PayloadDescription;
  PayloadPayloadTypeGuid;
  PayloadPayloadTypeText;
  PayloadPowerLevelGuid;
  PayloadPowerLevelText;
  PayloadWeaponFrameTypeGuid;
  PayloadWeaponFrameTypeText;
  PointDefenseSystem;
  PointDefenseSystemGuid;
  PointDefenseSystemModulePointsCost;
  PointDefenseSystemMass;
  PointDefenseSystemSpecificHeatCapacity;
  PointDefenseSystemCountermeasureCapacity;
  PointDefenseSystemCountermeasureRegenerationRate;
  PointDefenseSystemEfficiency;
  PointDefenseSystemTitle;
  PointDefenseSystemDescription;
  PointDefenseSystemPowerLevelGuid;
  PointDefenseSystemPowerLevelText;
  Thruster;
  ThrusterGuid;
  ThrusterModulePointsCost;
  ThrusterMass;
  ThrusterSpecificHeatCapacity;
  ThrusterThrust;
  ThrusterEfficiency;
  ThrusterTitle;
  ThrusterDescription;
  ThrusterSpaceshipTypeGuid;
  ThrusterSpaceshipTypeText;
  WeaponFrame;
  WeaponFrameGuid;
  WeaponFrameModulePointsCost;
  WeaponFrameMass;
  WeaponFrameSpecificHeatCapacity;
  WeaponFrameBaseMagSize;
  WeaponFrameTargetingEfficiency;
  WeaponFrameOptimalRange;
  WeaponFrameEffectiveRange;
  WeaponFrameBaseCriticalHitChance;
  WeaponFrameTitle;
  WeaponFrameDescription;
  WeaponFramePowerLevelGuid;
  WeaponFramePowerLevelText;
  WeaponFrameWeaponFrameTypeGuid;
  WeaponFrameWeaponFrameTypeText;

  // Calculated properites that do not exist in the database
  // These require properties above to be set before their calculation
  ArmorHeatCapacity;
  ArmorCrewCost;
  CorvetteHeatCapacity;
  FuelSystemHeatCapacity;
  FuelSystemFuelConsumptionRate;
  FuelSystemCrewCost;
  PayloadCrewCost;
  PointDefenseSystemHeatCapacity;
  PointDefenseSystemCrewCost;
  ThrusterHeatCapacity;
  ThrusterCrewCost;
  WeaponFrameHeatCapacity;
  WeaponFrameCrewCost;
  TotalModulePointsUsage;
  TotalMass;
  TotalCrewCost;
  TotalHeatCapacity;
  Maneuverability;

  // Accepts a CorvetteConfiguration object directly from the API
  constructor(corvetteConfiguration) {
    if (corvetteConfiguration) {
      this._corvetteConfiguration = corvetteConfiguration;
      this.CorvetteConfigurationGuid =
        corvetteConfiguration.CorvetteConfigurationGuid;
      this.Name = corvetteConfiguration.Name;
      this.Armor = new ArmorModel(corvetteConfiguration.Armor);
      this.ArmorGuid = corvetteConfiguration.Armor.ArmorGuid;
      this.ArmorModulePointsCost =
        corvetteConfiguration.Armor.ModulePointsCost;
      this.ArmorMass = corvetteConfiguration.Armor.Mass;
      this.ArmorSpecificHeatCapacity =
        corvetteConfiguration.Armor.SpecificHeatCapacity;
      this.ArmorKineticResistance =
        corvetteConfiguration.Armor.KineticResistance;
      this.ArmorEnergyResistance =
        corvetteConfiguration.Armor.EnergyResistance;
      this.ArmorTitle = corvetteConfiguration.Armor.Title;
      this.ArmorDescription = corvetteConfiguration.Armor.Description;
      this.ArmorSpaceshipTypeGuid =
        corvetteConfiguration.Armor.SpaceshipType.SpaceshipTypeGuid;
      this.ArmorSpaceshipTypeText =
        corvetteConfiguration.Armor.SpaceshipType.Text;
      this.Corvette = new CorvetteModel(
        corvetteConfiguration.Corvette
      );
      this.CorvetteGuid =
        corvetteConfiguration.Corvette.CorvetteGuid;
      this.CorvetteClass = corvetteConfiguration.Corvette.Class;
      this.CorvetteHullMass =
        corvetteConfiguration.Corvette.HullMass;
      this.CorvetteSpecificHeatCapacity =
        corvetteConfiguration.Corvette.SpecificHeatCapacity;
      this.CorvetteDescription =
        corvetteConfiguration.Corvette.Description;
        this.CorvetteBaseVigorCost =
          corvetteConfiguration.Corvette.BaseVigorCost;
      this.CorvetteBaseCrewCost =
        corvetteConfiguration.Corvette.BaseCrewCost;
      this.CorvetteModulePointLimit =
        corvetteConfiguration.Corvette.ModulePointLimit;
      this.CorvettePointDefenseSystemPowerLevelGuid =
        corvetteConfiguration.Corvette.PointDefenseSystemPowerLevel.PowerLevelGuid;
      this.CorvettePointDefenseSystemPowerLevelText =
        corvetteConfiguration.Corvette.PointDefenseSystemPowerLevel.Text;
      this.CorvetteSpaceshipCategoryGuid =
        corvetteConfiguration.Corvette.SpaceshipCategory.SpaceshipCategoryGuid;
      this.CorvetteSpaceshipCategoryText =
        corvetteConfiguration.Corvette.SpaceshipCategory.Text;
      this.CorvetteSpaceshipTypeGuid =
        corvetteConfiguration.Corvette.SpaceshipType.SpaceshipTypeGuid;
      this.CorvetteSpaceshipTypeText =
        corvetteConfiguration.Corvette.SpaceshipType.Text;
      this.CorvetteWeaponPowerLevelGuid =
        corvetteConfiguration.Corvette.WeaponPowerLevel.PowerLevelGuid;
      this.CorvetteWeaponPowerLevelText =
        corvetteConfiguration.Corvette.WeaponPowerLevel.Text;
      this.User = corvetteConfiguration.User;
      this.UserGuid = corvetteConfiguration.User.UserGuid;
      this.Username = corvetteConfiguration.User.Username;
      this.FuelSystem = new FuelSystemModel(
        corvetteConfiguration.FuelSystem
      );
      this.FuelSystemGuid =
        corvetteConfiguration.FuelSystem.FuelSystemGuid;
      this.FuelSystemMass = corvetteConfiguration.FuelSystem.Mass;
      this.FuelSystemModulePointsCost =
        corvetteConfiguration.FuelSystem.ModulePointsCost;
      this.FuelSystemSpecificHeatCapacity =
        corvetteConfiguration.FuelSystem.SpecificHeatCapacity;
      this.FuelSystemFuelCapacity =
        corvetteConfiguration.FuelSystem.FuelCapacity;
      this.FuelSystemFuelRegenerationRate =
        corvetteConfiguration.FuelSystem.FuelRegenerationRate;
      this.FuelSystemTitle = corvetteConfiguration.FuelSystem.Title;
      this.FuelSystemDescription =
        corvetteConfiguration.FuelSystem.Description;
      this.FuelSystemSpaceshipTypeGuid =
        corvetteConfiguration.FuelSystem.SpaceshipType.SpaceshipTypeGuid;
      this.FuelSystemSpaceshipTypeText =
        corvetteConfiguration.FuelSystem.SpaceshipType.Text;
      this.Payload = new PayloadModel(corvetteConfiguration.Payload);
      this.PayloadGuid = corvetteConfiguration.Payload.PayloadGuid;
      this.PayloadModulePointsCost =
        corvetteConfiguration.Payload.ModulePointsCost;
      this.PayloadVelocity = corvetteConfiguration.Payload.Velocity;
      this.PayloadKineticDamageBias =
        corvetteConfiguration.Payload.KineticDamageBias;
      this.PayloadCounterSusceptibility =
        corvetteConfiguration.Payload.CounterSusceptibility;
      this.PayloadBaseDamage = corvetteConfiguration.Payload.BaseDamage;
      this.PayloadBaseCriticalHitMultiplier =
        corvetteConfiguration.Payload.BaseCriticalHitMultiplier;
      this.PayloadTitle = corvetteConfiguration.Payload.Title;
      this.PayloadDescription =
        corvetteConfiguration.Payload.Description;
      this.PayloadPayloadTypeGuid =
        corvetteConfiguration.Payload.PayloadType.PayloadTypeGuid;
      this.PayloadPayloadTypeText =
        corvetteConfiguration.Payload.PayloadType.Text;
      this.PayloadPowerLevelGuid =
        corvetteConfiguration.Payload.PowerLevel.PowerLevelGuid;
      this.PayloadPowerLevelText =
        corvetteConfiguration.Payload.PowerLevel.Text;
      this.PayloadWeaponFrameTypeGuid =
        corvetteConfiguration.Payload.WeaponFrameType.WeaponFrameTypeGuid;
      this.PayloadWeaponFrameTypeText =
        corvetteConfiguration.Payload.WeaponFrameType.Text;
      this.PointDefenseSystem = new PointDefenseSystemModel(
        corvetteConfiguration.PointDefenseSystem
      );
      this.PointDefenseSystemGuid =
        corvetteConfiguration.PointDefenseSystem.PointDefenseSystemGuid;
      this.PointDefenseSystemModulePointsCost =
        corvetteConfiguration.PointDefenseSystem.ModulePointsCost;
      this.PointDefenseSystemMass =
        corvetteConfiguration.PointDefenseSystem.Mass;
      this.PointDefenseSystemSpecificHeatCapacity =
        corvetteConfiguration.PointDefenseSystem.SpecificHeatCapacity;
      this.PointDefenseSystemCountermeasureCapacity =
        corvetteConfiguration.PointDefenseSystem.CountermeasureCapacity;
      this.PointDefenseSystemCountermeasureRegenerationRate =
        corvetteConfiguration.PointDefenseSystem.CountermeasureRegenerationRate;
      this.PointDefenseSystemEfficiency =
        corvetteConfiguration.PointDefenseSystem.Efficiency;
      this.PointDefenseSystemTitle =
        corvetteConfiguration.PointDefenseSystem.Title;
      this.PointDefenseSystemDescription =
        corvetteConfiguration.PointDefenseSystem.Description;
      this.PointDefenseSystemPowerLevelGuid =
        corvetteConfiguration.PointDefenseSystem.PowerLevel.PowerLevelGuid;
      this.PointDefenseSystemPowerLevelText =
        corvetteConfiguration.PointDefenseSystem.PowerLevel.Text;
      this.Thruster = new ThrusterModel(corvetteConfiguration.Thruster);
      this.ThrusterGuid = corvetteConfiguration.Thruster.ThrusterGuid;
      this.ThrusterModulePointsCost =
        corvetteConfiguration.Thruster.ModulePointsCost;
      this.ThrusterMass = corvetteConfiguration.Thruster.Mass;
      this.ThrusterSpecificHeatCapacity =
        corvetteConfiguration.Thruster.SpecificHeatCapacity;
      this.ThrusterThrust = corvetteConfiguration.Thruster.Thrust;
      this.ThrusterEfficiency = corvetteConfiguration.Thruster.Efficiency;
      this.ThrusterTitle = corvetteConfiguration.Thruster.Title;
      this.ThrusterDescription =
        corvetteConfiguration.Thruster.Description;
      this.ThrusterSpaceshipTypeGuid =
        corvetteConfiguration.Thruster.SpaceshipType.SpaceshipTypeGuid;
      this.ThrusterSpaceshipTypeText =
        corvetteConfiguration.Thruster.SpaceshipType.Text;
      this.WeaponFrame = new WeaponFrameModel(
        corvetteConfiguration.WeaponFrame
      );
      this.WeaponFrameGuid =
        corvetteConfiguration.WeaponFrame.WeaponFrameGuid;
      this.WeaponFrameModulePointsCost =
        corvetteConfiguration.WeaponFrame.ModulePointsCost;
      this.WeaponFrameMass = corvetteConfiguration.WeaponFrame.Mass;
      this.WeaponFrameSpecificHeatCapacity =
        corvetteConfiguration.WeaponFrame.SpecificHeatCapacity;
      this.WeaponFrameBaseMagSize =
        corvetteConfiguration.WeaponFrame.BaseMagSize;
      this.WeaponFrameTargetingEfficiency =
        corvetteConfiguration.WeaponFrame.TargetingEfficiency;
      this.WeaponFrameOptimalRange =
        corvetteConfiguration.WeaponFrame.OptimalRange;
      this.WeaponFrameEffectiveRange =
        corvetteConfiguration.WeaponFrame.EffectiveRange;
      this.WeaponFrameBaseCriticalHitChance =
        corvetteConfiguration.WeaponFrame.BaseCriticalHitChance;
      this.WeaponFrameTitle = corvetteConfiguration.WeaponFrame.Title;
      this.WeaponFrameDescription =
        corvetteConfiguration.WeaponFrame.Description;
      this.WeaponFramePowerLevelGuid =
        corvetteConfiguration.WeaponFrame.PowerLevel.PowerLevelGuid;
      this.WeaponFramePowerLevelText =
        corvetteConfiguration.WeaponFrame.PowerLevel.Text;
      this.WeaponFrameWeaponFrameTypeGuid =
        corvetteConfiguration.WeaponFrame.WeaponFrameType.WeaponFrameTypeGuid;
      this.WeaponFrameWeaponFrameTypeText =
        corvetteConfiguration.WeaponFrame.WeaponFrameType.Text;

      // Calculated properties
      // this.ArmorHeatCapacity = this.ArmorMass * this.ArmorSpecificHeatCapacity;
      // this.ArmorCrewCost = Math.sqrt(this.CorvetteBaseCrewCost * (this.ArmorModulePointsCost > 0 ? 1 : 0));
      // this.CorvetteHeatCapacity = this.CorvetteHullMass * this.CorvetteSpecificHeatCapacity;
      // this.FuelSystemHeatCapacity = this.FuelSystemMass * this.FuelSystemSpecificHeatCapacity;
      // this.FuelSystemCrewCost = Math.sqrt(this.CorvetteBaseCrewCost * (this.FuelSystemModulePointsCost > 0 ? 1 : 0));
      // this.PayloadEnergyDamageBias = 1 - this.PayloadKineticDamageBias;
      // this.PayloadCrewCost = Math.sqrt(this.CorvetteBaseCrewCost * (this.PayloadModulePointsCost > 0 ? 1 : 0));
      // this.PointDefenseSystemHeatCapacity = this.PointDefenseSystemMass * this.PointDefenseSystemSpecificHeatCapacity;
      // this.PointDefenseSystemCrewCost = Math.sqrt(this.CorvetteBaseCrewCost * (this.PointDefenseSystemModulePointsCost > 0 ? 1 : 0));
      // this.ThrusterHeatCapacity = this.ThrusterMass * this.ThrusterSpecificHeatCapacity;
      // this.ThrusterCrewCost = Math.sqrt(this.CorvetteBaseCrewCost * (this.ThrusterModulePointsCost > 0 ? 1 : 0));
      // this.WeaponFrameHeatCapacity = this.WeaponFrameMass * this.WeaponFrameSpecificHeatCapacity;
      // this.WeaponFrameCrewCost = Math.sqrt(this.CorvetteBaseCrewCost * (this.WeaponFrameModulePointsCost > 0 ? 1 : 0));
      // this.TotalModulePointsUsage = this.corvetteConfigurationTotalModulePointsUsage();
      // this.TotalMass = this.corvetteConfigurationTotalMass();
      // this.TotalCrewCost = this.corvetteConfigurationTotalCrewCost();
      // this.TotalHeatCapacity = this.corvetteConfigurationTotalHeatCapacity();
      // this.Maneuverability = this.corvetteConfigurationManeuverability();
      // this.FuelSystemFuelConsumptionRate = this.TotalMass / this.ThrusterEfficiency;
      this.updateCalculated();
    }
  }

  corvetteConfigurationTotalModulePointsUsage = function () {
    let totalModulePointsUsed =
      (this.ArmorModulePointsCost || 0) +
      (this.FuelSystemModulePointsCost || 0) +
      (this.PointDefenseSystemModulePointsCost || 0) +
      (this.ThrusterModulePointsCost || 0) +
      (this.WeaponFrameModulePointsCost || 0) +
      (this.PayloadModulePointsCost || 0)

    if (this.CorvetteModulePointLimit == 0) {
      return 0;
    }
    return totalModulePointsUsed;
  };
  corvetteConfigurationTotalMass = function () {
    if (this._corvetteConfiguration == null) {
      return 0;
    }
    return (
      (this.CorvetteHullMass || 0) +
      (this.ArmorMass || 0) +
      (this.FuelSystemMass || 0) +
      (this.PointDefenseSystemMass || 0) +
      (this.ThrusterMass || 0) +
      (this.WeaponFrameMass || 0)
    );
  };
  corvetteConfigurationTotalCrewCost = function () {
    if (this._corvetteConfiguration == null) {
      return 0;
    }
    return Math.round(
      (this.CorvetteBaseCrewCost || 0) +
        (this.Armor
          ? Math.sqrt(
              this.CorvetteBaseCrewCost *
                (this.ArmorModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.FuelSystem
          ? Math.sqrt(
              this.CorvetteBaseCrewCost *
                (this.FuelSystemModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.PointDefenseSystem
          ? Math.sqrt(
              this.CorvetteBaseCrewCost *
                (this.PointDefenseSystemModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.Thruster
          ? Math.sqrt(
              this.CorvetteBaseCrewCost *
                (this.ThrusterModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.WeaponFrame
          ? Math.sqrt(
              this.CorvetteBaseCrewCost *
                (this.WeaponFrameModulePointsCost > 0 ? 1 : 0)
            )
          : 0)
    );
  };
  corvetteConfigurationTotalHeatCapacity = function () {
    if (this._corvetteConfiguration == null) {
      return 0;
    }
    return (
      (this.CorvetteHeatCapacity || 0) +
      (this.ArmorHeatCapacity || 0) +
      (this.FuelSystemHeatCapacity || 0) +
      (this.PointDefenseSystemHeatCapacity || 0) +
      (this.ThrusterHeatCapacity || 0) +
      (this.WeaponFrameHeatCapacity || 0)
    );
  };
  corvetteConfigurationManeuverability = function () {
    if (this.TotalMass == 0) {
      return 0;
    }
    return this.ThrusterThrust / this.TotalMass;
  };
  damagePerTurn = function () {
    if (this._corvetteConfiguration == null) {
      return 0;
    }
    let weapon1OptimalDPT =
      this.WeaponFrameBaseMagSize * this.PayloadBaseDamage
    return weapon1OptimalDPT;
  };

  setName = function (name) {
    this.Name = name;
  };

  setCorvette = function (corvette) {
    this.Corvette = corvette;
    this.CorvetteGuid = this.Corvette.CorvetteGuid;
    this.CorvetteClass = this.Corvette.Class;
    this.CorvetteHullMass = this.Corvette.HullMass;
    this.CorvetteSpecificHeatCapacity =
      this.Corvette.SpecificHeatCapacity;
    this.CorvetteDescription = this.Corvette.Description;
    this.CorvetteBaseVigorCost = this.Corvette.BaseVigorCost;
    this.CorvetteBaseCrewCost = this.Corvette.BaseCrewCost;
    this.CorvetteModulePointLimit = this.Corvette.ModulePointLimit;
    this.CorvettePointDefenseSystemPowerLevelGuid =
      this.Corvette.PointDefenseSystemPowerLevelGuid;
    this.CorvettePointDefenseSystemPowerLevelText =
      this.Corvette.PointDefenseSystemPowerLevelText;
    this.CorvetteSpaceshipCategoryGuid =
      this.Corvette.SpaceshipCategoryGuid;
    this.CorvetteSpaceshipCategoryText =
      this.Corvette.SpaceshipCategoryText;
    this.CorvetteSpaceshipTypeGuid = this.Corvette.SpaceshipTypeGuid;
    this.CorvetteSpaceshipTypeText = this.Corvette.SpaceshipTypeText;
    this.CorvetteWeaponPowerLevelGuid =
      this.Corvette.WeaponPowerLevelGuid;
    this.CorvetteWeaponPowerLevelText =
      this.Corvette.WeaponPowerLevelText;
    this.updateCalculated("Corvette");
  };

  setArmor = function (armor) {
    this.Armor = armor;
    this.ArmorGuid = this.Armor.ArmorGuid;
    this.ArmorModulePointsCost = this.Armor.ModulePointsCost;
    this.ArmorMass = this.Armor.Mass;
    this.ArmorSpecificHeatCapacity = this.Armor.SpecificHeatCapacity;
    this.ArmorKineticResistance = this.Armor.KineticResistance;
    this.ArmorEnergyResistance = this.Armor.EnergyResistance;
    this.ArmorTitle = this.Armor.Title;
    this.ArmorDescription = this.Armor.Description;
    this.ArmorSpaceshipTypeGuid = this.Armor.SpaceshipTypeGuid;
    this.ArmorSpaceshipTypeText = this.Armor.SpaceshipTypeText;
    this.updateCalculated("Armor");
  };

  setPointDefenseSystem = function (pointDefenseSystem) {
    this.PointDefenseSystem = pointDefenseSystem;
    this.PointDefenseSystemGuid =
      this.PointDefenseSystem.PointDefenseSystemGuid;
    this.PointDefenseSystemModulePointsCost =
      this.PointDefenseSystem.ModulePointsCost;
    this.PointDefenseSystemMass = this.PointDefenseSystem.Mass;
    this.PointDefenseSystemSpecificHeatCapacity =
      this.PointDefenseSystem.SpecificHeatCapacity;
    this.PointDefenseSystemCountermeasureCapacity =
      this.PointDefenseSystem.CountermeasureCapacity;
    this.PointDefenseSystemCountermeasureRegenerationRate =
      this.PointDefenseSystem.CountermeasureRegenerationRate;
    this.PointDefenseSystemEfficiency = this.PointDefenseSystem.Efficiency;
    this.PointDefenseSystemTitle = this.PointDefenseSystem.Title;
    this.PointDefenseSystemDescription = this.PointDefenseSystem.Description;
    this.PointDefenseSystemPowerLevelGuid =
      this.PointDefenseSystem.PowerLevelGuid;
    this.PointDefenseSystemPowerLevelText =
      this.PointDefenseSystem.PowerLevelText;
    this.updateCalculated("PointDefenseSystem");
  };

  setFuelSystem = function (fuelSystem) {
    this.FuelSystem = fuelSystem;
    this.FuelSystemGuid = this.FuelSystem.FuelSystemGuid;
    this.FuelSystemModulePointsCost = this.FuelSystem.ModulePointsCost;
    this.FuelSystemMass = this.FuelSystem.Mass;
    this.FuelSystemSpecificHeatCapacity = this.FuelSystem.SpecificHeatCapacity;
    this.FuelSystemFuelCapacity = this.FuelSystem.FuelCapacity;
    this.FuelSystemFuelRegenerationRate = this.FuelSystem.FuelRegenerationRate;
    this.FuelSystemTitle = this.FuelSystem.Title;
    this.FuelSystemDescription = this.FuelSystem.Description;
    this.FuelSystemSpaceshipTypeGuid = this.FuelSystem.SpaceshipTypeGuid;
    this.FuelSystemSpaceshipTypeText = this.FuelSystem.SpaceshipTypeText;
    this.updateCalculated("FuelSystem");
  };

  setThruster = function (thruster) {
    this.Thruster = thruster;
    this.ThrusterGuid = this.Thruster.ThrusterGuid;
    this.ThrusterModulePointsCost = this.Thruster.ModulePointsCost;
    this.ThrusterMass = this.Thruster.Mass;
    this.ThrusterSpecificHeatCapacity = this.Thruster.SpecificHeatCapacity;
    this.ThrusterThrust = this.Thruster.Thrust;
    this.ThrusterEfficiency = this.Thruster.Efficiency;
    this.ThrusterTitle = this.Thruster.Title;
    this.ThrusterDescription = this.Thruster.Description;
    this.ThrusterSpaceshipTypeGuid = this.Thruster.SpaceshipTypeGuid;
    this.ThrusterSpaceshipTypeText = this.Thruster.SpaceshipTypeText;
    this.updateCalculated("Thruster");
  };

  setWeaponFrame = function (weaponFrame) {
    this.WeaponFrame = weaponFrame;
    this.WeaponFrameGuid = this.WeaponFrame.WeaponFrameGuid;
    this.WeaponFrameModulePointsCost = this.WeaponFrame.ModulePointsCost;
    this.WeaponFrameMass = this.WeaponFrame.Mass;
    this.WeaponFrameSpecificHeatCapacity =
      this.WeaponFrame.SpecificHeatCapacity;
    this.WeaponFrameBaseMagSize = this.WeaponFrame.BaseMagSize;
    this.WeaponFrameTargetingEfficiency =
      this.WeaponFrame.TargetingEfficiency;
    this.WeaponFrameOptimalRange = this.WeaponFrame.OptimalRange;
    this.WeaponFrameEffectiveRange = this.WeaponFrame.EffectiveRange;
    this.WeaponFrameBaseCriticalHitChance =
      this.WeaponFrame.BaseCriticalHitChance;
    this.WeaponFrameTitle = this.WeaponFrame.Title;
    this.WeaponFrameDescription = this.WeaponFrame.Description;
    this.WeaponFramePowerLevelGuid = this.WeaponFrame.PowerLevelGuid;
    this.WeaponFramePowerLevelText = this.WeaponFrame.PowerLevelText;
    this.WeaponFrameWeaponFrameTypeGuid =
      this.WeaponFrame.WeaponFrameTypeGuid;
    this.WeaponFrameWeaponFrameTypeText =
      this.WeaponFrame.WeaponFrameTypeText;
    this.updateCalculated("WeaponFrame");
  };

  setPayload = function (weaponFrame) {
    this.Payload = weaponFrame;
    this.PayloadGuid = this.Payload.PayloadGuid;
    this.PayloadModulePointsCost = this.Payload.ModulePointsCost;
    this.PayloadVelocity = this.Payload.Velocity;
    this.PayloadKineticDamageBias = this.Payload.KineticDamageBias;
    this.PayloadCounterSusceptibility = this.Payload.CounterSusceptibility;
    this.PayloadBaseDamage = this.Payload.BaseDamage;
    this.PayloadBaseCriticalHitMultiplier =
      this.Payload.BaseCriticalHitMultiplier;
    this.PayloadTitle = this.Payload.Title;
    this.PayloadDescription = this.Payload.Description;
    this.PayloadPayloadTypeGuid = this.Payload.PayloadTypeGuid;
    this.PayloadPayloadTypeText = this.Payload.PayloadTypeText;
    this.PayloadPowerLevelGuid = this.Payload.PowerLevelGuid;
    this.PayloadPowerLevelText = this.Payload.PowerLevelText;
    this.PayloadWeaponFrameTypeGuid = this.Payload.WeaponFrameTypeGuid;
    this.PayloadWeaponFrameTypeText = this.Payload.WeaponFrameTypeText;
    this.updateCalculated("Payload");
  };

    isValid = function() {
        let invalid = false;
        if (this.TotalModulePointsUsage > this.CorvetteModulePointLimit) {
            invalid = true;
        }
        let powerLevels = {
            "Level 1": 1,
            "Level 2": 2,
            "Level 3": 3
        }
        if (powerLevels[this.PointDefenseSystemPowerLevelText] > powerLevels[this.CorvettePointDefenseSystemPowerLevelText]) {
            invalid = true;
        }
        if (powerLevels[this.WeaponFramePowerLevelText] > powerLevels[this.CorvettePointDefenseSystemPowerLevelText]) {
            invalid = true;
        }
        if (powerLevels[this.PayloadPowerLevelText] > powerLevels[this.WeaponFramePowerLevelText]) {
            invalid = true;
        }

        return !invalid
    };



  updateCalculated = function (key = null) {
    if (key === "Armor" || key == null) {
      this.ArmorHeatCapacity = this.ArmorMass * this.ArmorSpecificHeatCapacity;
      this.ArmorCrewCost = Math.sqrt(
        this.CorvetteBaseCrewCost *
          (this.ArmorModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "Corvette" || key == null) {
      this.CorvetteHeatCapacity =
        this.CorvetteHullMass * this.CorvetteSpecificHeatCapacity;
    }
    if (key === "FuelSystem" || key == null) {
      this.FuelSystemHeatCapacity =
        this.FuelSystemMass * this.FuelSystemSpecificHeatCapacity;
      this.FuelSystemCrewCost = Math.sqrt(
        this.CorvetteBaseCrewCost *
          (this.FuelSystemModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "Payload" || key == null) {
      this.PayloadEnergyDamageBias = 1 - this.PayloadKineticDamageBias;
      this.PayloadCrewCost = Math.sqrt(
        this.CorvetteBaseCrewCost *
          (this.PayloadModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "PointDefenseSystem" || key == null) {
      this.PointDefenseSystemHeatCapacity =
        this.PointDefenseSystemMass *
        this.PointDefenseSystemSpecificHeatCapacity;
      this.PointDefenseSystemCrewCost = Math.sqrt(
        this.CorvetteBaseCrewCost *
          (this.PointDefenseSystemModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "Thruster" || key == null) {
      this.ThrusterHeatCapacity =
        this.ThrusterMass * this.ThrusterSpecificHeatCapacity;
      this.ThrusterCrewCost = Math.sqrt(
        this.CorvetteBaseCrewCost *
          (this.ThrusterModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "WeaponFrame" || key == null) {
      this.WeaponFrameHeatCapacity =
        this.WeaponFrameMass * this.WeaponFrameSpecificHeatCapacity;
      this.WeaponFrameCrewCost = Math.sqrt(
        this.CorvetteBaseCrewCost *
          (this.WeaponFrameModulePointsCost > 0 ? 1 : 0)
      );
    }

    this.TotalModulePointsUsage =
      this.corvetteConfigurationTotalModulePointsUsage();
    this.TotalMass = this.corvetteConfigurationTotalMass();
    this.TotalCrewCost = this.corvetteConfigurationTotalCrewCost();
    this.TotalHeatCapacity = this.corvetteConfigurationTotalHeatCapacity();
    this.Maneuverability = this.corvetteConfigurationManeuverability();
    this.FuelSystemFuelConsumptionRate =
      this.TotalMass / this.ThrusterEfficiency;
  };
}
