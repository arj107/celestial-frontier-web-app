export class WeaponFrameModel {
  WeaponFrameGuid;
  ModulePointsCost;
  Mass;
  SpecificHeatCapacity;
  HeatCapacity;
  BaseMagSize;
  TargetingEfficiency;
  OptimalRange;
  EffectiveRange;
  BaseCriticalHitChance;
  Title;
  Description;
  PowerLevelGuid;
  PowerLevelText;
  WeaponFrameTypeGuid;
  WeaponFrameTypeText;
  disabled = false;

  constructor(weaponFrame) {
    if (weaponFrame) {
      this._weaponFrame = weaponFrame;
      this.WeaponFrameGuid = weaponFrame.WeaponFrameGuid;
      this.ModulePointsCost = weaponFrame.ModulePointsCost;
      this.Mass = weaponFrame.Mass;
      this.SpecificHeatCapacity = weaponFrame.SpecificHeatCapacity;
      this.HeatCapacity = this.SpecificHeatCapacity * this.Mass;
      this.BaseMagSize = weaponFrame.BaseMagSize;
      this.TargetingEfficiency = weaponFrame.TargetingEfficiency;
      this.OptimalRange = weaponFrame.OptimalRange;
      this.EffectiveRange = weaponFrame.EffectiveRange;
      this.BaseCriticalHitChance = weaponFrame.BaseCriticalHitChance;
      this.Title = weaponFrame.Title;
      this.Description = weaponFrame.Description;
      this.PowerLevelGuid = weaponFrame.PowerLevel.PowerLevelGuid;
      this.PowerLevelText = weaponFrame.PowerLevel.Text;
      this.WeaponFrameTypeGuid =
        weaponFrame.WeaponFrameType.WeaponFrameTypeGuid;
      this.WeaponFrameTypeText = weaponFrame.WeaponFrameType.Text;
    }
  }
}
