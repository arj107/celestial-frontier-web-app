import { BattlecruiserModel } from "../Battlecruiser/BattlecruiserModel";
import { ArmorModel } from "../Armor/ArmorModel";
import { PointDefenseSystemModel } from "../PointDefenseSystem/PointDefenseSystemModel";
import { FuelSystemModel } from "../FuelSystem/FuelSystemModel";
import { ThrusterModel } from "../Thruster/ThrusterModel";
import { WeaponFrameModel } from "../WeaponFrame/WeaponFrameModel";
import { PayloadModel } from "../Payload/PayloadModel";

export class BattlecruiserConfigurationModel {
  // the original object consumed directly from the API
  _battlecruiserConfiguration;

  // Flattening all of the configuration's nested objects into a single level deep
  // for searching, filtering, sorting, and comparisons throughout the app
  BattlecruiserConfigurationGuid;
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
  Battlecruiser;
  BattlecruiserGuid;
  BattlecruiserClass;
  BattlecruiserHullMass;
  BattlecruiserSpecificHeatCapacity;
  BattlecruiserDescription;
  BattlecruiserBaseCrewCost;
  BattlecruiserModulePointLimit;
  BattlecruiserPointDefenseSystemPowerLevelGuid;
  BattlecruiserPointDefenseSystemPowerLevelText;
  BattlecruiserSpaceshipCategoryGuid;
  BattlecruiserSpaceshipCategoryText;
  BattlecruiserSpaceshipTypeGuid;
  BattlecruiserSpaceshipTypeText;
  BattlecruiserWeaponPowerLevelGuid;
  BattlecruiserWeaponPowerLevelText;
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
  Payload1;
  Payload1Guid;
  Payload1ModulePointsCost;
  Payload1Velocity;
  Payload1KineticDamageBias;
  Payload1EnergyDamageBias;
  Payload1CounterSusceptibility;
  Payload1BaseDamage;
  Payload1BaseCriticalHitMultiplier;
  Payload1Title;
  Payload1Description;
  Payload1PayloadTypeGuid;
  Payload1PayloadTypeText;
  Payload1PowerLevelGuid;
  Payload1PowerLevelText;
  Payload1WeaponFrameTypeGuid;
  Payload1WeaponFrameTypeText;
  Payload2;
  Payload2Guid;
  Payload2ModulePointsCost;
  Payload2Velocity;
  Payload2KineticDamageBias;
  Payload2EnergyDamageBias;
  Payload2CounterSusceptibility;
  Payload2BaseDamage;
  Payload2BaseCriticalHitMultiplier;
  Payload2Title;
  Payload2Description;
  Payload2PayloadTypeGuid;
  Payload2PayloadTypeText;
  Payload2PowerLevelGuid;
  Payload2PowerLevelText;
  Payload2WeaponFrameTypeGuid;
  Payload2WeaponFrameTypeText;
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
  WeaponFrame1;
  WeaponFrame1Guid;
  WeaponFrame1ModulePointsCost;
  WeaponFrame1Mass;
  WeaponFrame1SpecificHeatCapacity;
  WeaponFrame1BaseMagSize;
  WeaponFrame1TargetingEfficiency;
  WeaponFrame1OptimalRange;
  WeaponFrame1EffectiveRange;
  WeaponFrame1BaseCriticalHitChance;
  WeaponFrame1Title;
  WeaponFrame1Description;
  WeaponFrame1PowerLevelGuid;
  WeaponFrame1PowerLevelText;
  WeaponFrame1WeaponFrameTypeGuid;
  WeaponFrame1WeaponFrameTypeText;
  WeaponFrame2;
  WeaponFrame2Guid;
  WeaponFrame2ModulePointsCost;
  WeaponFrame2Mass;
  WeaponFrame2SpecificHeatCapacity;
  WeaponFrame2BaseMagSize;
  WeaponFrame2TargetingEfficiency;
  WeaponFrame2OptimalRange;
  WeaponFrame2EffectiveRange;
  WeaponFrame2BaseCriticalHitChance;
  WeaponFrame2Title;
  WeaponFrame2Description;
  WeaponFrame2PowerLevelGuid;
  WeaponFrame2PowerLevelText;
  WeaponFrame2WeaponFrameTypeGuid;
  WeaponFrame2WeaponFrameTypeText;

  // Calculated properites that do not exist in the database
  // These require properties above to be set before their calculation
  ArmorHeatCapacity;
  ArmorCrewCost;
  BattlecruiserHeatCapacity;
  FuelSystemHeatCapacity;
  FuelSystemFuelConsumptionRate;
  FuelSystemCrewCost;
  Payload1CrewCost;
  Payload2CrewCost;
  PointDefenseSystemHeatCapacity;
  PointDefenseSystemCrewCost;
  ThrusterHeatCapacity;
  ThrusterCrewCost;
  WeaponFrame1HeatCapacity;
  WeaponFrame1CrewCost;
  WeaponFrame2HeatCapacity;
  WeaponFrame2CrewCost;
  TotalModulePointsUsage;
  TotalMass;
  TotalCrewCost;
  TotalHeatCapacity;
  Maneuverability;

