import { FighterModel } from "../Fighter/FighterModel";
import { ArmorModel } from "../Armor/ArmorModel";
import { PointDefenseSystemModel } from "../PointDefenseSystem/PointDefenseSystemModel";
import { FuelSystemModel } from "../FuelSystem/FuelSystemModel";
import { ThrusterModel } from "../Thruster/ThrusterModel";
import { WeaponFrameModel } from "../WeaponFrame/WeaponFrameModel";
import { PayloadModel } from "../Payload/PayloadModel";
import { EVASION_SCALAR } from "../../utils/constants";

export class FighterConfigurationModel {
  // the original object consumed directly from the API
  _fighterConfiguration;

  // Flattening all of the configuration's nested objects into a single level deep
  // for searching, filtering, sorting, and comparisons throughout the app
  FighterConfigurationGuid;
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
  Fighter;
  FighterGuid;
  FighterClass;
  FighterHullMass;
  FighterSpecificHeatCapacity;
  FighterDescription;
  FighterBaseVigorCost;
  FighterBaseCrewCost;
  FighterModulePointLimit;
  FighterPointDefenseSystemPowerLevelGuid;
  FighterPointDefenseSystemPowerLevelText;
  FighterSpaceshipCategoryGuid;
  FighterSpaceshipCategoryText;
  FighterSpaceshipTypeGuid;
  FighterSpaceshipTypeText;
  FighterWeaponPowerLevelGuid;
  FighterWeaponPowerLevelText;
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
  FighterHeatCapacity;
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

