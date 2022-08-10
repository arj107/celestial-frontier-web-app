import { CarrierModel } from "../Carrier/CarrierModel";
import { ArmorModel } from "../Armor/ArmorModel";
import { PointDefenseSystemModel } from "../PointDefenseSystem/PointDefenseSystemModel";
import { FuelSystemModel } from "../FuelSystem/FuelSystemModel";
import { ThrusterModel } from "../Thruster/ThrusterModel";
import { WeaponFrameModel } from "../WeaponFrame/WeaponFrameModel";
import { PayloadModel } from "../Payload/PayloadModel";
import { EVASION_SCALAR } from "../../utils/constants";

export class CarrierConfigurationModel {
  // the original object consumed directly from the API
  _carrierConfiguration;

  // Flattening all of the configuration's nested objects into a single level deep
  // for searching, filtering, sorting, and comparisons throughout the app
  CarrierConfigurationGuid;
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
  Carrier;
  CarrierGuid;
  CarrierClass;
  CarrierHullMass;
  CarrierSpecificHeatCapacity;
  CarrierDescription;
  CarrierBaseCrewCost;
  CarrierModulePointLimit;
  CarrierFighterBays;
  CarrierCorvetteBays;
  CarrierFrigateBays;
  CarrierDestroyerBays;
  CarrierPointDefenseSystemPowerLevelGuid;
  CarrierPointDefenseSystemPowerLevelText;
  CarrierSpaceshipCategoryGuid;
  CarrierSpaceshipCategoryText;
  CarrierSpaceshipTypeGuid;
  CarrierSpaceshipTypeText;
  CarrierWeaponPowerLevelGuid;
  CarrierWeaponPowerLevelText;
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
  CarrierHeatCapacity;
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

