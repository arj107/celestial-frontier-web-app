import { DestroyerModel } from "../Destroyer/DestroyerModel";
import { ArmorModel } from "../Armor/ArmorModel";
import { PointDefenseSystemModel } from "../PointDefenseSystem/PointDefenseSystemModel";
import { FuelSystemModel } from "../FuelSystem/FuelSystemModel";
import { ThrusterModel } from "../Thruster/ThrusterModel";
import { WeaponFrameModel } from "../WeaponFrame/WeaponFrameModel";
import { PayloadModel } from "../Payload/PayloadModel";
import { EVASION_SCALAR } from "../../utils/constants";

export class DestroyerConfigurationModel {
  // the original object consumed directly from the API
  _destroyerConfiguration;

  // Flattening all of the configuration's nested objects into a single level deep
  // for searching, filtering, sorting, and comparisons throughout the app
  DestroyerConfigurationGuid;
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
  Destroyer;
  DestroyerGuid;
  DestroyerClass;
  DestroyerHullMass;
  DestroyerSpecificHeatCapacity;
  DestroyerDescription;
  DestroyerBaseVigorCost;
  DestroyerBaseCrewCost;
  DestroyerModulePointLimit;
  DestroyerPointDefenseSystemPowerLevelGuid;
  DestroyerPointDefenseSystemPowerLevelText;
  DestroyerSpaceshipCategoryGuid;
  DestroyerSpaceshipCategoryText;
  DestroyerSpaceshipTypeGuid;
  DestroyerSpaceshipTypeText;
  DestroyerWeaponPowerLevelGuid;
  DestroyerWeaponPowerLevelText;
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
  DestroyerHeatCapacity;
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