  // Accepts a FighterConfiguration object directly from the API
  constructor(fighterConfiguration) {
    if (fighterConfiguration) {
      this._fighterConfiguration = fighterConfiguration;
      this.FighterConfigurationGuid =
        fighterConfiguration.FighterConfigurationGuid;
      this.Name = fighterConfiguration.Name;
      this.Armor = new ArmorModel(fighterConfiguration.Armor);
      this.ArmorGuid = fighterConfiguration.Armor.ArmorGuid;
      this.ArmorModulePointsCost =
        fighterConfiguration.Armor.ModulePointsCost;
      this.ArmorMass = fighterConfiguration.Armor.Mass;
      this.ArmorSpecificHeatCapacity =
        fighterConfiguration.Armor.SpecificHeatCapacity;
      this.ArmorKineticResistance =
        fighterConfiguration.Armor.KineticResistance;
      this.ArmorEnergyResistance =
        fighterConfiguration.Armor.EnergyResistance;
      this.ArmorTitle = fighterConfiguration.Armor.Title;
      this.ArmorDescription = fighterConfiguration.Armor.Description;
      this.ArmorSpaceshipTypeGuid =
        fighterConfiguration.Armor.SpaceshipType.SpaceshipTypeGuid;
      this.ArmorSpaceshipTypeText =
        fighterConfiguration.Armor.SpaceshipType.Text;
      this.Fighter = new FighterModel(
        fighterConfiguration.Fighter
      );
      this.FighterGuid =
        fighterConfiguration.Fighter.FighterGuid;
      this.FighterClass = fighterConfiguration.Fighter.Class;
      this.FighterHullMass =
        fighterConfiguration.Fighter.HullMass;
      this.FighterSpecificHeatCapacity =
        fighterConfiguration.Fighter.SpecificHeatCapacity;
      this.FighterDescription =
        fighterConfiguration.Fighter.Description;
        this.FighterBaseVigorCost =
          fighterConfiguration.Fighter.BaseVigorCost;
      this.FighterBaseCrewCost =
        fighterConfiguration.Fighter.BaseCrewCost;
      this.FighterModulePointLimit =
        fighterConfiguration.Fighter.ModulePointLimit;
      this.FighterPointDefenseSystemPowerLevelGuid =
        fighterConfiguration.Fighter.PointDefenseSystemPowerLevel.PowerLevelGuid;
      this.FighterPointDefenseSystemPowerLevelText =
        fighterConfiguration.Fighter.PointDefenseSystemPowerLevel.Text;
      this.FighterSpaceshipCategoryGuid =
        fighterConfiguration.Fighter.SpaceshipCategory.SpaceshipCategoryGuid;
      this.FighterSpaceshipCategoryText =
        fighterConfiguration.Fighter.SpaceshipCategory.Text;
      this.FighterSpaceshipTypeGuid =
        fighterConfiguration.Fighter.SpaceshipType.SpaceshipTypeGuid;
      this.FighterSpaceshipTypeText =
        fighterConfiguration.Fighter.SpaceshipType.Text;
      this.FighterWeaponPowerLevelGuid =
        fighterConfiguration.Fighter.WeaponPowerLevel.PowerLevelGuid;
      this.FighterWeaponPowerLevelText =
        fighterConfiguration.Fighter.WeaponPowerLevel.Text;
      this.User = fighterConfiguration.User;
      this.UserGuid = fighterConfiguration.User.UserGuid;
      this.Username = fighterConfiguration.User.Username;
      this.FuelSystem = new FuelSystemModel(
        fighterConfiguration.FuelSystem
      );
      this.FuelSystemGuid =
        fighterConfiguration.FuelSystem.FuelSystemGuid;
      this.FuelSystemMass = fighterConfiguration.FuelSystem.Mass;
      this.FuelSystemModulePointsCost =
        fighterConfiguration.FuelSystem.ModulePointsCost;
      this.FuelSystemSpecificHeatCapacity =
        fighterConfiguration.FuelSystem.SpecificHeatCapacity;
      this.FuelSystemFuelCapacity =
        fighterConfiguration.FuelSystem.FuelCapacity;
      this.FuelSystemFuelRegenerationRate =
        fighterConfiguration.FuelSystem.FuelRegenerationRate;
      this.FuelSystemTitle = fighterConfiguration.FuelSystem.Title;
      this.FuelSystemDescription =
        fighterConfiguration.FuelSystem.Description;
      this.FuelSystemSpaceshipTypeGuid =
        fighterConfiguration.FuelSystem.SpaceshipType.SpaceshipTypeGuid;
      this.FuelSystemSpaceshipTypeText =
        fighterConfiguration.FuelSystem.SpaceshipType.Text;
      this.Payload = new PayloadModel(fighterConfiguration.Payload);
      this.PayloadGuid = fighterConfiguration.Payload.PayloadGuid;
      this.PayloadModulePointsCost =
        fighterConfiguration.Payload.ModulePointsCost;
      this.PayloadVelocity = fighterConfiguration.Payload.Velocity;
      this.PayloadKineticDamageBias =
        fighterConfiguration.Payload.KineticDamageBias;
      this.PayloadCounterSusceptibility =
        fighterConfiguration.Payload.CounterSusceptibility;
      this.PayloadBaseDamage = fighterConfiguration.Payload.BaseDamage;
      this.PayloadBaseCriticalHitMultiplier =
        fighterConfiguration.Payload.BaseCriticalHitMultiplier;
      this.PayloadTitle = fighterConfiguration.Payload.Title;
      this.PayloadDescription =
        fighterConfiguration.Payload.Description;
      this.PayloadPayloadTypeGuid =
        fighterConfiguration.Payload.PayloadType.PayloadTypeGuid;
      this.PayloadPayloadTypeText =
        fighterConfiguration.Payload.PayloadType.Text;
      this.PayloadPowerLevelGuid =
        fighterConfiguration.Payload.PowerLevel.PowerLevelGuid;
      this.PayloadPowerLevelText =
        fighterConfiguration.Payload.PowerLevel.Text;
      this.PayloadWeaponFrameTypeGuid =
        fighterConfiguration.Payload.WeaponFrameType.WeaponFrameTypeGuid;
      this.PayloadWeaponFrameTypeText =
        fighterConfiguration.Payload.WeaponFrameType.Text;
      this.PointDefenseSystem = new PointDefenseSystemModel(
        fighterConfiguration.PointDefenseSystem
      );
      this.PointDefenseSystemGuid =
        fighterConfiguration.PointDefenseSystem.PointDefenseSystemGuid;
      this.PointDefenseSystemModulePointsCost =
        fighterConfiguration.PointDefenseSystem.ModulePointsCost;
      this.PointDefenseSystemMass =
        fighterConfiguration.PointDefenseSystem.Mass;
      this.PointDefenseSystemSpecificHeatCapacity =
        fighterConfiguration.PointDefenseSystem.SpecificHeatCapacity;
      this.PointDefenseSystemCountermeasureCapacity =
        fighterConfiguration.PointDefenseSystem.CountermeasureCapacity;
      this.PointDefenseSystemCountermeasureRegenerationRate =
        fighterConfiguration.PointDefenseSystem.CountermeasureRegenerationRate;
      this.PointDefenseSystemEfficiency =
        fighterConfiguration.PointDefenseSystem.Efficiency;
      this.PointDefenseSystemTitle =
        fighterConfiguration.PointDefenseSystem.Title;
      this.PointDefenseSystemDescription =
        fighterConfiguration.PointDefenseSystem.Description;
      this.PointDefenseSystemPowerLevelGuid =
        fighterConfiguration.PointDefenseSystem.PowerLevel.PowerLevelGuid;
      this.PointDefenseSystemPowerLevelText =
        fighterConfiguration.PointDefenseSystem.PowerLevel.Text;
      this.Thruster = new ThrusterModel(fighterConfiguration.Thruster);
      this.ThrusterGuid = fighterConfiguration.Thruster.ThrusterGuid;
      this.ThrusterModulePointsCost =
        fighterConfiguration.Thruster.ModulePointsCost;
      this.ThrusterMass = fighterConfiguration.Thruster.Mass;
      this.ThrusterSpecificHeatCapacity =
        fighterConfiguration.Thruster.SpecificHeatCapacity;
      this.ThrusterThrust = fighterConfiguration.Thruster.Thrust;
      this.ThrusterEfficiency = fighterConfiguration.Thruster.Efficiency;
      this.ThrusterTitle = fighterConfiguration.Thruster.Title;
      this.ThrusterDescription =
        fighterConfiguration.Thruster.Description;
      this.ThrusterSpaceshipTypeGuid =
        fighterConfiguration.Thruster.SpaceshipType.SpaceshipTypeGuid;
      this.ThrusterSpaceshipTypeText =
        fighterConfiguration.Thruster.SpaceshipType.Text;
      this.WeaponFrame = new WeaponFrameModel(
        fighterConfiguration.WeaponFrame
      );
      this.WeaponFrameGuid =
        fighterConfiguration.WeaponFrame.WeaponFrameGuid;
      this.WeaponFrameModulePointsCost =
        fighterConfiguration.WeaponFrame.ModulePointsCost;
      this.WeaponFrameMass = fighterConfiguration.WeaponFrame.Mass;
      this.WeaponFrameSpecificHeatCapacity =
        fighterConfiguration.WeaponFrame.SpecificHeatCapacity;
      this.WeaponFrameBaseMagSize =
        fighterConfiguration.WeaponFrame.BaseMagSize;
      this.WeaponFrameTargetingEfficiency =
        fighterConfiguration.WeaponFrame.TargetingEfficiency;
      this.WeaponFrameOptimalRange =
        fighterConfiguration.WeaponFrame.OptimalRange;
      this.WeaponFrameEffectiveRange =
        fighterConfiguration.WeaponFrame.EffectiveRange;
      this.WeaponFrameBaseCriticalHitChance =
        fighterConfiguration.WeaponFrame.BaseCriticalHitChance;
      this.WeaponFrameTitle = fighterConfiguration.WeaponFrame.Title;
      this.WeaponFrameDescription =
        fighterConfiguration.WeaponFrame.Description;
      this.WeaponFramePowerLevelGuid =
        fighterConfiguration.WeaponFrame.PowerLevel.PowerLevelGuid;
      this.WeaponFramePowerLevelText =
        fighterConfiguration.WeaponFrame.PowerLevel.Text;
      this.WeaponFrameWeaponFrameTypeGuid =
        fighterConfiguration.WeaponFrame.WeaponFrameType.WeaponFrameTypeGuid;
      this.WeaponFrameWeaponFrameTypeText =
        fighterConfiguration.WeaponFrame.WeaponFrameType.Text;

      // Calculated properties
      // this.ArmorHeatCapacity = this.ArmorMass * this.ArmorSpecificHeatCapacity;
      // this.ArmorCrewCost = Math.sqrt(this.FighterBaseCrewCost * (this.ArmorModulePointsCost > 0 ? 1 : 0));
      // this.FighterHeatCapacity = this.FighterHullMass * this.FighterSpecificHeatCapacity;
      // this.FuelSystemHeatCapacity = this.FuelSystemMass * this.FuelSystemSpecificHeatCapacity;
      // this.FuelSystemCrewCost = Math.sqrt(this.FighterBaseCrewCost * (this.FuelSystemModulePointsCost > 0 ? 1 : 0));
      // this.PayloadEnergyDamageBias = 1 - this.PayloadKineticDamageBias;
      // this.PayloadCrewCost = Math.sqrt(this.FighterBaseCrewCost * (this.PayloadModulePointsCost > 0 ? 1 : 0));
      // this.PointDefenseSystemHeatCapacity = this.PointDefenseSystemMass * this.PointDefenseSystemSpecificHeatCapacity;
      // this.PointDefenseSystemCrewCost = Math.sqrt(this.FighterBaseCrewCost * (this.PointDefenseSystemModulePointsCost > 0 ? 1 : 0));
      // this.ThrusterHeatCapacity = this.ThrusterMass * this.ThrusterSpecificHeatCapacity;
      // this.ThrusterCrewCost = Math.sqrt(this.FighterBaseCrewCost * (this.ThrusterModulePointsCost > 0 ? 1 : 0));
      // this.WeaponFrameHeatCapacity = this.WeaponFrameMass * this.WeaponFrameSpecificHeatCapacity;
      // this.WeaponFrameCrewCost = Math.sqrt(this.FighterBaseCrewCost * (this.WeaponFrameModulePointsCost > 0 ? 1 : 0));
      // this.TotalModulePointsUsage = this.fighterConfigurationTotalModulePointsUsage();
      // this.TotalMass = this.fighterConfigurationTotalMass();
      // this.TotalCrewCost = this.fighterConfigurationTotalCrewCost();
      // this.TotalHeatCapacity = this.fighterConfigurationTotalHeatCapacity();
      // this.Maneuverability = this.fighterConfigurationManeuverability();
      // this.FuelSystemFuelConsumptionRate = this.TotalMass / this.ThrusterEfficiency;
      this.updateCalculated();
    }
  }

