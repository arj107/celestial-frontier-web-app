import { FrigateModel } from "../Frigate/FrigateModel";
import { ArmorModel } from "../Armor/ArmorModel";
import { PointDefenseSystemModel } from "../PointDefenseSystem/PointDefenseSystemModel";
import { FuelSystemModel } from "../FuelSystem/FuelSystemModel";
import { ThrusterModel } from "../Thruster/ThrusterModel";
import { WeaponFrameModel } from "../WeaponFrame/WeaponFrameModel";
import { PayloadModel } from "../Payload/PayloadModel";

export class FrigateConfigurationModel {
  // the original object consumed directly from the API
  _frigateConfiguration;

  // Flattening all of the configuration's nested objects into a single level deep
  // for searching, filtering, sorting, and comparisons throughout the app
  FrigateConfigurationGuid;
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
  Frigate;
  FrigateGuid;
  FrigateClass;
  FrigateHullMass;
  FrigateSpecificHeatCapacity;
  FrigateDescription;
  FrigateBaseVigorCost;
  FrigateBaseCrewCost;
  FrigateModulePointLimit;
  FrigatePointDefenseSystemPowerLevelGuid;
  FrigatePointDefenseSystemPowerLevelText;
  FrigateSpaceshipCategoryGuid;
  FrigateSpaceshipCategoryText;
  FrigateSpaceshipTypeGuid;
  FrigateSpaceshipTypeText;
  FrigateWeaponPowerLevelGuid;
  FrigateWeaponPowerLevelText;
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
  FrigateHeatCapacity;
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