  // Accepts a BattlecruiserConfiguration object directly from the API
  constructor(battlecruiserConfiguration) {
    if (battlecruiserConfiguration) {
      this._battlecruiserConfiguration = battlecruiserConfiguration;
      this.BattlecruiserConfigurationGuid =
        battlecruiserConfiguration.BattlecruiserConfigurationGuid;
      this.Name = battlecruiserConfiguration.Name;
      this.Armor = new ArmorModel(battlecruiserConfiguration.Armor);
      this.ArmorGuid = battlecruiserConfiguration.Armor.ArmorGuid;
      this.ArmorModulePointsCost =
        battlecruiserConfiguration.Armor.ModulePointsCost;
      this.ArmorMass = battlecruiserConfiguration.Armor.Mass;
      this.ArmorSpecificHeatCapacity =
        battlecruiserConfiguration.Armor.SpecificHeatCapacity;
      this.ArmorKineticResistance =
        battlecruiserConfiguration.Armor.KineticResistance;
      this.ArmorEnergyResistance =
        battlecruiserConfiguration.Armor.EnergyResistance;
      this.ArmorTitle = battlecruiserConfiguration.Armor.Title;
      this.ArmorDescription = battlecruiserConfiguration.Armor.Description;
      this.ArmorSpaceshipTypeGuid =
        battlecruiserConfiguration.Armor.SpaceshipType.SpaceshipTypeGuid;
      this.ArmorSpaceshipTypeText =
        battlecruiserConfiguration.Armor.SpaceshipType.Text;
      this.Battlecruiser = new BattlecruiserModel(
        battlecruiserConfiguration.Battlecruiser
      );
      this.BattlecruiserGuid =
        battlecruiserConfiguration.Battlecruiser.BattlecruiserGuid;
      this.BattlecruiserClass = battlecruiserConfiguration.Battlecruiser.Class;
      this.BattlecruiserHullMass =
        battlecruiserConfiguration.Battlecruiser.HullMass;
      this.BattlecruiserSpecificHeatCapacity =
        battlecruiserConfiguration.Battlecruiser.SpecificHeatCapacity;
      this.BattlecruiserDescription =
        battlecruiserConfiguration.Battlecruiser.Description;
      this.BattlecruiserBaseCrewCost =
        battlecruiserConfiguration.Battlecruiser.BaseCrewCost;
      this.BattlecruiserModulePointLimit =
        battlecruiserConfiguration.Battlecruiser.ModulePointLimit;
      this.BattlecruiserPointDefenseSystemPowerLevelGuid =
        battlecruiserConfiguration.Battlecruiser.PointDefenseSystemPowerLevel.PowerLevelGuid;
      this.BattlecruiserPointDefenseSystemPowerLevelText =
        battlecruiserConfiguration.Battlecruiser.PointDefenseSystemPowerLevel.Text;
      this.BattlecruiserSpaceshipCategoryGuid =
        battlecruiserConfiguration.Battlecruiser.SpaceshipCategory.SpaceshipCategoryGuid;
      this.BattlecruiserSpaceshipCategoryText =
        battlecruiserConfiguration.Battlecruiser.SpaceshipCategory.Text;
      this.BattlecruiserSpaceshipTypeGuid =
        battlecruiserConfiguration.Battlecruiser.SpaceshipType.SpaceshipTypeGuid;
      this.BattlecruiserSpaceshipTypeText =
        battlecruiserConfiguration.Battlecruiser.SpaceshipType.Text;
      this.BattlecruiserWeaponPowerLevelGuid =
        battlecruiserConfiguration.Battlecruiser.WeaponPowerLevel.PowerLevelGuid;
      this.BattlecruiserWeaponPowerLevelText =
        battlecruiserConfiguration.Battlecruiser.WeaponPowerLevel.Text;
      this.User = battlecruiserConfiguration.User;
      this.UserGuid = battlecruiserConfiguration.User.UserGuid;
      this.Username = battlecruiserConfiguration.User.Username;
      this.FuelSystem = new FuelSystemModel(
        battlecruiserConfiguration.FuelSystem
      );
      this.FuelSystemGuid =
        battlecruiserConfiguration.FuelSystem.FuelSystemGuid;
      this.FuelSystemMass = battlecruiserConfiguration.FuelSystem.Mass;
      this.FuelSystemModulePointsCost =
        battlecruiserConfiguration.FuelSystem.ModulePointsCost;
      this.FuelSystemSpecificHeatCapacity =
        battlecruiserConfiguration.FuelSystem.SpecificHeatCapacity;
      this.FuelSystemFuelCapacity =
        battlecruiserConfiguration.FuelSystem.FuelCapacity;
      this.FuelSystemFuelRegenerationRate =
        battlecruiserConfiguration.FuelSystem.FuelRegenerationRate;
      this.FuelSystemTitle = battlecruiserConfiguration.FuelSystem.Title;
      this.FuelSystemDescription =
        battlecruiserConfiguration.FuelSystem.Description;
      this.FuelSystemSpaceshipTypeGuid =
        battlecruiserConfiguration.FuelSystem.SpaceshipType.SpaceshipTypeGuid;
      this.FuelSystemSpaceshipTypeText =
        battlecruiserConfiguration.FuelSystem.SpaceshipType.Text;
      this.Payload1 = new PayloadModel(battlecruiserConfiguration.Payload1);
      this.Payload1Guid = battlecruiserConfiguration.Payload1.PayloadGuid;
      this.Payload1ModulePointsCost =
        battlecruiserConfiguration.Payload1.ModulePointsCost;
      this.Payload1Velocity = battlecruiserConfiguration.Payload1.Velocity;
      this.Payload1KineticDamageBias =
        battlecruiserConfiguration.Payload1.KineticDamageBias;
      this.Payload1CounterSusceptibility =
        battlecruiserConfiguration.Payload1.CounterSusceptibility;
      this.Payload1BaseDamage = battlecruiserConfiguration.Payload1.BaseDamage;
      this.Payload1BaseCriticalHitMultiplier =
        battlecruiserConfiguration.Payload1.BaseCriticalHitMultiplier;
      this.Payload1Title = battlecruiserConfiguration.Payload1.Title;
      this.Payload1Description =
        battlecruiserConfiguration.Payload1.Description;
      this.Payload1PayloadTypeGuid =
        battlecruiserConfiguration.Payload1.PayloadType.PayloadTypeGuid;
      this.Payload1PayloadTypeText =
        battlecruiserConfiguration.Payload1.PayloadType.Text;
      this.Payload1PowerLevelGuid =
        battlecruiserConfiguration.Payload1.PowerLevel.PowerLevelGuid;
      this.Payload1PowerLevelText =
        battlecruiserConfiguration.Payload1.PowerLevel.Text;
      this.Payload1WeaponFrameTypeGuid =
        battlecruiserConfiguration.Payload1.WeaponFrameType.WeaponFrameTypeGuid;
      this.Payload1WeaponFrameTypeText =
        battlecruiserConfiguration.Payload1.WeaponFrameType.Text;
      this.Payload2 = new PayloadModel(battlecruiserConfiguration.Payload2);
      this.Payload2Guid = battlecruiserConfiguration.Payload2.PayloadGuid;
      this.Payload2ModulePointsCost =
        battlecruiserConfiguration.Payload2.ModulePointsCost;
      this.Payload2Velocity = battlecruiserConfiguration.Payload2.Velocity;
      this.Payload2KineticDamageBias =
        battlecruiserConfiguration.Payload2.KineticDamageBias;
      this.Payload2CounterSusceptibility =
        battlecruiserConfiguration.Payload2.CounterSusceptibility;
      this.Payload2BaseDamage = battlecruiserConfiguration.Payload2.BaseDamage;
      this.Payload2BaseCriticalHitMultiplier =
        battlecruiserConfiguration.Payload2.BaseCriticalHitMultiplier;
      this.Payload2Title = battlecruiserConfiguration.Payload2.Title;
      this.Payload2Description =
        battlecruiserConfiguration.Payload2.Description;
      this.Payload2PayloadTypeGuid =
        battlecruiserConfiguration.Payload2.PayloadType.PayloadTypeGuid;
      this.Payload2PayloadTypeText =
        battlecruiserConfiguration.Payload2.PayloadType.Text;
      this.Payload2PowerLevelGuid =
        battlecruiserConfiguration.Payload2.PowerLevel.PowerLevelGuid;
      this.Payload2PowerLevelText =
        battlecruiserConfiguration.Payload2.PowerLevel.Text;
      this.Payload2WeaponFrameTypeGuid =
        battlecruiserConfiguration.Payload2.WeaponFrameType.WeaponFrameTypeGuid;
      this.Payload2WeaponFrameTypeText =
        battlecruiserConfiguration.Payload2.WeaponFrameType.Text;
      this.PointDefenseSystem = new PointDefenseSystemModel(
        battlecruiserConfiguration.PointDefenseSystem
      );
      this.PointDefenseSystemGuid =
        battlecruiserConfiguration.PointDefenseSystem.PointDefenseSystemGuid;
      this.PointDefenseSystemModulePointsCost =
        battlecruiserConfiguration.PointDefenseSystem.ModulePointsCost;
      this.PointDefenseSystemMass =
        battlecruiserConfiguration.PointDefenseSystem.Mass;
      this.PointDefenseSystemSpecificHeatCapacity =
        battlecruiserConfiguration.PointDefenseSystem.SpecificHeatCapacity;
      this.PointDefenseSystemCountermeasureCapacity =
        battlecruiserConfiguration.PointDefenseSystem.CountermeasureCapacity;
      this.PointDefenseSystemCountermeasureRegenerationRate =
        battlecruiserConfiguration.PointDefenseSystem.CountermeasureRegenerationRate;
      this.PointDefenseSystemEfficiency =
        battlecruiserConfiguration.PointDefenseSystem.Efficiency;
      this.PointDefenseSystemTitle =
        battlecruiserConfiguration.PointDefenseSystem.Title;
      this.PointDefenseSystemDescription =
        battlecruiserConfiguration.PointDefenseSystem.Description;
      this.PointDefenseSystemPowerLevelGuid =
        battlecruiserConfiguration.PointDefenseSystem.PowerLevel.PowerLevelGuid;
      this.PointDefenseSystemPowerLevelText =
        battlecruiserConfiguration.PointDefenseSystem.PowerLevel.Text;
      this.Thruster = new ThrusterModel(battlecruiserConfiguration.Thruster);
      this.ThrusterGuid = battlecruiserConfiguration.Thruster.ThrusterGuid;
      this.ThrusterModulePointsCost =
        battlecruiserConfiguration.Thruster.ModulePointsCost;
      this.ThrusterMass = battlecruiserConfiguration.Thruster.Mass;
      this.ThrusterSpecificHeatCapacity =
        battlecruiserConfiguration.Thruster.SpecificHeatCapacity;
      this.ThrusterThrust = battlecruiserConfiguration.Thruster.Thrust;
      this.ThrusterEfficiency = battlecruiserConfiguration.Thruster.Efficiency;
      this.ThrusterTitle = battlecruiserConfiguration.Thruster.Title;
      this.ThrusterDescription =
        battlecruiserConfiguration.Thruster.Description;
      this.ThrusterSpaceshipTypeGuid =
        battlecruiserConfiguration.Thruster.SpaceshipType.SpaceshipTypeGuid;
      this.ThrusterSpaceshipTypeText =
        battlecruiserConfiguration.Thruster.SpaceshipType.Text;
      this.WeaponFrame1 = new WeaponFrameModel(
        battlecruiserConfiguration.WeaponFrame1
      );
      this.WeaponFrame1Guid =
        battlecruiserConfiguration.WeaponFrame1.WeaponFrameGuid;
      this.WeaponFrame1ModulePointsCost =
        battlecruiserConfiguration.WeaponFrame1.ModulePointsCost;
      this.WeaponFrame1Mass = battlecruiserConfiguration.WeaponFrame1.Mass;
      this.WeaponFrame1SpecificHeatCapacity =
        battlecruiserConfiguration.WeaponFrame1.SpecificHeatCapacity;
      this.WeaponFrame1BaseMagSize =
        battlecruiserConfiguration.WeaponFrame1.BaseMagSize;
      this.WeaponFrame1TargetingEfficiency =
        battlecruiserConfiguration.WeaponFrame1.TargetingEfficiency;
      this.WeaponFrame1OptimalRange =
        battlecruiserConfiguration.WeaponFrame1.OptimalRange;
      this.WeaponFrame1EffectiveRange =
        battlecruiserConfiguration.WeaponFrame1.EffectiveRange;
      this.WeaponFrame1BaseCriticalHitChance =
        battlecruiserConfiguration.WeaponFrame1.BaseCriticalHitChance;
      this.WeaponFrame1Title = battlecruiserConfiguration.WeaponFrame1.Title;
      this.WeaponFrame1Description =
        battlecruiserConfiguration.WeaponFrame1.Description;
      this.WeaponFrame1PowerLevelGuid =
        battlecruiserConfiguration.WeaponFrame1.PowerLevel.PowerLevelGuid;
      this.WeaponFrame1PowerLevelText =
        battlecruiserConfiguration.WeaponFrame1.PowerLevel.Text;
      this.WeaponFrame1WeaponFrameTypeGuid =
        battlecruiserConfiguration.WeaponFrame1.WeaponFrameType.WeaponFrameTypeGuid;
      this.WeaponFrame1WeaponFrameTypeText =
        battlecruiserConfiguration.WeaponFrame1.WeaponFrameType.Text;
      this.WeaponFrame2 = new WeaponFrameModel(
        battlecruiserConfiguration.WeaponFrame2
      );
      this.WeaponFrame2Guid =
        battlecruiserConfiguration.WeaponFrame2.WeaponFrameGuid;
      this.WeaponFrame2ModulePointsCost =
        battlecruiserConfiguration.WeaponFrame2.ModulePointsCost;
      this.WeaponFrame2Mass = battlecruiserConfiguration.WeaponFrame2.Mass;
      this.WeaponFrame2SpecificHeatCapacity =
        battlecruiserConfiguration.WeaponFrame2.SpecificHeatCapacity;
      this.WeaponFrame2BaseMagSize =
        battlecruiserConfiguration.WeaponFrame2.BaseMagSize;
      this.WeaponFrame2TargetingEfficiency =
        battlecruiserConfiguration.WeaponFrame2.TargetingEfficiency;
      this.WeaponFrame2OptimalRange =
        battlecruiserConfiguration.WeaponFrame2.OptimalRange;
      this.WeaponFrame2EffectiveRange =
        battlecruiserConfiguration.WeaponFrame2.EffectiveRange;
      this.WeaponFrame2BaseCriticalHitChance =
        battlecruiserConfiguration.WeaponFrame2.BaseCriticalHitChance;
      this.WeaponFrame2Title = battlecruiserConfiguration.WeaponFrame2.Title;
      this.WeaponFrame2Description =
        battlecruiserConfiguration.WeaponFrame2.Description;
      this.WeaponFrame2PowerLevelGuid =
        battlecruiserConfiguration.WeaponFrame2.PowerLevel.PowerLevelGuid;
      this.WeaponFrame2PowerLevelText =
        battlecruiserConfiguration.WeaponFrame2.PowerLevel.Text;
      this.WeaponFrame2WeaponFrameTypeGuid =
        battlecruiserConfiguration.WeaponFrame2.WeaponFrameType.WeaponFrameTypeGuid;
      this.WeaponFrame2WeaponFrameTypeText =
        battlecruiserConfiguration.WeaponFrame2.WeaponFrameType.Text;

      // Calculated properties
      // this.ArmorHeatCapacity = this.ArmorMass * this.ArmorSpecificHeatCapacity;
      // this.ArmorCrewCost = Math.sqrt(this.BattlecruiserBaseCrewCost * (this.ArmorModulePointsCost > 0 ? 1 : 0));
      // this.BattlecruiserHeatCapacity = this.BattlecruiserHullMass * this.BattlecruiserSpecificHeatCapacity;
      // this.FuelSystemHeatCapacity = this.FuelSystemMass * this.FuelSystemSpecificHeatCapacity;
      // this.FuelSystemCrewCost = Math.sqrt(this.BattlecruiserBaseCrewCost * (this.FuelSystemModulePointsCost > 0 ? 1 : 0));
      // this.Payload1EnergyDamageBias = 1 - this.Payload1KineticDamageBias;
      // this.Payload1CrewCost = Math.sqrt(this.BattlecruiserBaseCrewCost * (this.Payload1ModulePointsCost > 0 ? 1 : 0));
      // this.Payload2EnergyDamageBias = 1 - this.Payload2KineticDamageBias;
      // this.Payload2CrewCost = Math.sqrt(this.BattlecruiserBaseCrewCost * (this.Payload2ModulePointsCost > 0 ? 1 : 0));
      // this.PointDefenseSystemHeatCapacity = this.PointDefenseSystemMass * this.PointDefenseSystemSpecificHeatCapacity;
      // this.PointDefenseSystemCrewCost = Math.sqrt(this.BattlecruiserBaseCrewCost * (this.PointDefenseSystemModulePointsCost > 0 ? 1 : 0));
      // this.ThrusterHeatCapacity = this.ThrusterMass * this.ThrusterSpecificHeatCapacity;
      // this.ThrusterCrewCost = Math.sqrt(this.BattlecruiserBaseCrewCost * (this.ThrusterModulePointsCost > 0 ? 1 : 0));
      // this.WeaponFrame1HeatCapacity = this.WeaponFrame1Mass * this.WeaponFrame1SpecificHeatCapacity;
      // this.WeaponFrame1CrewCost = Math.sqrt(this.BattlecruiserBaseCrewCost * (this.WeaponFrame1ModulePointsCost > 0 ? 1 : 0));
      // this.WeaponFrame2HeatCapacity = this.WeaponFrame2Mass * this.WeaponFrame2SpecificHeatCapacity;
      // this.WeaponFrame2CrewCost = Math.sqrt(this.BattlecruiserBaseCrewCost * (this.WeaponFrame2ModulePointsCost > 0 ? 1 : 0));
      // this.TotalModulePointsUsage = this.battlecruiserConfigurationTotalModulePointsUsage();
      // this.TotalMass = this.battlecruiserConfigurationTotalMass();
      // this.TotalCrewCost = this.battlecruiserConfigurationTotalCrewCost();
      // this.TotalHeatCapacity = this.battlecruiserConfigurationTotalHeatCapacity();
      // this.Maneuverability = this.battlecruiserConfigurationManeuverability();
      // this.FuelSystemFuelConsumptionRate = this.TotalMass / this.ThrusterEfficiency;
      this.updateCalculated();
    }
  }