  // Accepts a CarrierConfiguration object directly from the API
  constructor(carrierConfiguration) {
    if (carrierConfiguration) {
      this._carrierConfiguration = carrierConfiguration;
      this.CarrierConfigurationGuid =
        carrierConfiguration.CarrierConfigurationGuid;
      this.Name = carrierConfiguration.Name;
      this.Armor = new ArmorModel(carrierConfiguration.Armor);
      this.ArmorGuid = carrierConfiguration.Armor.ArmorGuid;
      this.ArmorModulePointsCost =
        carrierConfiguration.Armor.ModulePointsCost;
      this.ArmorMass = carrierConfiguration.Armor.Mass;
      this.ArmorSpecificHeatCapacity =
        carrierConfiguration.Armor.SpecificHeatCapacity;
      this.ArmorKineticResistance =
        carrierConfiguration.Armor.KineticResistance;
      this.ArmorEnergyResistance =
        carrierConfiguration.Armor.EnergyResistance;
      this.ArmorTitle = carrierConfiguration.Armor.Title;
      this.ArmorDescription = carrierConfiguration.Armor.Description;
      this.ArmorSpaceshipTypeGuid =
        carrierConfiguration.Armor.SpaceshipType.SpaceshipTypeGuid;
      this.ArmorSpaceshipTypeText =
        carrierConfiguration.Armor.SpaceshipType.Text;
      this.Carrier = new CarrierModel(
        carrierConfiguration.Carrier
      );
      this.CarrierGuid =
        carrierConfiguration.Carrier.CarrierGuid;
      this.CarrierClass = carrierConfiguration.Carrier.Class;
      this.CarrierHullMass =
        carrierConfiguration.Carrier.HullMass;
      this.CarrierSpecificHeatCapacity =
        carrierConfiguration.Carrier.SpecificHeatCapacity;
      this.CarrierDescription =
        carrierConfiguration.Carrier.Description;
      this.CarrierBaseCrewCost =
        carrierConfiguration.Carrier.BaseCrewCost;
      this.CarrierModulePointLimit =
        carrierConfiguration.Carrier.ModulePointLimit;
        this.CarrierFighterBays =
            carrierConfiguration.Carrier.FighterBays;
        this.CarrierCorvetteBays =
            carrierConfiguration.Carrier.CorvetteBays;
        this.CarrierFrigateBays =
            carrierConfiguration.Carrier.FrigateBays;
        this.CarrierDestroyerBays =
            carrierConfiguration.Carrier.DestroyerBays;
      this.CarrierPointDefenseSystemPowerLevelGuid =
        carrierConfiguration.Carrier.PointDefenseSystemPowerLevel.PowerLevelGuid;
      this.CarrierPointDefenseSystemPowerLevelText =
        carrierConfiguration.Carrier.PointDefenseSystemPowerLevel.Text;
      this.CarrierSpaceshipCategoryGuid =
        carrierConfiguration.Carrier.SpaceshipCategory.SpaceshipCategoryGuid;
      this.CarrierSpaceshipCategoryText =
        carrierConfiguration.Carrier.SpaceshipCategory.Text;
      this.CarrierSpaceshipTypeGuid =
        carrierConfiguration.Carrier.SpaceshipType.SpaceshipTypeGuid;
      this.CarrierSpaceshipTypeText =
        carrierConfiguration.Carrier.SpaceshipType.Text;
      this.CarrierWeaponPowerLevelGuid =
        carrierConfiguration.Carrier.WeaponPowerLevel.PowerLevelGuid;
      this.CarrierWeaponPowerLevelText =
        carrierConfiguration.Carrier.WeaponPowerLevel.Text;
      this.User = carrierConfiguration.User;
      this.UserGuid = carrierConfiguration.User.UserGuid;
      this.Username = carrierConfiguration.User.Username;
      this.FuelSystem = new FuelSystemModel(
        carrierConfiguration.FuelSystem
      );
      this.FuelSystemGuid =
        carrierConfiguration.FuelSystem.FuelSystemGuid;
      this.FuelSystemMass = carrierConfiguration.FuelSystem.Mass;
      this.FuelSystemModulePointsCost =
        carrierConfiguration.FuelSystem.ModulePointsCost;
      this.FuelSystemSpecificHeatCapacity =
        carrierConfiguration.FuelSystem.SpecificHeatCapacity;
      this.FuelSystemFuelCapacity =
        carrierConfiguration.FuelSystem.FuelCapacity;
      this.FuelSystemFuelRegenerationRate =
        carrierConfiguration.FuelSystem.FuelRegenerationRate;
      this.FuelSystemTitle = carrierConfiguration.FuelSystem.Title;
      this.FuelSystemDescription =
        carrierConfiguration.FuelSystem.Description;
      this.FuelSystemSpaceshipTypeGuid =
        carrierConfiguration.FuelSystem.SpaceshipType.SpaceshipTypeGuid;
      this.FuelSystemSpaceshipTypeText =
        carrierConfiguration.FuelSystem.SpaceshipType.Text;
      this.Payload = new PayloadModel(carrierConfiguration.Payload);
      this.PayloadGuid = carrierConfiguration.Payload.PayloadGuid;
      this.PayloadModulePointsCost =
        carrierConfiguration.Payload.ModulePointsCost;
      this.PayloadVelocity = carrierConfiguration.Payload.Velocity;
      this.PayloadKineticDamageBias =
        carrierConfiguration.Payload.KineticDamageBias;
      this.PayloadCounterSusceptibility =
        carrierConfiguration.Payload.CounterSusceptibility;
      this.PayloadBaseDamage = carrierConfiguration.Payload.BaseDamage;
      this.PayloadBaseCriticalHitMultiplier =
        carrierConfiguration.Payload.BaseCriticalHitMultiplier;
      this.PayloadTitle = carrierConfiguration.Payload.Title;
      this.PayloadDescription =
        carrierConfiguration.Payload.Description;
      this.PayloadPayloadTypeGuid =
        carrierConfiguration.Payload.PayloadType.PayloadTypeGuid;
      this.PayloadPayloadTypeText =
        carrierConfiguration.Payload.PayloadType.Text;
      this.PayloadPowerLevelGuid =
        carrierConfiguration.Payload.PowerLevel.PowerLevelGuid;
      this.PayloadPowerLevelText =
        carrierConfiguration.Payload.PowerLevel.Text;
      this.PayloadWeaponFrameTypeGuid =
        carrierConfiguration.Payload.WeaponFrameType.WeaponFrameTypeGuid;
      this.PayloadWeaponFrameTypeText =
        carrierConfiguration.Payload.WeaponFrameType.Text;
      this.PointDefenseSystem = new PointDefenseSystemModel(
        carrierConfiguration.PointDefenseSystem
      );
      this.PointDefenseSystemGuid =
        carrierConfiguration.PointDefenseSystem.PointDefenseSystemGuid;
      this.PointDefenseSystemModulePointsCost =
        carrierConfiguration.PointDefenseSystem.ModulePointsCost;
      this.PointDefenseSystemMass =
        carrierConfiguration.PointDefenseSystem.Mass;
      this.PointDefenseSystemSpecificHeatCapacity =
        carrierConfiguration.PointDefenseSystem.SpecificHeatCapacity;
      this.PointDefenseSystemCountermeasureCapacity =
        carrierConfiguration.PointDefenseSystem.CountermeasureCapacity;
      this.PointDefenseSystemCountermeasureRegenerationRate =
        carrierConfiguration.PointDefenseSystem.CountermeasureRegenerationRate;
      this.PointDefenseSystemEfficiency =
        carrierConfiguration.PointDefenseSystem.Efficiency;
      this.PointDefenseSystemTitle =
        carrierConfiguration.PointDefenseSystem.Title;
      this.PointDefenseSystemDescription =
        carrierConfiguration.PointDefenseSystem.Description;
      this.PointDefenseSystemPowerLevelGuid =
        carrierConfiguration.PointDefenseSystem.PowerLevel.PowerLevelGuid;
      this.PointDefenseSystemPowerLevelText =
        carrierConfiguration.PointDefenseSystem.PowerLevel.Text;
      this.Thruster = new ThrusterModel(carrierConfiguration.Thruster);
      this.ThrusterGuid = carrierConfiguration.Thruster.ThrusterGuid;
      this.ThrusterModulePointsCost =
        carrierConfiguration.Thruster.ModulePointsCost;
      this.ThrusterMass = carrierConfiguration.Thruster.Mass;
      this.ThrusterSpecificHeatCapacity =
        carrierConfiguration.Thruster.SpecificHeatCapacity;
      this.ThrusterThrust = carrierConfiguration.Thruster.Thrust;
      this.ThrusterEfficiency = carrierConfiguration.Thruster.Efficiency;
      this.ThrusterTitle = carrierConfiguration.Thruster.Title;
      this.ThrusterDescription =
        carrierConfiguration.Thruster.Description;
      this.ThrusterSpaceshipTypeGuid =
        carrierConfiguration.Thruster.SpaceshipType.SpaceshipTypeGuid;
      this.ThrusterSpaceshipTypeText =
        carrierConfiguration.Thruster.SpaceshipType.Text;
      this.WeaponFrame = new WeaponFrameModel(
        carrierConfiguration.WeaponFrame
      );
      this.WeaponFrameGuid =
        carrierConfiguration.WeaponFrame.WeaponFrameGuid;
      this.WeaponFrameModulePointsCost =
        carrierConfiguration.WeaponFrame.ModulePointsCost;
      this.WeaponFrameMass = carrierConfiguration.WeaponFrame.Mass;
      this.WeaponFrameSpecificHeatCapacity =
        carrierConfiguration.WeaponFrame.SpecificHeatCapacity;
      this.WeaponFrameBaseMagSize =
        carrierConfiguration.WeaponFrame.BaseMagSize;
      this.WeaponFrameTargetingEfficiency =
        carrierConfiguration.WeaponFrame.TargetingEfficiency;
      this.WeaponFrameOptimalRange =
        carrierConfiguration.WeaponFrame.OptimalRange;
      this.WeaponFrameEffectiveRange =
        carrierConfiguration.WeaponFrame.EffectiveRange;
      this.WeaponFrameBaseCriticalHitChance =
        carrierConfiguration.WeaponFrame.BaseCriticalHitChance;
      this.WeaponFrameTitle = carrierConfiguration.WeaponFrame.Title;
      this.WeaponFrameDescription =
        carrierConfiguration.WeaponFrame.Description;
      this.WeaponFramePowerLevelGuid =
        carrierConfiguration.WeaponFrame.PowerLevel.PowerLevelGuid;
      this.WeaponFramePowerLevelText =
        carrierConfiguration.WeaponFrame.PowerLevel.Text;
      this.WeaponFrameWeaponFrameTypeGuid =
        carrierConfiguration.WeaponFrame.WeaponFrameType.WeaponFrameTypeGuid;
      this.WeaponFrameWeaponFrameTypeText =
        carrierConfiguration.WeaponFrame.WeaponFrameType.Text;

      // Calculated properties
      // this.ArmorHeatCapacity = this.ArmorMass * this.ArmorSpecificHeatCapacity;
      // this.ArmorCrewCost = Math.sqrt(this.CarrierBaseCrewCost * (this.ArmorModulePointsCost > 0 ? 1 : 0));
      // this.CarrierHeatCapacity = this.CarrierHullMass * this.CarrierSpecificHeatCapacity;
      // this.FuelSystemHeatCapacity = this.FuelSystemMass * this.FuelSystemSpecificHeatCapacity;
      // this.FuelSystemCrewCost = Math.sqrt(this.CarrierBaseCrewCost * (this.FuelSystemModulePointsCost > 0 ? 1 : 0));
      // this.PayloadEnergyDamageBias = 1 - this.PayloadKineticDamageBias;
      // this.PayloadCrewCost = Math.sqrt(this.CarrierBaseCrewCost * (this.PayloadModulePointsCost > 0 ? 1 : 0));
      // this.PointDefenseSystemHeatCapacity = this.PointDefenseSystemMass * this.PointDefenseSystemSpecificHeatCapacity;
      // this.PointDefenseSystemCrewCost = Math.sqrt(this.CarrierBaseCrewCost * (this.PointDefenseSystemModulePointsCost > 0 ? 1 : 0));
      // this.ThrusterHeatCapacity = this.ThrusterMass * this.ThrusterSpecificHeatCapacity;
      // this.ThrusterCrewCost = Math.sqrt(this.CarrierBaseCrewCost * (this.ThrusterModulePointsCost > 0 ? 1 : 0));
      // this.WeaponFrameHeatCapacity = this.WeaponFrameMass * this.WeaponFrameSpecificHeatCapacity;
      // this.WeaponFrameCrewCost = Math.sqrt(this.CarrierBaseCrewCost * (this.WeaponFrameModulePointsCost > 0 ? 1 : 0));
      // this.TotalModulePointsUsage = this.carrierConfigurationTotalModulePointsUsage();
      // this.TotalMass = this.carrierConfigurationTotalMass();
      // this.TotalCrewCost = this.carrierConfigurationTotalCrewCost();
      // this.TotalHeatCapacity = this.carrierConfigurationTotalHeatCapacity();
      // this.Maneuverability = this.carrierConfigurationManeuverability();
      // this.FuelSystemFuelConsumptionRate = this.TotalMass / this.ThrusterEfficiency;
      this.updateCalculated();
    }
  }

