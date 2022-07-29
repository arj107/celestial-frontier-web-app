export class PayloadModel {
  PayloadGuid;
  ModulePointsCost;
  Velocity;
  KineticDamageBias;
  EnergyDamageBias;
  CounterSusceptibility;
  BaseDamage;
  BaseCriticalHitMultiplier;
  Title;
  Description;
  PayloadTypeGuid;
  PayloadTypeText;
  PowerLevelGuid;
  PowerLevelText;
  WeaponFrameTypeGuid;
  WeaponFrameTypeText;
  disabled = false;

  constructor(payload) {
    if (payload) {
      this._weaponFrame = payload;
      this.PayloadGuid = payload.PayloadGuid;
      this.ModulePointsCost = payload.ModulePointsCost;
      this.Velocity = payload.Velocity;
      this.KineticDamageBias = payload.KineticDamageBias;
      this.EnergyDamageBias = 1 - this.KineticDamageBias;
      this.CounterSusceptibility = payload.CounterSusceptibility;
      this.BaseDamage = payload.BaseDamage;
      this.BaseCriticalHitMultiplier = payload.BaseCriticalHitMultiplier;
      this.Title = payload.Title;
      this.Description = payload.Description;
      this.PayloadTypeGuid = payload.PayloadType.PayloadTypeGuid;
      this.PayloadTypeText = payload.PayloadType.Text;
      this.PowerLevelGuid = payload.PowerLevel.PowerLevelGuid;
      this.PowerLevelText = payload.PowerLevel.Text;
      this.WeaponFrameTypeGuid = payload.WeaponFrameType.WeaponFrameTypeGuid;
      this.WeaponFrameTypeText = payload.WeaponFrameType.Text;
    }
  }
}