  // Accepts a FrigateConfiguration object directly from the API
  constructor(frigateConfiguration) {
    if (frigateConfiguration) {
      this._frigateConfiguration = frigateConfiguration;
      this.FrigateConfigurationGuid =
        frigateConfiguration.FrigateConfigurationGuid;
      this.Name = frigateConfiguration.Name;
      this.Armor = new ArmorModel(frigateConfiguration.Armor);
      this.ArmorGuid = frigateConfiguration.Armor.ArmorGuid;
      this.ArmorModulePointsCost =
        frigateConfiguration.Armor.ModulePointsCost;
      this.ArmorMass = frigateConfiguration.Armor.Mass;
      this.ArmorSpecificHeatCapacity =
        frigateConfiguration.Armor.SpecificHeatCapacity;
      this.ArmorKineticResistance =
        frigateConfiguration.Armor.KineticResistance;
      this.ArmorEnergyResistance =
        frigateConfiguration.Armor.EnergyResistance;
      this.ArmorTitle = frigateConfiguration.Armor.Title;
      this.ArmorDescription = frigateConfiguration.Armor.Description;
      this.ArmorSpaceshipTypeGuid =
        frigateConfiguration.Armor.SpaceshipType.SpaceshipTypeGuid;
      this.ArmorSpaceshipTypeText =
        frigateConfiguration.Armor.SpaceshipType.Text;
      this.Frigate = new FrigateModel(
        frigateConfiguration.Frigate
      );
      this.FrigateGuid =
        frigateConfiguration.Frigate.FrigateGuid;
      this.FrigateClass = frigateConfiguration.Frigate.Class;
      this.FrigateHullMass =
        frigateConfiguration.Frigate.HullMass;
      this.FrigateSpecificHeatCapacity =
        frigateConfiguration.Frigate.SpecificHeatCapacity;
      this.FrigateDescription =
        frigateConfiguration.Frigate.Description;
        this.FrigateBaseVigorCost =
          frigateConfiguration.Frigate.BaseVigorCost;
      this.FrigateBaseCrewCost =
        frigateConfiguration.Frigate.BaseCrewCost;
      this.FrigateModulePointLimit =
        frigateConfiguration.Frigate.ModulePointLimit;
      this.FrigatePointDefenseSystemPowerLevelGuid =
        frigateConfiguration.Frigate.PointDefenseSystemPowerLevel.PowerLevelGuid;
      this.FrigatePointDefenseSystemPowerLevelText =
        frigateConfiguration.Frigate.PointDefenseSystemPowerLevel.Text;
      this.FrigateSpaceshipCategoryGuid =
        frigateConfiguration.Frigate.SpaceshipCategory.SpaceshipCategoryGuid;
      this.FrigateSpaceshipCategoryText =
        frigateConfiguration.Frigate.SpaceshipCategory.Text;
      this.FrigateSpaceshipTypeGuid =
        frigateConfiguration.Frigate.SpaceshipType.SpaceshipTypeGuid;
      this.FrigateSpaceshipTypeText =
        frigateConfiguration.Frigate.SpaceshipType.Text;
      this.FrigateWeaponPowerLevelGuid =
        frigateConfiguration.Frigate.WeaponPowerLevel.PowerLevelGuid;
      this.FrigateWeaponPowerLevelText =
        frigateConfiguration.Frigate.WeaponPowerLevel.Text;
      this.User = frigateConfiguration.User;
      this.UserGuid = frigateConfiguration.User.UserGuid;
      this.Username = frigateConfiguration.User.Username;
      this.FuelSystem = new FuelSystemModel(
        frigateConfiguration.FuelSystem
      );
      this.FuelSystemGuid =
        frigateConfiguration.FuelSystem.FuelSystemGuid;
      this.FuelSystemMass = frigateConfiguration.FuelSystem.Mass;
      this.FuelSystemModulePointsCost =
        frigateConfiguration.FuelSystem.ModulePointsCost;
      this.FuelSystemSpecificHeatCapacity =
        frigateConfiguration.FuelSystem.SpecificHeatCapacity;
      this.FuelSystemFuelCapacity =
        frigateConfiguration.FuelSystem.FuelCapacity;
      this.FuelSystemFuelRegenerationRate =
        frigateConfiguration.FuelSystem.FuelRegenerationRate;
      this.FuelSystemTitle = frigateConfiguration.FuelSystem.Title;
      this.FuelSystemDescription =
        frigateConfiguration.FuelSystem.Description;
      this.FuelSystemSpaceshipTypeGuid =
        frigateConfiguration.FuelSystem.SpaceshipType.SpaceshipTypeGuid;
      this.FuelSystemSpaceshipTypeText =
        frigateConfiguration.FuelSystem.SpaceshipType.Text;
      this.Payload = new PayloadModel(frigateConfiguration.Payload);
      this.PayloadGuid = frigateConfiguration.Payload.PayloadGuid;
      this.PayloadModulePointsCost =
        frigateConfiguration.Payload.ModulePointsCost;
      this.PayloadVelocity = frigateConfiguration.Payload.Velocity;
      this.PayloadKineticDamageBias =
        frigateConfiguration.Payload.KineticDamageBias;
      this.PayloadCounterSusceptibility =
        frigateConfiguration.Payload.CounterSusceptibility;
      this.PayloadBaseDamage = frigateConfiguration.Payload.BaseDamage;
      this.PayloadBaseCriticalHitMultiplier =
        frigateConfiguration.Payload.BaseCriticalHitMultiplier;
      this.PayloadTitle = frigateConfiguration.Payload.Title;
      this.PayloadDescription =
        frigateConfiguration.Payload.Description;
      this.PayloadPayloadTypeGuid =
        frigateConfiguration.Payload.PayloadType.PayloadTypeGuid;
      this.PayloadPayloadTypeText =
        frigateConfiguration.Payload.PayloadType.Text;
      this.PayloadPowerLevelGuid =
        frigateConfiguration.Payload.PowerLevel.PowerLevelGuid;
      this.PayloadPowerLevelText =
        frigateConfiguration.Payload.PowerLevel.Text;
      this.PayloadWeaponFrameTypeGuid =
        frigateConfiguration.Payload.WeaponFrameType.WeaponFrameTypeGuid;
      this.PayloadWeaponFrameTypeText =
        frigateConfiguration.Payload.WeaponFrameType.Text;
      this.PointDefenseSystem = new PointDefenseSystemModel(
        frigateConfiguration.PointDefenseSystem
      );
      this.PointDefenseSystemGuid =
        frigateConfiguration.PointDefenseSystem.PointDefenseSystemGuid;
      this.PointDefenseSystemModulePointsCost =
        frigateConfiguration.PointDefenseSystem.ModulePointsCost;
      this.PointDefenseSystemMass =
        frigateConfiguration.PointDefenseSystem.Mass;
      this.PointDefenseSystemSpecificHeatCapacity =
        frigateConfiguration.PointDefenseSystem.SpecificHeatCapacity;
      this.PointDefenseSystemCountermeasureCapacity =
        frigateConfiguration.PointDefenseSystem.CountermeasureCapacity;
      this.PointDefenseSystemCountermeasureRegenerationRate =
        frigateConfiguration.PointDefenseSystem.CountermeasureRegenerationRate;
      this.PointDefenseSystemEfficiency =
        frigateConfiguration.PointDefenseSystem.Efficiency;
      this.PointDefenseSystemTitle =
        frigateConfiguration.PointDefenseSystem.Title;
      this.PointDefenseSystemDescription =
        frigateConfiguration.PointDefenseSystem.Description;
      this.PointDefenseSystemPowerLevelGuid =
        frigateConfiguration.PointDefenseSystem.PowerLevel.PowerLevelGuid;
      this.PointDefenseSystemPowerLevelText =
        frigateConfiguration.PointDefenseSystem.PowerLevel.Text;
      this.Thruster = new ThrusterModel(frigateConfiguration.Thruster);
      this.ThrusterGuid = frigateConfiguration.Thruster.ThrusterGuid;
      this.ThrusterModulePointsCost =
        frigateConfiguration.Thruster.ModulePointsCost;
      this.ThrusterMass = frigateConfiguration.Thruster.Mass;
      this.ThrusterSpecificHeatCapacity =
        frigateConfiguration.Thruster.SpecificHeatCapacity;
      this.ThrusterThrust = frigateConfiguration.Thruster.Thrust;
      this.ThrusterEfficiency = frigateConfiguration.Thruster.Efficiency;
      this.ThrusterTitle = frigateConfiguration.Thruster.Title;
      this.ThrusterDescription =
        frigateConfiguration.Thruster.Description;
      this.ThrusterSpaceshipTypeGuid =
        frigateConfiguration.Thruster.SpaceshipType.SpaceshipTypeGuid;
      this.ThrusterSpaceshipTypeText =
        frigateConfiguration.Thruster.SpaceshipType.Text;
      this.WeaponFrame = new WeaponFrameModel(
        frigateConfiguration.WeaponFrame
      );
      this.WeaponFrameGuid =
        frigateConfiguration.WeaponFrame.WeaponFrameGuid;
      this.WeaponFrameModulePointsCost =
        frigateConfiguration.WeaponFrame.ModulePointsCost;
      this.WeaponFrameMass = frigateConfiguration.WeaponFrame.Mass;
      this.WeaponFrameSpecificHeatCapacity =
        frigateConfiguration.WeaponFrame.SpecificHeatCapacity;
      this.WeaponFrameBaseMagSize =
        frigateConfiguration.WeaponFrame.BaseMagSize;
      this.WeaponFrameTargetingEfficiency =
        frigateConfiguration.WeaponFrame.TargetingEfficiency;
      this.WeaponFrameOptimalRange =
        frigateConfiguration.WeaponFrame.OptimalRange;
      this.WeaponFrameEffectiveRange =
        frigateConfiguration.WeaponFrame.EffectiveRange;
      this.WeaponFrameBaseCriticalHitChance =
        frigateConfiguration.WeaponFrame.BaseCriticalHitChance;
      this.WeaponFrameTitle = frigateConfiguration.WeaponFrame.Title;
      this.WeaponFrameDescription =
        frigateConfiguration.WeaponFrame.Description;
      this.WeaponFramePowerLevelGuid =
        frigateConfiguration.WeaponFrame.PowerLevel.PowerLevelGuid;
      this.WeaponFramePowerLevelText =
        frigateConfiguration.WeaponFrame.PowerLevel.Text;
      this.WeaponFrameWeaponFrameTypeGuid =
        frigateConfiguration.WeaponFrame.WeaponFrameType.WeaponFrameTypeGuid;
      this.WeaponFrameWeaponFrameTypeText =
        frigateConfiguration.WeaponFrame.WeaponFrameType.Text;

      // Calculated properties
      // this.ArmorHeatCapacity = this.ArmorMass * this.ArmorSpecificHeatCapacity;
      // this.ArmorCrewCost = Math.sqrt(this.FrigateBaseCrewCost * (this.ArmorModulePointsCost > 0 ? 1 : 0));
      // this.FrigateHeatCapacity = this.FrigateHullMass * this.FrigateSpecificHeatCapacity;
      // this.FuelSystemHeatCapacity = this.FuelSystemMass * this.FuelSystemSpecificHeatCapacity;
      // this.FuelSystemCrewCost = Math.sqrt(this.FrigateBaseCrewCost * (this.FuelSystemModulePointsCost > 0 ? 1 : 0));
      // this.PayloadEnergyDamageBias = 1 - this.PayloadKineticDamageBias;
      // this.PayloadCrewCost = Math.sqrt(this.FrigateBaseCrewCost * (this.PayloadModulePointsCost > 0 ? 1 : 0));
      // this.PointDefenseSystemHeatCapacity = this.PointDefenseSystemMass * this.PointDefenseSystemSpecificHeatCapacity;
      // this.PointDefenseSystemCrewCost = Math.sqrt(this.FrigateBaseCrewCost * (this.PointDefenseSystemModulePointsCost > 0 ? 1 : 0));
      // this.ThrusterHeatCapacity = this.ThrusterMass * this.ThrusterSpecificHeatCapacity;
      // this.ThrusterCrewCost = Math.sqrt(this.FrigateBaseCrewCost * (this.ThrusterModulePointsCost > 0 ? 1 : 0));
      // this.WeaponFrameHeatCapacity = this.WeaponFrameMass * this.WeaponFrameSpecificHeatCapacity;
      // this.WeaponFrameCrewCost = Math.sqrt(this.FrigateBaseCrewCost * (this.WeaponFrameModulePointsCost > 0 ? 1 : 0));
      // this.TotalModulePointsUsage = this.frigateConfigurationTotalModulePointsUsage();
      // this.TotalMass = this.frigateConfigurationTotalMass();
      // this.TotalCrewCost = this.frigateConfigurationTotalCrewCost();
      // this.TotalHeatCapacity = this.frigateConfigurationTotalHeatCapacity();
      // this.Maneuverability = this.frigateConfigurationManeuverability();
      // this.FuelSystemFuelConsumptionRate = this.TotalMass / this.ThrusterEfficiency;
      this.updateCalculated();
    }
  }