  battlecruiserConfigurationTotalModulePointsUsage = function () {
    let totalModulePointsUsed =
      (this.ArmorModulePointsCost || 0) +
      (this.FuelSystemModulePointsCost || 0) +
      (this.PointDefenseSystemModulePointsCost || 0) +
      (this.ThrusterModulePointsCost || 0) +
      (this.WeaponFrame1ModulePointsCost || 0) +
      (this.Payload1ModulePointsCost || 0) +
      (this.WeaponFrame2ModulePointsCost || 0) +
      (this.Payload2ModulePointsCost || 0);

    if (this.BattlecruiserModulePointLimit == 0) {
      return 0;
    }
    return totalModulePointsUsed;
  };
  battlecruiserConfigurationTotalMass = function () {
    if (this._battlecruiserConfiguration == null) {
      return 0;
    }
    return (
      (this.BattlecruiserHullMass || 0) +
      (this.ArmorMass || 0) +
      (this.FuelSystemMass || 0) +
      (this.PointDefenseSystemMass || 0) +
      (this.ThrusterMass || 0) +
      (this.WeaponFrame1Mass || 0) +
      (this.WeaponFrame2Mass || 0)
    );
  };
  battlecruiserConfigurationTotalCrewCost = function () {
    if (this._battlecruiserConfiguration == null) {
      return 0;
    }
    return Math.round(
      (this.BattlecruiserBaseCrewCost || 0) +
        (this.Armor
          ? Math.sqrt(
              this.BattlecruiserBaseCrewCost *
                (this.ArmorModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.FuelSystem
          ? Math.sqrt(
              this.BattlecruiserBaseCrewCost *
                (this.FuelSystemModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.PointDefenseSystem
          ? Math.sqrt(
              this.BattlecruiserBaseCrewCost *
                (this.PointDefenseSystemModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.Thruster
          ? Math.sqrt(
              this.BattlecruiserBaseCrewCost *
                (this.ThrusterModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.WeaponFrame1
          ? Math.sqrt(
              this.BattlecruiserBaseCrewCost *
                (this.WeaponFrame1ModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.WeaponFrame2
          ? Math.sqrt(
              this.BattlecruiserBaseCrewCost *
                (this.WeaponFrame2ModulePointsCost > 0 ? 1 : 0)
            )
          : 0)
    );
  };
  battlecruiserConfigurationTotalHeatCapacity = function () {
    if (this._battlecruiserConfiguration == null) {
      return 0;
    }
    return (
      (this.BattlecruiserHeatCapacity || 0) +
      (this.ArmorHeatCapacity || 0) +
      (this.FuelSystemHeatCapacity || 0) +
      (this.PointDefenseSystemHeatCapacity || 0) +
      (this.ThrusterHeatCapacity || 0) +
      (this.WeaponFrame1HeatCapacity || 0) +
      (this.WeaponFrame2HeatCapacity || 0)
    );
  };
  battlecruiserConfigurationManeuverability = function () {
    if (this.TotalMass == 0) {
      return 0;
    }
    return this.ThrusterThrust / this.TotalMass;
  };
  damagePerTurn = function () {
    if (this._battlecruiserConfiguration == null) {
      return 0;
    }
    let weapon1OptimalDPT =
      this.WeaponFrame1BaseMagSize * this.Payload1BaseDamage +
      this.WeaponFrame2BaseMagSize * this.Payload2BaseDamage;
    return weapon1OptimalDPT;
  };

  setName = function (name) {
    this.Name = name;
  };

  setBattlecruiser = function (battlecruiser) {
    this.Battlecruiser = battlecruiser;
    this.BattlecruiserGuid = this.Battlecruiser.BattlecruiserGuid;
    this.BattlecruiserClass = this.Battlecruiser.Class;
    this.BattlecruiserHullMass = this.Battlecruiser.HullMass;
    this.BattlecruiserSpecificHeatCapacity =
      this.Battlecruiser.SpecificHeatCapacity;
    this.BattlecruiserDescription = this.Battlecruiser.Description;
    this.BattlecruiserBaseCrewCost = this.Battlecruiser.BaseCrewCost;
    this.BattlecruiserModulePointLimit = this.Battlecruiser.ModulePointLimit;
    this.BattlecruiserPointDefenseSystemPowerLevelGuid =
      this.Battlecruiser.PointDefenseSystemPowerLevelGuid;
    this.BattlecruiserPointDefenseSystemPowerLevelText =
      this.Battlecruiser.PointDefenseSystemPowerLevelText;
    this.BattlecruiserSpaceshipCategoryGuid =
      this.Battlecruiser.SpaceshipCategoryGuid;
    this.BattlecruiserSpaceshipCategoryText =
      this.Battlecruiser.SpaceshipCategoryText;
    this.BattlecruiserSpaceshipTypeGuid = this.Battlecruiser.SpaceshipTypeGuid;
    this.BattlecruiserSpaceshipTypeText = this.Battlecruiser.SpaceshipTypeText;
    this.BattlecruiserWeaponPowerLevelGuid =
      this.Battlecruiser.WeaponPowerLevelGuid;
    this.BattlecruiserWeaponPowerLevelText =
      this.Battlecruiser.WeaponPowerLevelText;
    this.updateCalculated("Battlecruiser");
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

  setWeaponFrame1 = function (weaponFrame) {
    this.WeaponFrame1 = weaponFrame;
    this.WeaponFrame1Guid = this.WeaponFrame1.WeaponFrameGuid;
    this.WeaponFrame1ModulePointsCost = this.WeaponFrame1.ModulePointsCost;
    this.WeaponFrame1Mass = this.WeaponFrame1.Mass;
    this.WeaponFrame1SpecificHeatCapacity =
      this.WeaponFrame1.SpecificHeatCapacity;
    this.WeaponFrame1BaseMagSize = this.WeaponFrame1.BaseMagSize;
    this.WeaponFrame1TargetingEfficiency =
      this.WeaponFrame1.TargetingEfficiency;
    this.WeaponFrame1OptimalRange = this.WeaponFrame1.OptimalRange;
    this.WeaponFrame1EffectiveRange = this.WeaponFrame1.EffectiveRange;
    this.WeaponFrame1BaseCriticalHitChance =
      this.WeaponFrame1.BaseCriticalHitChance;
    this.WeaponFrame1Title = this.WeaponFrame1.Title;
    this.WeaponFrame1Description = this.WeaponFrame1.Description;
    this.WeaponFrame1PowerLevelGuid = this.WeaponFrame1.PowerLevelGuid;
    this.WeaponFrame1PowerLevelText = this.WeaponFrame1.PowerLevelText;
    this.WeaponFrame1WeaponFrameTypeGuid =
      this.WeaponFrame1.WeaponFrameTypeGuid;
    this.WeaponFrame1WeaponFrameTypeText =
      this.WeaponFrame1.WeaponFrameTypeText;
    this.updateCalculated("WeaponFrame1");
  };

  setPayload1 = function (weaponFrame) {
    this.Payload1 = weaponFrame;
    this.Payload1Guid = this.Payload1.PayloadGuid;
    this.Payload1ModulePointsCost = this.Payload1.ModulePointsCost;
    this.Payload1Velocity = this.Payload1.Velocity;
    this.Payload1KineticDamageBias = this.Payload1.KineticDamageBias;
    this.Payload1CounterSusceptibility = this.Payload1.CounterSusceptibility;
    this.Payload1BaseDamage = this.Payload1.BaseDamage;
    this.Payload1BaseCriticalHitMultiplier =
      this.Payload1.BaseCriticalHitMultiplier;
    this.Payload1Title = this.Payload1.Title;
    this.Payload1Description = this.Payload1.Description;
    this.Payload1PayloadTypeGuid = this.Payload1.PayloadTypeGuid;
    this.Payload1PayloadTypeText = this.Payload1.PayloadTypeText;
    this.Payload1PowerLevelGuid = this.Payload1.PowerLevelGuid;
    this.Payload1PowerLevelText = this.Payload1.PowerLevelText;
    this.Payload1WeaponFrameTypeGuid = this.Payload1.WeaponFrameTypeGuid;
    this.Payload1WeaponFrameTypeText = this.Payload1.WeaponFrameTypeText;
    this.updateCalculated("Payload1");
  };

  setWeaponFrame2 = function (weaponFrame) {
    this.WeaponFrame2 = weaponFrame;
    this.WeaponFrame2Guid = this.WeaponFrame2.WeaponFrameGuid;
    this.WeaponFrame2ModulePointsCost = this.WeaponFrame2.ModulePointsCost;
    this.WeaponFrame2Mass = this.WeaponFrame2.Mass;
    this.WeaponFrame2SpecificHeatCapacity =
      this.WeaponFrame2.SpecificHeatCapacity;
    this.WeaponFrame2BaseMagSize = this.WeaponFrame2.BaseMagSize;
    this.WeaponFrame2TargetingEfficiency =
      this.WeaponFrame2.TargetingEfficiency;
    this.WeaponFrame2OptimalRange = this.WeaponFrame2.OptimalRange;
    this.WeaponFrame2EffectiveRange = this.WeaponFrame2.EffectiveRange;
    this.WeaponFrame2BaseCriticalHitChance =
      this.WeaponFrame2.BaseCriticalHitChance;
    this.WeaponFrame2Title = this.WeaponFrame2.Title;
    this.WeaponFrame2Description = this.WeaponFrame2.Description;
    this.WeaponFrame2PowerLevelGuid = this.WeaponFrame2.PowerLevelGuid;
    this.WeaponFrame2PowerLevelText = this.WeaponFrame2.PowerLevelText;
    this.WeaponFrame2WeaponFrameTypeGuid =
      this.WeaponFrame2.WeaponFrameTypeGuid;
    this.WeaponFrame2WeaponFrameTypeText =
      this.WeaponFrame2.WeaponFrameTypeText;
    this.updateCalculated("WeaponFrame2");
  };

  setPayload2 = function (weaponFrame) {
    this.Payload2 = weaponFrame;
    this.Payload2Guid = this.Payload2.PayloadGuid;
    this.Payload2ModulePointsCost = this.Payload2.ModulePointsCost;
    this.Payload2Velocity = this.Payload2.Velocity;
    this.Payload2KineticDamageBias = this.Payload2.KineticDamageBias;
    this.Payload2CounterSusceptibility = this.Payload2.CounterSusceptibility;
    this.Payload2BaseDamage = this.Payload2.BaseDamage;
    this.Payload2BaseCriticalHitMultiplier =
      this.Payload2.BaseCriticalHitMultiplier;
    this.Payload2Title = this.Payload2.Title;
    this.Payload2Description = this.Payload2.Description;
    this.Payload2PayloadTypeGuid = this.Payload2.PayloadTypeGuid;
    this.Payload2PayloadTypeText = this.Payload2.PayloadTypeText;
    this.Payload2PowerLevelGuid = this.Payload2.PowerLevelGuid;
    this.Payload2PowerLevelText = this.Payload2.PowerLevelText;
    this.Payload2WeaponFrameTypeGuid = this.Payload2.WeaponFrameTypeGuid;
    this.Payload2WeaponFrameTypeText = this.Payload2.WeaponFrameTypeText;
    this.updateCalculated("Payload2");
  };


    isValid = function() {
        let invalid = false;
        if (this.TotalModulePointsUsage > this.BattlecruiserModulePointLimit) {
            invalid = true;
        }
        let powerLevels = {
            "Level 1": 1,
            "Level 2": 2,
            "Level 3": 3
        }
        if (powerLevels[this.PointDefenseSystemPowerLevelText] > powerLevels[this.BattlecruiserPointDefenseSystemPowerLevelText]) {
            invalid = true;
        }
        if (powerLevels[this.WeaponFrame1PowerLevelText] > powerLevels[this.BattlecruiserPointDefenseSystemPowerLevelText]) {
            invalid = true;
        }
        if (powerLevels[this.WeaponFrame2PowerLevelText] > powerLevels[this.BattlecruiserPointDefenseSystemPowerLevelText]) {
            invalid = true;
        }
        if (powerLevels[this.Payload1PowerLevelText] > powerLevels[this.WeaponFrame1PowerLevelText]) {
            invalid = true;
        }
        if (powerLevels[this.Payload2PowerLevelText] > powerLevels[this.WeaponFrame2PowerLevelText]) {
            invalid = true;
        }

        return !invalid
    };



  updateCalculated = function (key = null) {
    if (key === "Armor" || key == null) {
      this.ArmorHeatCapacity = this.ArmorMass * this.ArmorSpecificHeatCapacity;
      this.ArmorCrewCost = Math.sqrt(
        this.BattlecruiserBaseCrewCost *
          (this.ArmorModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "Battlecruiser" || key == null) {
      this.BattlecruiserHeatCapacity =
        this.BattlecruiserHullMass * this.BattlecruiserSpecificHeatCapacity;
    }
    if (key === "FuelSystem" || key == null) {
      this.FuelSystemHeatCapacity =
        this.FuelSystemMass * this.FuelSystemSpecificHeatCapacity;
      this.FuelSystemCrewCost = Math.sqrt(
        this.BattlecruiserBaseCrewCost *
          (this.FuelSystemModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "Payload1" || key == null) {
      this.Payload1EnergyDamageBias = 1 - this.Payload1KineticDamageBias;
      this.Payload1CrewCost = Math.sqrt(
        this.BattlecruiserBaseCrewCost *
          (this.Payload1ModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "Payload2" || key == null) {
      this.Payload2EnergyDamageBias = 1 - this.Payload2KineticDamageBias;
      this.Payload2CrewCost = Math.sqrt(
        this.BattlecruiserBaseCrewCost *
          (this.Payload2ModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "PointDefenseSystem" || key == null) {
      this.PointDefenseSystemHeatCapacity =
        this.PointDefenseSystemMass *
        this.PointDefenseSystemSpecificHeatCapacity;
      this.PointDefenseSystemCrewCost = Math.sqrt(
        this.BattlecruiserBaseCrewCost *
          (this.PointDefenseSystemModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "Thruster" || key == null) {
      this.ThrusterHeatCapacity =
        this.ThrusterMass * this.ThrusterSpecificHeatCapacity;
      this.ThrusterCrewCost = Math.sqrt(
        this.BattlecruiserBaseCrewCost *
          (this.ThrusterModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "WeaponFrame1" || key == null) {
      this.WeaponFrame1HeatCapacity =
        this.WeaponFrame1Mass * this.WeaponFrame1SpecificHeatCapacity;
      this.WeaponFrame1CrewCost = Math.sqrt(
        this.BattlecruiserBaseCrewCost *
          (this.WeaponFrame1ModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "WeaponFrame2" || key == null) {
      this.WeaponFrame2HeatCapacity =
        this.WeaponFrame2Mass * this.WeaponFrame2SpecificHeatCapacity;
      this.WeaponFrame2CrewCost = Math.sqrt(
        this.BattlecruiserBaseCrewCost *
          (this.WeaponFrame2ModulePointsCost > 0 ? 1 : 0)
      );
    }

    this.TotalModulePointsUsage =
      this.battlecruiserConfigurationTotalModulePointsUsage();
    this.TotalMass = this.battlecruiserConfigurationTotalMass();
    this.TotalCrewCost = this.battlecruiserConfigurationTotalCrewCost();
    this.TotalHeatCapacity = this.battlecruiserConfigurationTotalHeatCapacity();
    this.Maneuverability = this.battlecruiserConfigurationManeuverability();
    this.FuelSystemFuelConsumptionRate =
      this.TotalMass / this.ThrusterEfficiency;
  };
}