  fighterConfigurationTotalModulePointsUsage = function () {
    let totalModulePointsUsed =
      (this.ArmorModulePointsCost || 0) +
      (this.FuelSystemModulePointsCost || 0) +
      (this.PointDefenseSystemModulePointsCost || 0) +
      (this.ThrusterModulePointsCost || 0) +
      (this.WeaponFrameModulePointsCost || 0) +
      (this.PayloadModulePointsCost || 0)

    if (this.FighterModulePointLimit == 0) {
      return 0;
    }
    return totalModulePointsUsed;
  };
  fighterConfigurationTotalMass = function () {
    if (this._fighterConfiguration == null) {
      return 0;
    }
    return (
      (this.FighterHullMass || 0) +
      (this.ArmorMass || 0) +
      (this.FuelSystemMass || 0) +
      (this.PointDefenseSystemMass || 0) +
      (this.ThrusterMass || 0) +
      (this.WeaponFrameMass || 0)
    );
  };
  fighterConfigurationTotalCrewCost = function () {
    if (this._fighterConfiguration == null) {
      return 0;
    }
    return Math.round(
      (this.FighterBaseCrewCost || 0) +
        (this.Armor
          ? Math.sqrt(
              this.FighterBaseCrewCost *
                (this.ArmorModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.FuelSystem
          ? Math.sqrt(
              this.FighterBaseCrewCost *
                (this.FuelSystemModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.PointDefenseSystem
          ? Math.sqrt(
              this.FighterBaseCrewCost *
                (this.PointDefenseSystemModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.Thruster
          ? Math.sqrt(
              this.FighterBaseCrewCost *
                (this.ThrusterModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.WeaponFrame
          ? Math.sqrt(
              this.FighterBaseCrewCost *
                (this.WeaponFrameModulePointsCost > 0 ? 1 : 0)
            )
          : 0)
    );
  };
  fighterConfigurationTotalHeatCapacity = function () {
    if (this._fighterConfiguration == null) {
      return 0;
    }
    return (
      (this.FighterHeatCapacity || 0) +
      (this.ArmorHeatCapacity || 0) +
      (this.FuelSystemHeatCapacity || 0) +
      (this.PointDefenseSystemHeatCapacity || 0) +
      (this.ThrusterHeatCapacity || 0) +
      (this.WeaponFrameHeatCapacity || 0)
    );
  };
  fighterConfigurationManeuverability = function () {
    if (this.TotalMass == 0) {
      return 0;
    }
    return this.ThrusterThrust / (this.TotalMass * EVASION_SCALAR);
  };
  damagePerTurn = function () {
    if (this._fighterConfiguration == null) {
      return 0;
    }
    let weapon1OptimalDPT =
      this.WeaponFrameBaseMagSize * this.PayloadBaseDamage
    return weapon1OptimalDPT;
  };

  setName = function (name) {
    this.Name = name;
  };

  setFighter = function (fighter) {
    this.Fighter = fighter;
    this.FighterGuid = this.Fighter.FighterGuid;
    this.FighterClass = this.Fighter.Class;
    this.FighterHullMass = this.Fighter.HullMass;
    this.FighterSpecificHeatCapacity =
      this.Fighter.SpecificHeatCapacity;
    this.FighterDescription = this.Fighter.Description;
    this.FighterBaseVigorCost = this.Fighter.BaseVigorCost;
    this.FighterBaseCrewCost = this.Fighter.BaseCrewCost;
    this.FighterModulePointLimit = this.Fighter.ModulePointLimit;
    this.FighterPointDefenseSystemPowerLevelGuid =
      this.Fighter.PointDefenseSystemPowerLevelGuid;
    this.FighterPointDefenseSystemPowerLevelText =
      this.Fighter.PointDefenseSystemPowerLevelText;
    this.FighterSpaceshipCategoryGuid =
      this.Fighter.SpaceshipCategoryGuid;
    this.FighterSpaceshipCategoryText =
      this.Fighter.SpaceshipCategoryText;
    this.FighterSpaceshipTypeGuid = this.Fighter.SpaceshipTypeGuid;
    this.FighterSpaceshipTypeText = this.Fighter.SpaceshipTypeText;
    this.FighterWeaponPowerLevelGuid =
      this.Fighter.WeaponPowerLevelGuid;
    this.FighterWeaponPowerLevelText =
      this.Fighter.WeaponPowerLevelText;
    this.updateCalculated("Fighter");
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
        if (this.TotalModulePointsUsage > this.FighterModulePointLimit) {
            invalid = true;
        }
        let powerLevels = {
            "Level 1": 1,
            "Level 2": 2,
            "Level 3": 3
        }
        if (powerLevels[this.PointDefenseSystemPowerLevelText] > powerLevels[this.FighterPointDefenseSystemPowerLevelText]) {
            invalid = true;
        }
        if (powerLevels[this.WeaponFramePowerLevelText] > powerLevels[this.FighterWeaponPowerLevelText]) {
            invalid = true;
        }
        if (powerLevels[this.PayloadPowerLevelText] > powerLevels[this.WeaponFramePowerLevelText]) {
            invalid = true;
        }
        if (this.WeaponFrameWeaponFrameTypeText !== this.PayloadWeaponFrameTypeText) {
            invalid = true;
        }

        return !invalid
    };



  updateCalculated = function (key = null) {
    if (key === "Armor" || key == null) {
      this.ArmorHeatCapacity = this.ArmorMass * this.ArmorSpecificHeatCapacity;
      this.ArmorCrewCost = Math.sqrt(
        this.FighterBaseCrewCost *
          (this.ArmorModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "Fighter" || key == null) {
      this.FighterHeatCapacity =
        this.FighterHullMass * this.FighterSpecificHeatCapacity;
    }
    if (key === "FuelSystem" || key == null) {
      this.FuelSystemHeatCapacity =
        this.FuelSystemMass * this.FuelSystemSpecificHeatCapacity;
      this.FuelSystemCrewCost = Math.sqrt(
        this.FighterBaseCrewCost *
          (this.FuelSystemModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "Payload" || key == null) {
      this.PayloadEnergyDamageBias = 1 - this.PayloadKineticDamageBias;
      this.PayloadCrewCost = Math.sqrt(
        this.FighterBaseCrewCost *
          (this.PayloadModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "PointDefenseSystem" || key == null) {
      this.PointDefenseSystemHeatCapacity =
        this.PointDefenseSystemMass *
        this.PointDefenseSystemSpecificHeatCapacity;
      this.PointDefenseSystemCrewCost = Math.sqrt(
        this.FighterBaseCrewCost *
          (this.PointDefenseSystemModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "Thruster" || key == null) {
      this.ThrusterHeatCapacity =
        this.ThrusterMass * this.ThrusterSpecificHeatCapacity;
      this.ThrusterCrewCost = Math.sqrt(
        this.FighterBaseCrewCost *
          (this.ThrusterModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "WeaponFrame" || key == null) {
      this.WeaponFrameHeatCapacity =
        this.WeaponFrameMass * this.WeaponFrameSpecificHeatCapacity;
      this.WeaponFrameCrewCost = Math.sqrt(
        this.FighterBaseCrewCost *
          (this.WeaponFrameModulePointsCost > 0 ? 1 : 0)
      );
    }

    this.TotalModulePointsUsage =
      this.fighterConfigurationTotalModulePointsUsage();
    this.TotalMass = this.fighterConfigurationTotalMass();
    this.TotalCrewCost = this.fighterConfigurationTotalCrewCost();
    this.TotalHeatCapacity = this.fighterConfigurationTotalHeatCapacity();
    this.Maneuverability = this.fighterConfigurationManeuverability();
    this.FuelSystemFuelConsumptionRate =
      this.TotalMass / this.ThrusterEfficiency;
  };
}