  frigateConfigurationTotalModulePointsUsage = function () {
    let totalModulePointsUsed =
      (this.ArmorModulePointsCost || 0) +
      (this.FuelSystemModulePointsCost || 0) +
      (this.PointDefenseSystemModulePointsCost || 0) +
      (this.ThrusterModulePointsCost || 0) +
      (this.WeaponFrameModulePointsCost || 0) +
      (this.PayloadModulePointsCost || 0)

    if (this.FrigateModulePointLimit == 0) {
      return 0;
    }
    return totalModulePointsUsed;
  };
  frigateConfigurationTotalMass = function () {
    if (this._frigateConfiguration == null) {
      return 0;
    }
    return (
      (this.FrigateHullMass || 0) +
      (this.ArmorMass || 0) +
      (this.FuelSystemMass || 0) +
      (this.PointDefenseSystemMass || 0) +
      (this.ThrusterMass || 0) +
      (this.WeaponFrameMass || 0)
    );
  };
  frigateConfigurationTotalCrewCost = function () {
    if (this._frigateConfiguration == null) {
      return 0;
    }
    return Math.round(
      (this.FrigateBaseCrewCost || 0) +
        (this.Armor
          ? Math.sqrt(
              this.FrigateBaseCrewCost *
                (this.ArmorModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.FuelSystem
          ? Math.sqrt(
              this.FrigateBaseCrewCost *
                (this.FuelSystemModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.PointDefenseSystem
          ? Math.sqrt(
              this.FrigateBaseCrewCost *
                (this.PointDefenseSystemModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.Thruster
          ? Math.sqrt(
              this.FrigateBaseCrewCost *
                (this.ThrusterModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.WeaponFrame
          ? Math.sqrt(
              this.FrigateBaseCrewCost *
                (this.WeaponFrameModulePointsCost > 0 ? 1 : 0)
            )
          : 0)
    );
  };
  frigateConfigurationTotalHeatCapacity = function () {
    if (this._frigateConfiguration == null) {
      return 0;
    }
    return (
      (this.FrigateHeatCapacity || 0) +
      (this.ArmorHeatCapacity || 0) +
      (this.FuelSystemHeatCapacity || 0) +
      (this.PointDefenseSystemHeatCapacity || 0) +
      (this.ThrusterHeatCapacity || 0) +
      (this.WeaponFrameHeatCapacity || 0)
    );
  };
  frigateConfigurationManeuverability = function () {
    if (this.TotalMass == 0) {
      return 0;
    }
    return this.ThrusterThrust / this.TotalMass;
  };
  damagePerTurn = function () {
    if (this._frigateConfiguration == null) {
      return 0;
    }
    let weapon1OptimalDPT =
      this.WeaponFrameBaseMagSize * this.PayloadBaseDamage
    return weapon1OptimalDPT;
  };

  setName = function (name) {
    this.Name = name;
  };

  setFrigate = function (frigate) {
    this.Frigate = frigate;
    this.FrigateGuid = this.Frigate.FrigateGuid;
    this.FrigateClass = this.Frigate.Class;
    this.FrigateHullMass = this.Frigate.HullMass;
    this.FrigateSpecificHeatCapacity =
      this.Frigate.SpecificHeatCapacity;
    this.FrigateDescription = this.Frigate.Description;
    this.FrigateBaseVigorCost = this.Frigate.BaseVigorCost;
    this.FrigateBaseCrewCost = this.Frigate.BaseCrewCost;
    this.FrigateModulePointLimit = this.Frigate.ModulePointLimit;
    this.FrigatePointDefenseSystemPowerLevelGuid =
      this.Frigate.PointDefenseSystemPowerLevelGuid;
    this.FrigatePointDefenseSystemPowerLevelText =
      this.Frigate.PointDefenseSystemPowerLevelText;
    this.FrigateSpaceshipCategoryGuid =
      this.Frigate.SpaceshipCategoryGuid;
    this.FrigateSpaceshipCategoryText =
      this.Frigate.SpaceshipCategoryText;
    this.FrigateSpaceshipTypeGuid = this.Frigate.SpaceshipTypeGuid;
    this.FrigateSpaceshipTypeText = this.Frigate.SpaceshipTypeText;
    this.FrigateWeaponPowerLevelGuid =
      this.Frigate.WeaponPowerLevelGuid;
    this.FrigateWeaponPowerLevelText =
      this.Frigate.WeaponPowerLevelText;
    this.updateCalculated("Frigate");
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
        if (this.TotalModulePointsUsage > this.FrigateModulePointLimit) {
            invalid = true;
        }
        let powerLevels = {
            "Level 1": 1,
            "Level 2": 2,
            "Level 3": 3
        }
        if (powerLevels[this.PointDefenseSystemPowerLevelText] > powerLevels[this.FrigatePointDefenseSystemPowerLevelText]) {
            invalid = true;
        }
        if (powerLevels[this.WeaponFramePowerLevelText] > powerLevels[this.FrigatePointDefenseSystemPowerLevelText]) {
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
        this.FrigateBaseCrewCost *
          (this.ArmorModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "Frigate" || key == null) {
      this.FrigateHeatCapacity =
        this.FrigateHullMass * this.FrigateSpecificHeatCapacity;
    }
    if (key === "FuelSystem" || key == null) {
      this.FuelSystemHeatCapacity =
        this.FuelSystemMass * this.FuelSystemSpecificHeatCapacity;
      this.FuelSystemCrewCost = Math.sqrt(
        this.FrigateBaseCrewCost *
          (this.FuelSystemModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "Payload" || key == null) {
      this.PayloadEnergyDamageBias = 1 - this.PayloadKineticDamageBias;
      this.PayloadCrewCost = Math.sqrt(
        this.FrigateBaseCrewCost *
          (this.PayloadModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "PointDefenseSystem" || key == null) {
      this.PointDefenseSystemHeatCapacity =
        this.PointDefenseSystemMass *
        this.PointDefenseSystemSpecificHeatCapacity;
      this.PointDefenseSystemCrewCost = Math.sqrt(
        this.FrigateBaseCrewCost *
          (this.PointDefenseSystemModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "Thruster" || key == null) {
      this.ThrusterHeatCapacity =
        this.ThrusterMass * this.ThrusterSpecificHeatCapacity;
      this.ThrusterCrewCost = Math.sqrt(
        this.FrigateBaseCrewCost *
          (this.ThrusterModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "WeaponFrame" || key == null) {
      this.WeaponFrameHeatCapacity =
        this.WeaponFrameMass * this.WeaponFrameSpecificHeatCapacity;
      this.WeaponFrameCrewCost = Math.sqrt(
        this.FrigateBaseCrewCost *
          (this.WeaponFrameModulePointsCost > 0 ? 1 : 0)
      );
    }

    this.TotalModulePointsUsage =
      this.frigateConfigurationTotalModulePointsUsage();
    this.TotalMass = this.frigateConfigurationTotalMass();
    this.TotalCrewCost = this.frigateConfigurationTotalCrewCost();
    this.TotalHeatCapacity = this.frigateConfigurationTotalHeatCapacity();
    this.Maneuverability = this.frigateConfigurationManeuverability();
    this.FuelSystemFuelConsumptionRate =
      this.TotalMass / this.ThrusterEfficiency;
  };
}