  // Accepts a DestroyerConfiguration object directly from the API
  constructor(destroyerConfiguration) {
    if (destroyerConfiguration) {
      this._destroyerConfiguration = destroyerConfiguration;
      this.DestroyerConfigurationGuid =
        destroyerConfiguration.DestroyerConfigurationGuid;
      this.Name = destroyerConfiguration.Name;
      this.Armor = new ArmorModel(destroyerConfiguration.Armor);
      this.ArmorGuid = destroyerConfiguration.Armor.ArmorGuid;
      this.ArmorModulePointsCost =
        destroyerConfiguration.Armor.ModulePointsCost;
      this.ArmorMass = destroyerConfiguration.Armor.Mass;
      this.ArmorSpecificHeatCapacity =
        destroyerConfiguration.Armor.SpecificHeatCapacity;
      this.ArmorKineticResistance =
        destroyerConfiguration.Armor.KineticResistance;
      this.ArmorEnergyResistance =
        destroyerConfiguration.Armor.EnergyResistance;
      this.ArmorTitle = destroyerConfiguration.Armor.Title;
      this.ArmorDescription = destroyerConfiguration.Armor.Description;
      this.ArmorSpaceshipTypeGuid =
        destroyerConfiguration.Armor.SpaceshipType.SpaceshipTypeGuid;
      this.ArmorSpaceshipTypeText =
        destroyerConfiguration.Armor.SpaceshipType.Text;
      this.Destroyer = new DestroyerModel(
        destroyerConfiguration.Destroyer
      );
      this.DestroyerGuid =
        destroyerConfiguration.Destroyer.DestroyerGuid;
      this.DestroyerClass = destroyerConfiguration.Destroyer.Class;
      this.DestroyerHullMass =
        destroyerConfiguration.Destroyer.HullMass;
      this.DestroyerSpecificHeatCapacity =
        destroyerConfiguration.Destroyer.SpecificHeatCapacity;
      this.DestroyerDescription =
        destroyerConfiguration.Destroyer.Description;
        this.DestroyerBaseVigorCost =
          destroyerConfiguration.Destroyer.BaseVigorCost;
      this.DestroyerBaseCrewCost =
        destroyerConfiguration.Destroyer.BaseCrewCost;
      this.DestroyerModulePointLimit =
        destroyerConfiguration.Destroyer.ModulePointLimit;
      this.DestroyerPointDefenseSystemPowerLevelGuid =
        destroyerConfiguration.Destroyer.PointDefenseSystemPowerLevel.PowerLevelGuid;
      this.DestroyerPointDefenseSystemPowerLevelText =
        destroyerConfiguration.Destroyer.PointDefenseSystemPowerLevel.Text;
      this.DestroyerSpaceshipCategoryGuid =
        destroyerConfiguration.Destroyer.SpaceshipCategory.SpaceshipCategoryGuid;
      this.DestroyerSpaceshipCategoryText =
        destroyerConfiguration.Destroyer.SpaceshipCategory.Text;
      this.DestroyerSpaceshipTypeGuid =
        destroyerConfiguration.Destroyer.SpaceshipType.SpaceshipTypeGuid;
      this.DestroyerSpaceshipTypeText =
        destroyerConfiguration.Destroyer.SpaceshipType.Text;
      this.DestroyerWeaponPowerLevelGuid =
        destroyerConfiguration.Destroyer.WeaponPowerLevel.PowerLevelGuid;
      this.DestroyerWeaponPowerLevelText =
        destroyerConfiguration.Destroyer.WeaponPowerLevel.Text;
      this.User = destroyerConfiguration.User;
      this.UserGuid = destroyerConfiguration.User.UserGuid;
      this.Username = destroyerConfiguration.User.Username;
      this.FuelSystem = new FuelSystemModel(
        destroyerConfiguration.FuelSystem
      );
      this.FuelSystemGuid =
        destroyerConfiguration.FuelSystem.FuelSystemGuid;
      this.FuelSystemMass = destroyerConfiguration.FuelSystem.Mass;
      this.FuelSystemModulePointsCost =
        destroyerConfiguration.FuelSystem.ModulePointsCost;
      this.FuelSystemSpecificHeatCapacity =
        destroyerConfiguration.FuelSystem.SpecificHeatCapacity;
      this.FuelSystemFuelCapacity =
        destroyerConfiguration.FuelSystem.FuelCapacity;
      this.FuelSystemFuelRegenerationRate =
        destroyerConfiguration.FuelSystem.FuelRegenerationRate;
      this.FuelSystemTitle = destroyerConfiguration.FuelSystem.Title;
      this.FuelSystemDescription =
        destroyerConfiguration.FuelSystem.Description;
      this.FuelSystemSpaceshipTypeGuid =
        destroyerConfiguration.FuelSystem.SpaceshipType.SpaceshipTypeGuid;
      this.FuelSystemSpaceshipTypeText =
        destroyerConfiguration.FuelSystem.SpaceshipType.Text;
      this.Payload1 = new PayloadModel(destroyerConfiguration.Payload1);
      this.Payload1Guid = destroyerConfiguration.Payload1.PayloadGuid;
      this.Payload1ModulePointsCost =
        destroyerConfiguration.Payload1.ModulePointsCost;
      this.Payload1Velocity = destroyerConfiguration.Payload1.Velocity;
      this.Payload1KineticDamageBias =
        destroyerConfiguration.Payload1.KineticDamageBias;
      this.Payload1CounterSusceptibility =
        destroyerConfiguration.Payload1.CounterSusceptibility;
      this.Payload1BaseDamage = destroyerConfiguration.Payload1.BaseDamage;
      this.Payload1BaseCriticalHitMultiplier =
        destroyerConfiguration.Payload1.BaseCriticalHitMultiplier;
      this.Payload1Title = destroyerConfiguration.Payload1.Title;
      this.Payload1Description =
        destroyerConfiguration.Payload1.Description;
      this.Payload1PayloadTypeGuid =
        destroyerConfiguration.Payload1.PayloadType.PayloadTypeGuid;
      this.Payload1PayloadTypeText =
        destroyerConfiguration.Payload1.PayloadType.Text;
      this.Payload1PowerLevelGuid =
        destroyerConfiguration.Payload1.PowerLevel.PowerLevelGuid;
      this.Payload1PowerLevelText =
        destroyerConfiguration.Payload1.PowerLevel.Text;
      this.Payload1WeaponFrameTypeGuid =
        destroyerConfiguration.Payload1.WeaponFrameType.WeaponFrameTypeGuid;
      this.Payload1WeaponFrameTypeText =
        destroyerConfiguration.Payload1.WeaponFrameType.Text;
      this.Payload2 = new PayloadModel(destroyerConfiguration.Payload2);
      this.Payload2Guid = destroyerConfiguration.Payload2.PayloadGuid;
      this.Payload2ModulePointsCost =
        destroyerConfiguration.Payload2.ModulePointsCost;
      this.Payload2Velocity = destroyerConfiguration.Payload2.Velocity;
      this.Payload2KineticDamageBias =
        destroyerConfiguration.Payload2.KineticDamageBias;
      this.Payload2CounterSusceptibility =
        destroyerConfiguration.Payload2.CounterSusceptibility;
      this.Payload2BaseDamage = destroyerConfiguration.Payload2.BaseDamage;
      this.Payload2BaseCriticalHitMultiplier =
        destroyerConfiguration.Payload2.BaseCriticalHitMultiplier;
      this.Payload2Title = destroyerConfiguration.Payload2.Title;
      this.Payload2Description =
        destroyerConfiguration.Payload2.Description;
      this.Payload2PayloadTypeGuid =
        destroyerConfiguration.Payload2.PayloadType.PayloadTypeGuid;
      this.Payload2PayloadTypeText =
        destroyerConfiguration.Payload2.PayloadType.Text;
      this.Payload2PowerLevelGuid =
        destroyerConfiguration.Payload2.PowerLevel.PowerLevelGuid;
      this.Payload2PowerLevelText =
        destroyerConfiguration.Payload2.PowerLevel.Text;
      this.Payload2WeaponFrameTypeGuid =
        destroyerConfiguration.Payload2.WeaponFrameType.WeaponFrameTypeGuid;
      this.Payload2WeaponFrameTypeText =
        destroyerConfiguration.Payload2.WeaponFrameType.Text;
      this.PointDefenseSystem = new PointDefenseSystemModel(
        destroyerConfiguration.PointDefenseSystem
      );
      this.PointDefenseSystemGuid =
        destroyerConfiguration.PointDefenseSystem.PointDefenseSystemGuid;
      this.PointDefenseSystemModulePointsCost =
        destroyerConfiguration.PointDefenseSystem.ModulePointsCost;
      this.PointDefenseSystemMass =
        destroyerConfiguration.PointDefenseSystem.Mass;
      this.PointDefenseSystemSpecificHeatCapacity =
        destroyerConfiguration.PointDefenseSystem.SpecificHeatCapacity;
      this.PointDefenseSystemCountermeasureCapacity =
        destroyerConfiguration.PointDefenseSystem.CountermeasureCapacity;
      this.PointDefenseSystemCountermeasureRegenerationRate =
        destroyerConfiguration.PointDefenseSystem.CountermeasureRegenerationRate;
      this.PointDefenseSystemEfficiency =
        destroyerConfiguration.PointDefenseSystem.Efficiency;
      this.PointDefenseSystemTitle =
        destroyerConfiguration.PointDefenseSystem.Title;
      this.PointDefenseSystemDescription =
        destroyerConfiguration.PointDefenseSystem.Description;
      this.PointDefenseSystemPowerLevelGuid =
        destroyerConfiguration.PointDefenseSystem.PowerLevel.PowerLevelGuid;
      this.PointDefenseSystemPowerLevelText =
        destroyerConfiguration.PointDefenseSystem.PowerLevel.Text;
      this.Thruster = new ThrusterModel(destroyerConfiguration.Thruster);
      this.ThrusterGuid = destroyerConfiguration.Thruster.ThrusterGuid;
      this.ThrusterModulePointsCost =
        destroyerConfiguration.Thruster.ModulePointsCost;
      this.ThrusterMass = destroyerConfiguration.Thruster.Mass;
      this.ThrusterSpecificHeatCapacity =
        destroyerConfiguration.Thruster.SpecificHeatCapacity;
      this.ThrusterThrust = destroyerConfiguration.Thruster.Thrust;
      this.ThrusterEfficiency = destroyerConfiguration.Thruster.Efficiency;
      this.ThrusterTitle = destroyerConfiguration.Thruster.Title;
      this.ThrusterDescription =
        destroyerConfiguration.Thruster.Description;
      this.ThrusterSpaceshipTypeGuid =
        destroyerConfiguration.Thruster.SpaceshipType.SpaceshipTypeGuid;
      this.ThrusterSpaceshipTypeText =
        destroyerConfiguration.Thruster.SpaceshipType.Text;
      this.WeaponFrame1 = new WeaponFrameModel(
        destroyerConfiguration.WeaponFrame1
      );
      this.WeaponFrame1Guid =
        destroyerConfiguration.WeaponFrame1.WeaponFrameGuid;
      this.WeaponFrame1ModulePointsCost =
        destroyerConfiguration.WeaponFrame1.ModulePointsCost;
      this.WeaponFrame1Mass = destroyerConfiguration.WeaponFrame1.Mass;
      this.WeaponFrame1SpecificHeatCapacity =
        destroyerConfiguration.WeaponFrame1.SpecificHeatCapacity;
      this.WeaponFrame1BaseMagSize =
        destroyerConfiguration.WeaponFrame1.BaseMagSize;
      this.WeaponFrame1TargetingEfficiency =
        destroyerConfiguration.WeaponFrame1.TargetingEfficiency;
      this.WeaponFrame1OptimalRange =
        destroyerConfiguration.WeaponFrame1.OptimalRange;
      this.WeaponFrame1EffectiveRange =
        destroyerConfiguration.WeaponFrame1.EffectiveRange;
      this.WeaponFrame1BaseCriticalHitChance =
        destroyerConfiguration.WeaponFrame1.BaseCriticalHitChance;
      this.WeaponFrame1Title = destroyerConfiguration.WeaponFrame1.Title;
      this.WeaponFrame1Description =
        destroyerConfiguration.WeaponFrame1.Description;
      this.WeaponFrame1PowerLevelGuid =
        destroyerConfiguration.WeaponFrame1.PowerLevel.PowerLevelGuid;
      this.WeaponFrame1PowerLevelText =
        destroyerConfiguration.WeaponFrame1.PowerLevel.Text;
      this.WeaponFrame1WeaponFrameTypeGuid =
        destroyerConfiguration.WeaponFrame1.WeaponFrameType.WeaponFrameTypeGuid;
      this.WeaponFrame1WeaponFrameTypeText =
        destroyerConfiguration.WeaponFrame1.WeaponFrameType.Text;
      this.WeaponFrame2 = new WeaponFrameModel(
        destroyerConfiguration.WeaponFrame2
      );
      this.WeaponFrame2Guid =
        destroyerConfiguration.WeaponFrame2.WeaponFrameGuid;
      this.WeaponFrame2ModulePointsCost =
        destroyerConfiguration.WeaponFrame2.ModulePointsCost;
      this.WeaponFrame2Mass = destroyerConfiguration.WeaponFrame2.Mass;
      this.WeaponFrame2SpecificHeatCapacity =
        destroyerConfiguration.WeaponFrame2.SpecificHeatCapacity;
      this.WeaponFrame2BaseMagSize =
        destroyerConfiguration.WeaponFrame2.BaseMagSize;
      this.WeaponFrame2TargetingEfficiency =
        destroyerConfiguration.WeaponFrame2.TargetingEfficiency;
      this.WeaponFrame2OptimalRange =
        destroyerConfiguration.WeaponFrame2.OptimalRange;
      this.WeaponFrame2EffectiveRange =
        destroyerConfiguration.WeaponFrame2.EffectiveRange;
      this.WeaponFrame2BaseCriticalHitChance =
        destroyerConfiguration.WeaponFrame2.BaseCriticalHitChance;
      this.WeaponFrame2Title = destroyerConfiguration.WeaponFrame2.Title;
      this.WeaponFrame2Description =
        destroyerConfiguration.WeaponFrame2.Description;
      this.WeaponFrame2PowerLevelGuid =
        destroyerConfiguration.WeaponFrame2.PowerLevel.PowerLevelGuid;
      this.WeaponFrame2PowerLevelText =
        destroyerConfiguration.WeaponFrame2.PowerLevel.Text;
      this.WeaponFrame2WeaponFrameTypeGuid =
        destroyerConfiguration.WeaponFrame2.WeaponFrameType.WeaponFrameTypeGuid;
      this.WeaponFrame2WeaponFrameTypeText =
        destroyerConfiguration.WeaponFrame2.WeaponFrameType.Text;

      // Calculated properties
      // this.ArmorHeatCapacity = this.ArmorMass * this.ArmorSpecificHeatCapacity;
      // this.ArmorCrewCost = Math.sqrt(this.DestroyerBaseCrewCost * (this.ArmorModulePointsCost > 0 ? 1 : 0));
      // this.DestroyerHeatCapacity = this.DestroyerHullMass * this.DestroyerSpecificHeatCapacity;
      // this.FuelSystemHeatCapacity = this.FuelSystemMass * this.FuelSystemSpecificHeatCapacity;
      // this.FuelSystemCrewCost = Math.sqrt(this.DestroyerBaseCrewCost * (this.FuelSystemModulePointsCost > 0 ? 1 : 0));
      // this.Payload1EnergyDamageBias = 1 - this.Payload1KineticDamageBias;
      // this.Payload1CrewCost = Math.sqrt(this.DestroyerBaseCrewCost * (this.Payload1ModulePointsCost > 0 ? 1 : 0));
      // this.Payload2EnergyDamageBias = 1 - this.Payload2KineticDamageBias;
      // this.Payload2CrewCost = Math.sqrt(this.DestroyerBaseCrewCost * (this.Payload2ModulePointsCost > 0 ? 1 : 0));
      // this.PointDefenseSystemHeatCapacity = this.PointDefenseSystemMass * this.PointDefenseSystemSpecificHeatCapacity;
      // this.PointDefenseSystemCrewCost = Math.sqrt(this.DestroyerBaseCrewCost * (this.PointDefenseSystemModulePointsCost > 0 ? 1 : 0));
      // this.ThrusterHeatCapacity = this.ThrusterMass * this.ThrusterSpecificHeatCapacity;
      // this.ThrusterCrewCost = Math.sqrt(this.DestroyerBaseCrewCost * (this.ThrusterModulePointsCost > 0 ? 1 : 0));
      // this.WeaponFrame1HeatCapacity = this.WeaponFrame1Mass * this.WeaponFrame1SpecificHeatCapacity;
      // this.WeaponFrame1CrewCost = Math.sqrt(this.DestroyerBaseCrewCost * (this.WeaponFrame1ModulePointsCost > 0 ? 1 : 0));
      // this.WeaponFrame2HeatCapacity = this.WeaponFrame2Mass * this.WeaponFrame2SpecificHeatCapacity;
      // this.WeaponFrame2CrewCost = Math.sqrt(this.DestroyerBaseCrewCost * (this.WeaponFrame2ModulePointsCost > 0 ? 1 : 0));
      // this.TotalModulePointsUsage = this.destroyerConfigurationTotalModulePointsUsage();
      // this.TotalMass = this.destroyerConfigurationTotalMass();
      // this.TotalCrewCost = this.destroyerConfigurationTotalCrewCost();
      // this.TotalHeatCapacity = this.destroyerConfigurationTotalHeatCapacity();
      // this.Maneuverability = this.destroyerConfigurationManeuverability();
      // this.FuelSystemFuelConsumptionRate = this.TotalMass / this.ThrusterEfficiency;
      this.updateCalculated();
    }
  }