  carrierConfigurationTotalModulePointsUsage = function () {
    let totalModulePointsUsed =
      (this.ArmorModulePointsCost || 0) +
      (this.FuelSystemModulePointsCost || 0) +
      (this.PointDefenseSystemModulePointsCost || 0) +
      (this.ThrusterModulePointsCost || 0) +
      (this.WeaponFrameModulePointsCost || 0) +
      (this.PayloadModulePointsCost || 0)

    if (this.CarrierModulePointLimit == 0) {
      return 0;
    }
    return totalModulePointsUsed;
  };
  carrierConfigurationTotalMass = function () {
    if (this._carrierConfiguration == null) {
      return 0;
    }
    return (
      (this.CarrierHullMass || 0) +
      (this.ArmorMass || 0) +
      (this.FuelSystemMass || 0) +
      (this.PointDefenseSystemMass || 0) +
      (this.ThrusterMass || 0) +
      (this.WeaponFrameMass || 0)
    );
  };
  carrierConfigurationTotalCrewCost = function () {
    if (this._carrierConfiguration == null) {
      return 0;
    }
    return Math.round(
      (this.CarrierBaseCrewCost || 0) +
        (this.Armor
          ? Math.sqrt(
              this.CarrierBaseCrewCost *
                (this.ArmorModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.FuelSystem
          ? Math.sqrt(
              this.CarrierBaseCrewCost *
                (this.FuelSystemModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.PointDefenseSystem
          ? Math.sqrt(
              this.CarrierBaseCrewCost *
                (this.PointDefenseSystemModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.Thruster
          ? Math.sqrt(
              this.CarrierBaseCrewCost *
                (this.ThrusterModulePointsCost > 0 ? 1 : 0)
            )
          : 0) +
        (this.WeaponFrame
          ? Math.sqrt(
              this.CarrierBaseCrewCost *
                (this.WeaponFrameModulePointsCost > 0 ? 1 : 0)
            )
          : 0)
    );
  };
  carrierConfigurationTotalHeatCapacity = function () {
    if (this._carrierConfiguration == null) {
      return 0;
    }
    return (
      (this.CarrierHeatCapacity || 0) +
      (this.ArmorHeatCapacity || 0) +
      (this.FuelSystemHeatCapacity || 0) +
      (this.PointDefenseSystemHeatCapacity || 0) +
      (this.ThrusterHeatCapacity || 0) +
      (this.WeaponFrameHeatCapacity || 0)
    );
  };
  carrierConfigurationManeuverability = function () {
    if (this.TotalMass == 0) {
      return 0;
    }
    return this.ThrusterThrust / (this.TotalMass * EVASION_SCALAR);
  };
  damagePerTurn = function () {
    if (this._carrierConfiguration == null) {
      return 0;
    }
    let weapon1OptimalDPT =
      this.WeaponFrameBaseMagSize * this.PayloadBaseDamage
    return weapon1OptimalDPT;
  };

  setName = function (name) {
    this.Name = name;
  };

  setCarrier = function (carrier) {
    this.Carrier = carrier;
    this.CarrierGuid = this.Carrier.CarrierGuid;
    this.CarrierClass = this.Carrier.Class;
    this.CarrierHullMass = this.Carrier.HullMass;
    this.CarrierSpecificHeatCapacity =
      this.Carrier.SpecificHeatCapacity;
    this.CarrierDescription = this.Carrier.Description;
    this.CarrierBaseCrewCost = this.Carrier.BaseCrewCost;
    this.CarrierModulePointLimit = this.Carrier.ModulePointLimit;
    this.CarrierFighterBays = this.Carrier.FighterBays;
    this.CarrierCorvetteBays = this.Carrier.CorvetteBays;
    this.CarrierFrigateBays = this.Carrier.FrigateBays;
    this.CarrierDestroyerBays = this.Carrier.DestroyerBays;
    this.CarrierPointDefenseSystemPowerLevelGuid =
      this.Carrier.PointDefenseSystemPowerLevelGuid;
    this.CarrierPointDefenseSystemPowerLevelText =
      this.Carrier.PointDefenseSystemPowerLevelText;
    this.CarrierSpaceshipCategoryGuid =
      this.Carrier.SpaceshipCategoryGuid;
    this.CarrierSpaceshipCategoryText =
      this.Carrier.SpaceshipCategoryText;
    this.CarrierSpaceshipTypeGuid = this.Carrier.SpaceshipTypeGuid;
    this.CarrierSpaceshipTypeText = this.Carrier.SpaceshipTypeText;
    this.CarrierWeaponPowerLevelGuid =
      this.Carrier.WeaponPowerLevelGuid;
    this.CarrierWeaponPowerLevelText =
      this.Carrier.WeaponPowerLevelText;
    this.updateCalculated("Carrier");
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
        if (this.TotalModulePointsUsage > this.CarrierModulePointLimit) {
            invalid = true;
        }
        let powerLevels = {
            "Level 1": 1,
            "Level 2": 2,
            "Level 3": 3
        }
        if (powerLevels[this.PointDefenseSystemPowerLevelText] > powerLevels[this.CarrierPointDefenseSystemPowerLevelText]) {
            invalid = true;
        }
        if (powerLevels[this.WeaponFramePowerLevelText] > powerLevels[this.CarrierWeaponPowerLevelText]) {
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
        this.CarrierBaseCrewCost *
          (this.ArmorModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "Carrier" || key == null) {
      this.CarrierHeatCapacity =
        this.CarrierHullMass * this.CarrierSpecificHeatCapacity;
    }
    if (key === "FuelSystem" || key == null) {
      this.FuelSystemHeatCapacity =
        this.FuelSystemMass * this.FuelSystemSpecificHeatCapacity;
      this.FuelSystemCrewCost = Math.sqrt(
        this.CarrierBaseCrewCost *
          (this.FuelSystemModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "Payload" || key == null) {
      this.PayloadEnergyDamageBias = 1 - this.PayloadKineticDamageBias;
      this.PayloadCrewCost = Math.sqrt(
        this.CarrierBaseCrewCost *
          (this.PayloadModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "PointDefenseSystem" || key == null) {
      this.PointDefenseSystemHeatCapacity =
        this.PointDefenseSystemMass *
        this.PointDefenseSystemSpecificHeatCapacity;
      this.PointDefenseSystemCrewCost = Math.sqrt(
        this.CarrierBaseCrewCost *
          (this.PointDefenseSystemModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "Thruster" || key == null) {
      this.ThrusterHeatCapacity =
        this.ThrusterMass * this.ThrusterSpecificHeatCapacity;
      this.ThrusterCrewCost = Math.sqrt(
        this.CarrierBaseCrewCost *
          (this.ThrusterModulePointsCost > 0 ? 1 : 0)
      );
    }
    if (key === "WeaponFrame" || key == null) {
      this.WeaponFrameHeatCapacity =
        this.WeaponFrameMass * this.WeaponFrameSpecificHeatCapacity;
      this.WeaponFrameCrewCost = Math.sqrt(
        this.CarrierBaseCrewCost *
          (this.WeaponFrameModulePointsCost > 0 ? 1 : 0)
      );
    }

    this.TotalModulePointsUsage =
      this.carrierConfigurationTotalModulePointsUsage();
    this.TotalMass = this.carrierConfigurationTotalMass();
    this.TotalCrewCost = this.carrierConfigurationTotalCrewCost();
    this.TotalHeatCapacity = this.carrierConfigurationTotalHeatCapacity();
    this.Maneuverability = this.carrierConfigurationManeuverability();
    this.FuelSystemFuelConsumptionRate =
      this.TotalMass / this.ThrusterEfficiency;
  };
}