  destroyerConfigurationTotalModulePointsUsage = function () {
    let totalModulePointsUsed =
      (this.ArmorModulePointsCost || 0) +
      (this.FuelSystemModulePointsCost || 0) +
      (this.PointDefenseSystemModulePointsCost || 0) +
      (this.ThrusterModulePointsCost || 0) +
      (this.WeaponFrame1ModulePointsCost || 0) +
      (this.Payload1ModulePointsCost || 0) +
      (this.WeaponFrame2ModulePointsCost || 0) +
      (this.Payload2ModulePointsCost || 0);

    if (this.DestroyerModulePointLimit == 0) {
      return 0;
    }
    return totalModulePointsUsed;
  };
  destroyerConfigurationTotalMass = function () {
    if (this._destroyerConfiguration == null) {
      return 0;
    }
    return (
      (this.DestroyerHullMass || 0) +
      (this.ArmorMass || 0) +
      (this.FuelSystemMass || 0) +
      (this.PointDefenseSystemMass || 0) +
      (this.ThrusterMass || 0) +
      (this.WeaponFrame1Mass || 0) +
      (this.WeaponFrame2Mass || 0)
    );
  };
  destroyerConfigurationTotalCrewCost = function () {
    if (this._destroyerConfiguration == null) {
      return 0;
    }
    return Math.round(
      (this.DestroyerBaseCrewCost || 0) +
        (this.Armor
          ? Math.sqrt(
              this.DestroyerBaseCrewCost *
                (this.ArmorModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.FuelSystem
          ? Math.sqrt(
              this.DestroyerBaseCrewCost *
                (this.FuelSystemModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.PointDefenseSystem
          ? Math.sqrt(
              this.DestroyerBaseCrewCost *
                (this.PointDefenseSystemModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.Thruster
          ? Math.sqrt(
              this.DestroyerBaseCrewCost *
                (this.ThrusterModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.WeaponFrame1
          ? Math.sqrt(
              this.DestroyerBaseCrewCost *
                (this.WeaponFrame1ModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.WeaponFrame2
          ? Math.sqrt(
              this.DestroyerBaseCrewCost *
                (this.WeaponFrame2ModulePointsCost > 0 ? 1 : 0)
            )
          : 0)
    );
  };
  destroyerConfigurationTotalHeatCapacity = function () {
    if (this._destroyerConfiguration == null) {
      return 0;
    }
    return (
      (this.DestroyerHeatCapacity || 0) +
      (this.ArmorHeatCapacity || 0) +
      (this.FuelSystemHeatCapacity || 0) +
      (this.PointDefenseSystemHeatCapacity || 0) +
      (this.ThrusterHeatCapacity || 0) +
      (this.WeaponFrame1HeatCapacity || 0) +
      (this.WeaponFrame2HeatCapacity || 0)
    );
  };
  destroyerConfigurationManeuverability = function () {
    if (this.TotalMass == 0) {
      return 0;
    }
    return this.ThrusterThrust / (this.TotalMass * EVASION_SCALAR);
  };
  damagePerTurn = function () {
    if (this._destroyerConfiguration == null) {
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

  setDestroyer = function (destroyer) {
    this.Destroyer = destroyer;
    this.DestroyerGuid = this.Destroyer.DestroyerGuid;
    this.DestroyerClass = this.Destroyer.Class;
    this.DestroyerHullMass = this.Destroyer.HullMass;
    this.DestroyerSpecificHeatCapacity =
      this.Destroyer.SpecificHeatCapacity;
    this.DestroyerDescription = this.Destroyer.Description;
    this.DestroyerBaseVigorCost = this.Destroyer.BaseVigorCost;
    this.DestroyerBaseCrewCost = this.Destroyer.BaseCrewCost;
    this.DestroyerModulePointLimit = this.Destroyer.ModulePointLimit;
    this.DestroyerPointDefenseSystemPowerLevelGuid =
      this.Destroyer.PointDefenseSystemPowerLevelGuid;
    this.DestroyerPointDefenseSystemPowerLevelText =
      this.Destroyer.PointDefenseSystemPowerLevelText;
    this.DestroyerSpaceshipCategoryGuid =
      this.Destroyer.SpaceshipCategoryGuid;
    this.DestroyerSpaceshipCategoryText =
      this.Destroyer.SpaceshipCategoryText;
    this.DestroyerSpaceshipTypeGuid = this.Destroyer.SpaceshipTypeGuid;
    this.DestroyerSpaceshipTypeText = this.Destroyer.SpaceshipTypeText;
    this.DestroyerWeaponPowerLevelGuid =
      this.Destroyer.WeaponPowerLevelGuid;
    this.DestroyerWeaponPowerLevelText =
      this.Destroyer.WeaponPowerLevelText;
    this.updateCalculated("Destroyer");
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
        if (this.TotalModulePointsUsage > this.DestroyerModulePointLimit) {
            invalid = true;
        }
        let powerLevels = {
            "Level 1": 1,
            "Level 2": 2,
            "Level 3": 3
        }
        if (powerLevels[this.PointDefenseSystemPowerLevelText] > powerLevels[this.DestroyerPointDefenseSystemPowerLevelText]) {
            invalid = true;
        }
        if (powerLevels[this.WeaponFrame1PowerLevelText] > powerLevels[this.DestroyerPointDefenseSystemPowerLevelText]) {
            invalid = true;
        }
        if (powerLevels[this.WeaponFrame2PowerLevelText] > powerLevels[this.DestroyerPointDefenseSystemPowerLevelText]) {
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
        this.DestroyerBaseCrewCost *
          (this.ArmorModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "Destroyer" || key == null) {
      this.DestroyerHeatCapacity =
        this.DestroyerHullMass * this.DestroyerSpecificHeatCapacity;
    }
    if (key === "FuelSystem" || key == null) {
      this.FuelSystemHeatCapacity =
        this.FuelSystemMass * this.FuelSystemSpecificHeatCapacity;
      this.FuelSystemCrewCost = Math.sqrt(
        this.DestroyerBaseCrewCost *
          (this.FuelSystemModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "Payload1" || key == null) {
      this.Payload1EnergyDamageBias = 1 - this.Payload1KineticDamageBias;
      this.Payload1CrewCost = Math.sqrt(
        this.DestroyerBaseCrewCost *
          (this.Payload1ModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "Payload2" || key == null) {
      this.Payload2EnergyDamageBias = 1 - this.Payload2KineticDamageBias;
      this.Payload2CrewCost = Math.sqrt(
        this.DestroyerBaseCrewCost *
          (this.Payload2ModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "PointDefenseSystem" || key == null) {
      this.PointDefenseSystemHeatCapacity =
        this.PointDefenseSystemMass *
        this.PointDefenseSystemSpecificHeatCapacity;
      this.PointDefenseSystemCrewCost = Math.sqrt(
        this.DestroyerBaseCrewCost *
          (this.PointDefenseSystemModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "Thruster" || key == null) {
      this.ThrusterHeatCapacity =
        this.ThrusterMass * this.ThrusterSpecificHeatCapacity;
      this.ThrusterCrewCost = Math.sqrt(
        this.DestroyerBaseCrewCost *
          (this.ThrusterModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "WeaponFrame1" || key == null) {
      this.WeaponFrame1HeatCapacity =
        this.WeaponFrame1Mass * this.WeaponFrame1SpecificHeatCapacity;
      this.WeaponFrame1CrewCost = Math.sqrt(
        this.DestroyerBaseCrewCost *
          (this.WeaponFrame1ModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "WeaponFrame2" || key == null) {
      this.WeaponFrame2HeatCapacity =
        this.WeaponFrame2Mass * this.WeaponFrame2SpecificHeatCapacity;
      this.WeaponFrame2CrewCost = Math.sqrt(
        this.DestroyerBaseCrewCost *
          (this.WeaponFrame2ModulePointsCost > 0 ? 1 : 0)
      );
    }

    this.TotalModulePointsUsage =
      this.destroyerConfigurationTotalModulePointsUsage();
    this.TotalMass = this.destroyerConfigurationTotalMass();
    this.TotalCrewCost = this.destroyerConfigurationTotalCrewCost();
    this.TotalHeatCapacity = this.destroyerConfigurationTotalHeatCapacity();
    this.Maneuverability = this.destroyerConfigurationManeuverability();
    this.FuelSystemFuelConsumptionRate =
      this.TotalMass / this.ThrusterEfficiency;
  };
}
